import { BiSolidError } from "react-icons/bi";
import { TbError404 } from "react-icons/tb";
export default function PageNotFoundTitle() {
	return (
		<div className="flex flex-col md:flex-row items-center text-danger-700">
			<BiSolidError className="text-5xl md:mr-4" />
			<h2 className="text-4xl text-center font-bold">
				Halaman tidak ditemukan.
			</h2>
		</div>
	);
}
