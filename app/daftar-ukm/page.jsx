import { Card, CardBody, CardFooter } from "@nextui-org/card";
import NextImage from "next/image";
import { Image } from "@nextui-org/image";
import { Pagination } from "@nextui-org/pagination";
import { FALLBACK_HYGRAPH_API } from "../constant/hygraph-api";

export async function fetchAllUmkmProfiles() {
	const allUmkm = await fetch(FALLBACK_HYGRAPH_API, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		next: {
			revalidate: 100,
		},
		body: JSON.stringify({
			query: `query AllUkmProfiles {
				ukmProfiles(orderBy: createdAt_ASC) {
					ukmName
					ukmDescription
					ukmSlug
					creditImageReference {
						imageFile {
							url
						}
					}
				}
			}`,
		}),
	})
		.then((res) => res.json())
		.catch((err) => console.log(err));
	return allUmkm.data.ukmProfiles;
}

export async function generateMetadata() {
	return {
		title: "Daftar UMKM",
		description: "Daftar UMKM yang bergerak di bidang produk organik",
	};
}

export default async function UmkmList() {
	const fetchedUkmProfiles = await fetchAllUmkmProfiles();
	return (
		<div className="flex flex-col flex-wrap w-full max-w-6xl">
			<div className="grid grid-cols-1 col-span-2 gap-7 py-5">
				{fetchedUkmProfiles.map((ukmProfile, index) => (
					<Card
						className="flex flex-col xl:flex-row bg-background/60 dark:bg-default-100/50"
						shadow="sm"
						key={index}
					>
						<div className="w-full xl:w-1/2 h-48 xl:h-64 relative">
							<NextImage
								src={ukmProfile.creditImageReference.imageFile.url}
								alt={`Cover image untuk ${ukmProfile.ukmName}`}
								style={{ objectFit: "cover" }}
								fill
								priority={true}
								sizes="(max-width:1366)100vw, 85vw"
							/>
						</div>
						<div className="w-full flex flex-col justify-center items-start p-6">
							<h4 className="pb-2">{ukmProfile.ukmName}</h4>
							<p>{ukmProfile.ukmDescription}</p>
						</div>
					</Card>
				))}
			</div>
		</div>
	);
}
