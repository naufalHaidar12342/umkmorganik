import { FaCircleInfo } from "react-icons/fa6";
export default function InfoAlert({
	messageSubject = "Pengunjung UMKM Organik, mohon kesediaannya membaca informasi ini",
	messageContent = "",
	nextStepForVisitor = "",
}) {
	return (
		<div className="w-full h-full p-4 bg-primary-700 text-black flex flex-col items-center rounded-2xl">
			<div className="flex flex-col md:flex-row items-center">
				<FaCircleInfo className="text-2xl" />
				{/* message title/subject */}
				<h4 className="text-xl font-semibold ml-0 md:ml-3">{messageSubject}</h4>
			</div>
			<p className="pt-2 text-lg">{messageContent}</p>
			{/* action the user should take */}
			<p className="pt-2 text-lg">
				<span className="font-semibold">
					Langkah selanjutnya bagi pengunjung UMKM Organik:
				</span>{" "}
				{nextStepForVisitor}
			</p>
		</div>
	);
}
