import { OrganizationSwitcher, SignOutButton, SignedIn } from "@clerk/nextjs";
import { Darker_Grotesque } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { dark } from "@clerk/themes";
export default function TopBar() {
	return (
		<nav className="topbar">
			<Link href="/" className="flex items-center gap-4">
				<Image src="/assets/logo.svg" alt="logo" width={28} height={28} />
				<p className="text-heading3-bold text-light-1 max:xs:hidden">Threads</p>
			</Link>
			<div className="flex items-center gap-1">
				<div className="block md:hidden">
					<SignedIn>
						<SignOutButton>
							<div className="flex cursor-pointer">
								<Image
									src="/assets/logout.svg"
									alt="logout"
									width={20}
									height={20}
								/>
							</div>
						</SignOutButton>
					</SignedIn>
				</div>
				<OrganizationSwitcher
					appearance={{
						baseTheme: dark,
						elements: {
							organizationSwitcherTrigger: "py-2 px-4",
						},
					}}
				/>
			</div>
		</nav>
	);
}
