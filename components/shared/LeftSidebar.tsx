"use client";
import { sidebarLinks } from "@/constants/index";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
export default function LeftSidebar() {
	const router = useRouter();
	const pathname = usePathname();
	return (
		<section className="custom-scrollbar leftsidebar">
			<div className="flex w-full flex-1 flex-col gap-6 px-6">
				{sidebarLinks.map((link) => {
					const isActive =
						(pathname.includes(link.route) && link.route.length > 0) ||
						pathname === link.route;
					return (
						<Link
							href={link.route}
							key={link.label}
							className={`leftsidebar_link ${isActive && "bg-primary-500"}`}
						>
							<Image
								src={link.imgURL}
								alt={link.label}
								width={18}
								height={18}
							/>
							<p className="text-light-1 max-lg:hidden">{link.label}</p>
						</Link>
					);
				})}
			</div>
		</section>
	);
}