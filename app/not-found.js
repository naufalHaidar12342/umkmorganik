import Link from "next/link";
import { BiSolidError } from "react-icons/bi";
import PageNotFoundTitle from "./components/page-not-found-title";

export async function generateMetadata() {
	return {
		title: "Halaman tidak ditemukan",
		description: "Halaman tidak ditemukan",
	};
}
export default function NotFound() {
	return (
		<div className="flex flex-col max-w-7xl items-start md:items-center">
			<PageNotFoundTitle />
			<div className="text-2xl">
				<p className=" pt-10">
					Pengunjung UMKM Organik, sepertinya halaman/menu yang Anda cari tidak
					ditemukan pada website ini.
				</p>
				<p className="pt-3">
					Silahkan kembali ke
					<Link href="/" className="pl-1 text-primary-800 underline ">
						halaman utama.
					</Link>{" "}
					atau gunakan menu navigasi di atas.
				</p>
			</div>
		</div>
	);
}
