"use client";
import { Link } from "@nextui-org/link";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { RxSlash } from "react-icons/rx";

export default function CustomBreadcrumbs({ breadcrumbsPath }) {
	const selectedPathBreadcrumbs = usePathname();
	return (
		<div className="flex flex-col w-full">
			<span className="font-semibold text-lg">Lokasi Anda saat ini:</span>
			<div className="flex flex-col md:flex-row items-start p-3 ">
				{breadcrumbsPath.map((breadcrumb, index) => (
					<Link
						as={NextLink}
						href={breadcrumb.pageUrl}
						key={index}
						size="lg"
						className={`font-bold ${
							selectedPathBreadcrumbs === breadcrumb.pageUrl
								? "text-primary-800 hover:text-slate-950 hover:bg-primary-600"
								: "text-primary-600 hover:bg-primary-800 hover:text-slate-950"
						}  rounded-2xl p-2`}
						anchorIcon={<RxSlash />}
						showAnchorIcon
					>
						{breadcrumb.pageName}
					</Link>
				))}
			</div>
		</div>
	);
}
