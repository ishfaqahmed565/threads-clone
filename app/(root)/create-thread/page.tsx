//first create form component
//form component will have a text area and a button
//now create backend functionality
//when a thread will be created, it will be created by a user
//so we need to create the currently signed in user
//we need to create a server function to check if the user is signed in
//if user is signed in then pass the user id to the PostThread component
//if user not signed in then redirect to onboarding page
//import signed in from clerk
//now we have to create a Threads model
//we need to create a server function to create a thread
import { currentUser } from "@clerk/nextjs";
import { fetchUser } from "@/lib/actions/user.actions";
import PostThread from "@/components/forms/PostThread";
import { redirect } from "next/navigation";

export default async function Page() {
	const user = await currentUser();
	if (!user) return null;
	const userInfo = await fetchUser(user.id);
	if (!userInfo.onboarded) redirect("/onboarding");
	return (
		<>
			<h1 className="head-text">Create Threads</h1>
			<PostThread userId={JSON.stringify(userInfo._id)} />
		</>
	);
}
