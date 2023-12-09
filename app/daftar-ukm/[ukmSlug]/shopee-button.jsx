"use client";

import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import { SiShopee } from "react-icons/si";
import toast, { Toaster } from "react-hot-toast";
import ErrorAlert from "@/app/components/error-alert";

export default function ShopeeMarketplaceButton({
	shopeeMarketplaceLink,
	ukmName,
}) {
	return (
		<div>
			<Button
				as={Link}
				className="bg-[#ef4c29] text-white text-xl"
				href={
					shopeeMarketplaceLink === null
						? `#${ukmName
								.replace(/\s/g, "-")
								.toLowerCase()}-belum-ada-lapak-shopee`
						: shopeeMarketplaceLink
				}
				onClick={
					shopeeMarketplaceLink === null
						? () =>
								alert("Maaf, lapak Shopee milik " + ukmName + " belum tersedia")
						: ""
				}
				startContent={<SiShopee className="text-lg" />}
			>
				Shopee
			</Button>
		</div>
	);
}
