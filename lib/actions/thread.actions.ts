"use server";

import Thread from "@/lib/models/thread.model";
import { connectToDB } from "../mongoose";
import User from "../models/user.model";
import { revalidatePath } from "next/cache";

interface Params {
	text: string;
	author: string;
	community: string | null;
	path: string;
}
export async function createThread({ text, author, community, path }: Params) {
	try {
		connectToDB();
		const createdThread = await Thread.create({
			text,
			author,
			community,
		});
		await User.findByIdAndUpdate(author, {
			$push: { threads: createdThread._id },
		});
		revalidatePath(path);
	} catch (error: any) {
		throw new Error(`Failed to create thread: ${error.message}`);
	}
}

export async function fetchPosts(pageNumber = 1, pageSize = 20) {
	connectToDB();

	// Calculate the number of posts to skip based on the page number and page size.
	const skipAmount = (pageNumber - 1) * pageSize;

	// Create a query to fetch the posts that have no parent (top-level threads) (a thread that is not a comment/reply).
	const postsQuery = Thread.find({ parentId: { $in: [null, undefined] } })
		.sort({ createdAt: "desc" })
		.skip(skipAmount)
		.limit(pageSize)
		.populate({
			path: "author",
			model: User,
		})
		.populate({
			path: "children", // Populate the children field
			populate: {
				path: "author", // Populate the author field within children
				model: User,
				select: "_id name parentId image", // Select only _id and username fields of the author
			},
		});

	// Count the total number of top-level posts (threads) i.e., threads that are not comments.
	const totalPostsCount = await Thread.countDocuments({
		parentId: { $in: [null, undefined] },
	}); // Get the total count of posts

	const posts = await postsQuery.exec();

	const isNext = totalPostsCount > skipAmount + posts.length;

	return { posts, isNext };
}

export async function fetchThreadById(id: string) {
	try {
		connectToDB();
		//Todo populate community
		//populate with author (image,id,_id,name)
		//populate with children which have authors
		//and which itself can have children which have authors
		const thread = await Thread.findById(id)
			.populate({
				path: "author",
				model: User,
				select: "_id id image name",
			})
			.populate({
				path: "children",
				populate: [
					{
						path: "author",
						model: User,
						select: "_id id image name",
					},
					{
						path: "children",
						model: Thread,
						populate: {
							path: "author",
							model: User,
							select: "_id id image name",
						},
					},
				],
			})
			.exec();
		return thread;
	} catch (error: any) {
		throw new Error(`Failed to fetch thread: ${error.message}`);
	}
}

interface CommentParams {
	commentText: string;
	parentId: string;
	userId: string;
	pathname: string;
}

export async function addCommentToThread({
	commentText,
	parentId,
	userId,
	pathname,
}: CommentParams) {
	try {
		const originalThread = await Thread.findById(parentId);
		if (!originalThread) {
			throw new Error("Thread not found");
		}
		const commentThread = new Thread({
			text: commentText,
			author: userId,
			parentId: parentId,
		});
		const savedCommentThread = await commentThread.save();
		originalThread.children.push(savedCommentThread._id);
		await originalThread.save();
		revalidatePath(pathname);
	} catch (error: any) {
		throw new Error(`Failed to add comment to thread: ${error.message}`);
	}
}
