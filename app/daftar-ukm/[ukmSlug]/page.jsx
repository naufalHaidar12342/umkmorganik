import { FALLBACK_HYGRAPH_API } from "@/app/constant/hygraph-api";
import { Link } from "@nextui-org/link";
import { Image } from "@nextui-org/image";
import NextImage from "next/image";
import ReactMarkdown from "react-markdown";
import { Divider } from "@nextui-org/divider";

export async function generateMetadata({ params }) {
	const [selectedUkm] = await fetchSelectedUkmProfile(params.ukmSlug);
	const openGraphUkmName = selectedUkm.ukmName;
	const openGraphUkmDescription = selectedUkm.ukmDescription;
	const openGraphUkmImage = selectedUkm.creditImageReference.imageFile.url;
	return {
		title: openGraphUkmName,
		description: openGraphUkmDescription,
		url: `https://umkmorganik.org/daftar-ukm/${params.ukmSlug}`,
		openGraph: {
			title: openGraphUkmName,
			description: openGraphUkmDescription,
			url: `https://umkmorganik.org/daftar-ukm/${params.ukmSlug}`,
			images: [
				{
					url: openGraphUkmImage,
					width: 1280,
					height: 600,
					alt: `Foto sampul dari ${openGraphUkmName}`,
				},
			],
		},
	};
}
/* ukmSocialMedia: akan bernilai array kosong jika belum ada link yang ditambahkan.
ukmWebsite: bernilai null jika belum ada isinya
categoryOfUkmProducts: bernilai array kosong jika belum ada isinya */
export async function fetchSelectedUkmProfile(ukmSlug) {
	const selectedUkm = await fetch(FALLBACK_HYGRAPH_API, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			query: `query SelectedUkmProfile{
				ukmProfiles(where: {ukmSlug: "${ukmSlug}"}) {
					ukmName
					ukmSlug
					ukmDescription
					ukmChairman
					creditImageReference{
						imageCreditMarkdown
						imageFile{
							url
						}
					}
					categoryOfUkmProducts
					ukmSocialMedia
					ukmWebsite
				}
			}`,
		}),
	})
		.then((res) => res.json())
		.catch((err) => console.log(err));
	return selectedUkm.data.ukmProfiles;
}

export default async function ReadUmkmProfile({ params }) {
	const [selectedUkm] = await fetchSelectedUkmProfile(params.ukmSlug);
	const ukmName = selectedUkm.ukmName;
	const ukmDescription = selectedUkm.ukmDescription;
	const ukmChairman = selectedUkm.ukmChairman;
	const ukmCoverImage = selectedUkm.creditImageReference.imageFile.url;
	const ukmCoverImageCredit =
		selectedUkm.creditImageReference.imageCreditMarkdown;
	return (
		<div className="flex flex-col flex-wrap w-full max-w-6xl">
			<div className="flex flex-col flex-wrap items-center gap-4">
				<div className="w-full h-56 xl:h-[440px] relative">
					<Image
						removeWrapper
						as={NextImage}
						src={ukmCoverImage}
						alt={`Foto sampul dari ${ukmName}`}
						style={{ objectFit: "cover" }}
						fill
						priority={true}
						sizes="(max-width:1366)100vw, 85vw"
					/>
				</div>
				<ReactMarkdown
					className="italic "
					components={{
						a: (link) => {
							return (
								<Link
									color="primary"
									href={link.href}
									referrerPolicy="no-referrer"
									target="_blank"
								>
									{link.children}
								</Link>
							);
						},
					}}
				>
					{ukmCoverImageCredit}
				</ReactMarkdown>
				<h3 className=" text-2xl font-semibold">{ukmName}</h3>
				<p className="text-md">Ketua UKM : {ukmChairman}</p>
				<p className="text-lg xl:text-xl">{ukmDescription}</p>
			</div>
		</div>
	);
}
