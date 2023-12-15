import { MdErrorOutline } from "react-icons/md";
export default function ErrorAlert({ message }) {
	return (
		<div className="flex items-center w-full h-10 p-4 bg-danger-700 text-white rounded-xl">
			<MdErrorOutline className="text-2xl" />
			<span>{message}</span>
		</div>
	);
}
