"use client";

import InfoAlert from "@/app/components/info-alert";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { IoCartOutline } from "react-icons/io5";

export default function ShoppingLink({
	productLink,
	productTitle,
	productUkmOrigin,
}) {
	const productLinkNotAvailableInfo = (
		productLink,
		nameOfProduct,
		ukmOrigin
	) => {
		if (productLink === null || productLink === undefined) {
			return (
				<InfoAlert
					messageSubject="Link produk belum tersedia"
					messageContent={`Pengunjung UMKM Organik, saat ini produk ${nameOfProduct} dari ${ukmOrigin} belum memiliki link untuk berbelanja secara online. Untuk menghindari kesalahan dari sistem, maka tombol "Belanja sekarang" sementara dinonaktifkan.`}
					nextStepForVisitor="Silahkan kembali lagi di lain waktu untuk melihat apakah produk ini sudah memiliki link untuk berbelanja secara online."
				/>
			);
		}
		return "";
	};
	return (
		<div className="flex flex-col w-full">
			<Button
				as={Link}
				href={`${productLink}`}
				size="lg"
				className="mt-3 text-lg font-medium"
				color="primary"
				variant="shadow"
				startContent={<IoCartOutline className="w-6 h-6" />}
				isDisabled={
					productLink === null || productLink === undefined ? true : false
				}
			>
				Belanja sekarang
			</Button>
			<div className="mt-6">
				{productLinkNotAvailableInfo(
					productLink,
					productTitle,
					productUkmOrigin
				)}
			</div>
		</div>
	);
}
