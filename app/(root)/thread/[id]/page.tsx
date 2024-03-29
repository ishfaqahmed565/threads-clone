import { ThreadCard } from "@/components/cards/ThreadCard";
import { currentUser } from "@clerk/nextjs";
import { fetchUser } from "@/lib/actions/user.actions";
import { fetchThreadById } from "@/lib/actions/thread.actions";
import { redirect } from "next/navigation";
import { Comment } from "@/components/forms/Comment";
export default async function Page({ params }: { params: { id: string } }) {
	const user = await currentUser();
	const userInfo = await fetchUser(user.id);
	if (!userInfo.onboarded) redirect(`/onboarding`);
	const thread = await fetchThreadById(params.id);
	console.log(thread);
	return (
		<section className="relative">
			<div>
				<ThreadCard
					key={thread._id}
					id={thread._id}
					currentUserId={user?.id | ""}
					parentId={thread.parentId}
					content={thread.text}
					author={thread.author}
					community={thread.community}
					createdAt={thread.createdAt}
					comments={thread.children}
				/>
			</div>
			<div className="mt-7">
				<Comment
					threadId={thread.id}
					currentUserImg={user.imageUrl}
					currentUserId={JSON.stringify(userInfo._id)}
				/>
			</div>
		</section>
	);
}
