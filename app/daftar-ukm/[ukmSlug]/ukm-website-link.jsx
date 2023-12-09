"use client";

import { Link } from "@nextui-org/link";
import toast, { Toaster } from "react-hot-toast";

function websiteLinkNotAvailable(ukmName) {
	return toast.error(
		"Maaf, situs resmi milik " +
			ukmName +
			" belum tersedia. Silahkan cek kembali nanti."
	);
}

export default function UkmWebsiteLink({ ukmName, ukmWebsite }) {
	return (
		<div>
			<Link
				showAnchorIcon={true}
				href={
					ukmWebsite === null
						? `#${ukmName
								.replace(/\s/g, "-")
								.toLowerCase()}-belum-ada-situs-resmi`
						: ukmWebsite
				}
				color="success"
				onClick={
					ukmWebsite === null
						? () => alert("Maaf, situs resmi milik " + ukmName + " belum ada.")
						: ""
				}
				target={ukmWebsite === null ? "_self" : "_blank"}
			>
				Situs resmi {ukmName}
			</Link>
		</div>
	);
}
