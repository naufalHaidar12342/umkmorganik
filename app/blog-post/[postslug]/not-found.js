import PageNotFoundTitle from "@/app/components/page-not-found-title";
import Link from "next/link";

export default function BlogpostNotFound() {
	return (
		<div className="flex flex-col max-w-7xl items-start md:items-center">
			<PageNotFoundTitle />
			<div className="text-2xl">
				<p className="pt-10">
					Pengunjung UMKM Organik, sepertinya <i>post</i> atau postingan yang
					Anda pilih tidak ditemukan dalam <i>website</i> ini.
				</p>
				<p className="pt-3">
					Silahkan kembali ke halaman{" "}
					<Link href={"/blog-post"} className="pl-1 text-primary-800 underline">
						blogpost
					</Link>{" "}
					untuk memilih <i>blogpost</i> atau postingan lainnya.
				</p>
			</div>
		</div>
	);
}
