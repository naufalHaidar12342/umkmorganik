import { MdErrorOutline } from "react-icons/md";
export default function ErrorAlert({ message }) {
	return (
		<div className="w-full h-10 p-4 bg-danger-200 text-white flex">
			<MdErrorOutline className="text-2xl" />
			<span>{message}</span>
		</div>
	);
}
