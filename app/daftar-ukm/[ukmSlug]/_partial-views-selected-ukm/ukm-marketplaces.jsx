"use client";

import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import { SiShopee } from "react-icons/si";
import ErrorAlert from "@/app/components/error-alert";
import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import InfoAlert from "@/app/components/info-alert";
import { nunito } from "@/app/fonts";
export default function UkmMarketplaces({
	shopeeLink,
	tokopediaLink,
	ukmName,
}) {
	console.log("shopeeLink", shopeeLink);
	const router = useRouter();
	const [showErrorAlert, setShowErrorAlert] = useState(false);
	const handleShopeeButtonClick = () => {
		if (shopeeLink === null) {
			setShowErrorAlert(true);
		}
		redirect(shopeeLink);
	};
	const handleShopeeLink = () => {
		if (shopeeLink === null) {
			return `#${ukmName
				.replace(/\s/g, "-")
				.toLowerCase()}-belum-ada-lapak-shopee`;
		}
		return shopeeLink;
	};
	const handleCloseErrorAlert = () => {
		setShowErrorAlert(false);
	};

	const showsInfoAlert = (shopeeLink, tokopediaLink, ukmName) => {
		if (shopeeLink === null && tokopediaLink === null) {
			return (
				<InfoAlert
					messageSubject="Lapak Shopee dan Tokopedia belum tersedia."
					messageContent={
						"Pengunjung UMKM Organik, saat ini lapak Shopee dan Tokopedia dari " +
						ukmName +
						" belum tersedia."
					}
					nextStepForVisitor="Silahkan cek lagi profil UKM ini di lain waktu."
				/>
			);
		} else if (shopeeLink === null || tokopediaLink === null) {
			return (
				<InfoAlert
					messageSubject={`Lapak ${
						shopeeLink === null ? "Shopee" : "Tokopedia"
					} belum tersedia.`}
					messageContent={`Pengunjung UMKM Organik, saat ini lapak ${
						shopeeLink === null ? "Shopee" : "Tokopedia"
					} untuk 
						${ukmName}${""}
						belum tersedia.`}
					nextStepForVisitor={
						"Silahkan cek lagi profil UKM ini di lain waktu atau hubungi UKM melalui media sosial yang tersedia."
					}
				/>
			);
		}
		return "";
	};
	return (
		<div className="flex flex-col w-full gap-3 mt-3 text-lg">
			<span>
				Lapak atau <i>marketplace</i> milik UKM:
			</span>
			<div className="flex flex-col md:flex-row gap-4">
				<Button
					as={Link}
					className="bg-[#ef4c29] text-white text-xl"
					href={
						shopeeLink === null
							? `#${ukmName
									.replace(/\s/g, "-")
									.toLowerCase()}-belum-ada-lapak-shopee`
							: shopeeLink
					}
					startContent={<SiShopee className="text-lg" />}
					size="lg"
					isDisabled={shopeeLink === null ? true : false}
					target="_blank"
				>
					Shopee
				</Button>
				<Button
					as={Link}
					className={`${nunito.className} bg-[#41B548] text-white text-xl`}
					href={"#"}
					size="lg"
					isDisabled={
						tokopediaLink === null || tokopediaLink === undefined ? true : false
					}
					target="_blank"
				>
					Tokopedia
				</Button>
			</div>
			<div className="my-3">
				{showsInfoAlert(shopeeLink, tokopediaLink, ukmName)}
			</div>
		</div>
	);
}
