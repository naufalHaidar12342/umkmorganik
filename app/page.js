import Image from "next/image";
import Foto1 from "../public/images/fotoukm1.jpg";
import Foto2 from "../public/images/fotoukm2.jpg";
import Foto3 from "../public/images/fotoukm3.jpg";
import Foto4 from "../public/images/nib-ukm-menik-jaya.jpg";

export default function Home() {
	return (
		<main className="min-h-screen flex flex-col justify-center items-center p-6">
			{/* tentang umkm */}
			<div className="hero min-h-screen bg-base-200">
				<div className="hero-content text-center">
					<div className="max-w-md">
						<h1 className="text-5xl font-bold">UKM Menik Jaya</h1>
						<p className="py-6">
							Menik Jaya adalah kelompok masyarakat dari Desa Banyumanik,
							Kecamatan Banyumanik Kota Semarang yang beranggotakan 36 orang.
							Mereka telah memproduksi serbuk minuman empon-empon sejak tahun
							2021. Serbuk tersebut terbuat dari jahe, kunir dan temu lawak.
						</p>
						<p className="py-2">Ketua UKM: Sumiyati</p>
						<p className="pb-6">Alamat UKM: Banyumanik Barat RT 01/RW 04</p>
					</div>
				</div>
			</div>
			{/* dokumentasi ukm */}
			<p className="py-5 text-2xl font-bold">Produk UKM</p>
			<div className="grid grid-cols-1 xl:grid-cols-3 col-span-2 gap-6 2xl:gap-8 p-6">
				<div className="w-full h-48 2xl:h-60">
					<Image
						className="rounded-xl"
						src={Foto1}
						alt="Dokumentasi UKM 1"
						priority={true}
						placeholder="blur"
					/>
				</div>
				<div className="w-full h-48 2xl:h-60">
					<Image
						className="rounded-xl"
						src={Foto2}
						alt="Dokumentasi UKM 2"
						priority={true}
						placeholder="blur"
					/>
				</div>
				<div className="w-full h-48 2xl:h-60">
					<Image
						className="rounded-xl"
						src={Foto3}
						alt="Dokumentasi UKM 3"
						priority={true}
						placeholder="blur"
					/>
				</div>
			</div>
			{/* nomor induk berusaha ukm menik jaya */}
			<p className="py-5 text-2xl font-bold">
				Nomor Induk Berusaha (NIB) UKM Menik Jaya
			</p>
			<Image
				className="rounded-xl"
				src={Foto4}
				alt="NIB UKM Menik Jaya"
				priority={true}
			/>
		</main>
	);
}
