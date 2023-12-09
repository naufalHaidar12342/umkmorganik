"use client";

import { nunito } from "@/app/fonts";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";

export default function TokopediaMarketplace({ ukmName, ukmTokopediaLink }) {
	return (
		<div>
			<Button
				as={Link}
				className={`${nunito.className} bg-[#41B548] text-white text-xl`}
				href={
					ukmTokopediaLink === null
						? `#${ukmName
								.replace(/\s/g, "-")
								.toLowerCase()}-belum-ada-lapak-tokopedia`
						: ukmTokopediaLink
				}
				onClick={
					ukmTokopediaLink === null
						? () =>
								alert(
									"Maaf, lapak Tokopedia milik " + ukmName + " belum tersedia"
								)
						: ""
				}
			>
				Tokopedia
			</Button>
		</div>
	);
}
