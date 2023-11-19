import { Link } from "@nextui-org/link";
// import { BiSolidContact } from "react-icons/bi";
import { FaCopyright } from "react-icons/fa6";
export default function Footer() {
	return (
		<footer className="absolute w-full h-32 " color="primary">
			<div className="grid md:grid-cols-3 gap-4 p-5">
				<div className="flex flex-col">
					<p className="text-inherit font-bold">UMKM Organik </p>
					<span className="flex items-center">
						<FaCopyright className="mr-1" /> 2023
					</span>
					<span className="italic">Kreativitas Lokal, Kualitas Organik</span>
				</div>
				<div className="flex flex-col">
					<p className="text-lg font-bold">Kontak</p>
					<Link href={"#"}>Email</Link>
				</div>
			</div>
		</footer>
	);
}
