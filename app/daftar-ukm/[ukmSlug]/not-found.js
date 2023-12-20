import PageNotFoundTitle from "@/app/components/page-not-found-title";
import Link from "next/link";

export default function UkmNotFound() {
	return (
		<div className="flex flex-col max-w-7xl items-start md:items-center">
			<PageNotFoundTitle />
			<div className="text-2xl">
				<p className="pt-10">
					Pengunjung UMKM Organik, sepertinya profil UKM yang Anda cari tidak
					ditemukan pada website ini.
				</p>
				<p className="pt-4">
					Silahkan kembali ke
					<Link href="/daftar-ukm" className="pl-1 text-primary-800 underline ">
						halaman daftar UKM
					</Link>{" "}
					untuk memilih profil UKM lainnya.
				</p>
			</div>
		</div>
	);
}
