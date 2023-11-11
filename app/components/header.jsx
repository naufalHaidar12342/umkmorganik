"use client";
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenuToggle,
	NavbarMenu,
	NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { useState } from "react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const selectedPath = usePathname();
	const menuItems = [
		{ pageName: "Halaman Utama", pageRoute: "/" },
		{ pageName: "Katalog Produk", pageRoute: "/katalog-produk" },
		{ pageName: "UMKM", pageRoute: "/daftar-ukm" },
		{ pageName: "Blog", pageRoute: "/blog-post" },
	];

	return (
		<Navbar
			onMenuOpenChange={setIsMenuOpen}
			classNames={{
				item: [
					"flex",
					"relative",
					"h-full",
					"items-center",
					"data-[active=true]:after:content-['']",
					"data-[active=true]:after:absolute",
					"data-[active=true]:after:bottom-0",
					"data-[active=true]:after:left-0",
					"data-[active=true]:after:right-0",
					"data-[active=true]:after:h-[2px]",
					"data-[active=true]:after:rounded-[2px]",
					"data-[active=true]:after:bg-primary",
				],
			}}
		>
			<NavbarContent>
				<NavbarMenuToggle
					aria-label={isMenuOpen ? "Tutup menu" : "Buka menu"}
					className="sm:hidden"
				/>
				<NavbarBrand>
					<p className="font-bold text-inherit">UMKM Organik</p>
				</NavbarBrand>
			</NavbarContent>
			{/* menu pada tampilan desktop */}
			<NavbarContent className="hidden sm:flex gap-4" justify="center">
				{menuItems.map((item, index) => (
					<NavbarItem
						key={`${index}`}
						isActive={selectedPath === item.pageRoute ? true : false}
					>
						<Link
							color={`${
								selectedPath === item.pageRoute ? "primary" : "foreground"
							}`}
							as={NextLink}
							href={item.pageRoute}
						>
							{item.pageName}
						</Link>
					</NavbarItem>
				))}
			</NavbarContent>

			{/* menu pada tampilan mobile */}
			<NavbarMenu>
				{menuItems.map((item, index) => (
					<NavbarMenuItem key={`${index}`}>
						<Link
							as={NextLink}
							color={`${
								selectedPath === item.pageRoute ? "primary" : "foreground"
							}`}
							className="w-full"
							href={item.pageRoute}
							size="lg"
						>
							{item.pageName}
						</Link>
					</NavbarMenuItem>
				))}
			</NavbarMenu>
		</Navbar>
	);
}
