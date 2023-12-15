"use client";

import InfoAlert from "@/app/components/info-alert";
import { Link } from "@nextui-org/link";
const showInfoAlertForUkmWebsite = (ukmWebsiteLink, ukmName) => {
	if (ukmWebsiteLink === null) {
		return (
			<InfoAlert
				messageSubject={"Situs resmi milik " + ukmName + " belum tersedia."}
				messageContent="Pengunjung UMKM Organik, saat ini situs resmi milik UKM ini belum tersedia. Oleh karena itu, link menuju situs resmi UKM sengaja dinonaktifkan sementara."
				nextStepForVisitor="Silahkan cek lagi profil UKM ini di lain waktu."
			/>
		);
	}
};
export default function UkmOfficialSite({ ukmName, ukmWebsiteLink }) {
	return (
		<div className="flex flex-col w-full">
			<div className="flex flex-col md:flex-row ">
				<h4 className="text-lg">Situs resmi milik UKM:</h4>
				<Link
					href={ukmWebsiteLink}
					showAnchorIcon
					isDisabled={ukmWebsiteLink === null ? true : false}
					className="md:ml-2 text-primary-800"
					size="lg"
					target="_blank"
				>
					Situs Resmi {ukmName}
				</Link>
			</div>
			<div className="my-3">
				{showInfoAlertForUkmWebsite(ukmWebsiteLink, ukmName)}
			</div>
		</div>
	);
}
