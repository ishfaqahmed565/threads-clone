"use client";
import { sidebarLinks } from "@/constants/index";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
export default function Bottombar() {
	const router = useRouter();
	const pathname = usePathname();
	return (
		<section className="bottombar">
			<div className="bottombar_container">
				{sidebarLinks.map((link) => {
					const isActive =
						(pathname.includes(link.route) && link.route.length > 0) ||
						pathname === link.route;
					return (
						<Link
							href={link.route}
							key={link.label}
							className={`bottombar_link ${isActive && "bg-primary-500"}`}
						>
							<Image
								src={link.imgURL}
								alt={link.label}
								width={18}
								height={18}
							/>
							<p className="text-subtle-medium text-light-1 max-sm:hidden">
								{link.label.split(/\s+/)[0]}
							</p>
						</Link>
					);
				})}
			</div>
		</section>
	);
}
