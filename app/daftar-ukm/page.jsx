import { Card, CardBody, CardFooter } from "@nextui-org/card";
import NextImage from "next/image";
import { Image } from "@nextui-org/image";
import { FALLBACK_HYGRAPH_API } from "@/app/constant/hygraph-api";
import { Button } from "@nextui-org/button";
import NextLink from "next/link";

export async function fetchUkmProfileForMetadata() {
	const ukmMetadata = await fetch(FALLBACK_HYGRAPH_API, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		next: {
			revalidate: 100,
		},
		body: JSON.stringify({
			query: `query AllUkmProfiles {
				ukmProfiles(orderBy: createdAt_ASC, first: 1) {
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
	return ukmMetadata.data.ukmProfiles;
}

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
	const [ukmMetadata] = await fetchUkmProfileForMetadata();
	const ukmOpenGraphImage = ukmMetadata.creditImageReference.imageFile.url;
	const ukmOpenGraphTitle = ukmMetadata.ukmName;
	return {
		title: "Daftar UMKM",
		description: "Daftar UMKM yang bergerak di bidang produk organik",
		url: "https://umkmorganik.org/daftar-ukm",
		openGraph: {
			title: "Daftar UMKM",
			description: "Daftar UMKM yang bergerak di bidang produk organik",
			url: "https://umkmorganik.org/daftar-ukm",
			images: [
				{
					url: ukmOpenGraphImage,
					width: 1280,
					height: 600,
					alt: `Foto sampul dari ${ukmOpenGraphTitle}`,
				},
			],
		},
	};
}

export default async function UmkmList() {
	const fetchedUkmProfiles = await fetchAllUmkmProfiles();
	return (
		<div className="flex flex-col flex-wrap w-full max-w-6xl">
			<h3 className="text-2xl font-bold text-center xl:text-start">
				UMKM Dengan Produk Organik
			</h3>
			<div className="grid grid-cols-1 col-span-2 gap-8 py-5">
				{fetchedUkmProfiles.map((ukmProfile, index) => (
					<Card
						className="flex flex-col xl:flex-row bg-background/60 dark:bg-default-100/50 shadow-lg shadow-success-100"
						key={index}
					>
						<div className="w-full xl:w-1/2 h-48 xl:h-64 relative">
							<Image
								as={NextImage}
								removeWrapper
								src={ukmProfile.creditImageReference.imageFile.url}
								alt={`Cover image untuk ${ukmProfile.ukmName}`}
								style={{ objectFit: "cover" }}
								fill
								priority={true}
								sizes="(max-width:1366)100vw, 85vw"
							/>
						</div>
						<div className="w-full flex flex-col justify-center items-start p-6">
							<h4 className="pb-2 text-xl font-semibold">
								{ukmProfile.ukmName}
							</h4>
							<p>{ukmProfile.ukmDescription}</p>
							<Button
								as={NextLink}
								href={`/daftar-ukm/${ukmProfile.ukmSlug}`}
								className="w-full xl:w-auto mt-4 font-medium"
								size="lg"
								variant="ghost"
								color="success"
							>
								Biografi UKM
							</Button>
						</div>
					</Card>
				))}
			</div>
		</div>
	);
}
