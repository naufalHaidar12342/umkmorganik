import { FALLBACK_HYGRAPH_API } from "@/app/constant/hygraph-api";
import { Link } from "@nextui-org/link";
import NextLink from "next/link";
import { Image } from "@nextui-org/image";
import NextImage from "next/image";
import ReactMarkdown from "react-markdown";
import { Divider } from "@nextui-org/divider";
import { Card, CardFooter } from "@nextui-org/card";

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

export async function fetchProductsOfSelectedUkm(ukmSlug) {
	const productsOfSelectedUkm = await fetch(FALLBACK_HYGRAPH_API, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			query: `query ProductsOfSelectedUkm{
				products(where: {productOrigin: {ukmSlug: "${ukmSlug}"}}) {
					productName
					productSlug
					creditImageReference {
						imageFile {
							url
						}
					}
					productOrigin {
						ukmName
					}
				}
			}`,
		}),
	})
		.then((res) => res.json())
		.catch((err) => console.log(err));
	return productsOfSelectedUkm.data.products;
}

export default async function ReadUmkmProfile({ params }) {
	const [selectedUkm] = await fetchSelectedUkmProfile(params.ukmSlug);
	const ukmName = selectedUkm.ukmName;
	const ukmDescription = selectedUkm.ukmDescription;
	const ukmChairman = selectedUkm.ukmChairman;
	const ukmCoverImage = selectedUkm.creditImageReference.imageFile.url;
	const ukmCoverImageCredit =
		selectedUkm.creditImageReference.imageCreditMarkdown;
	const productsOfSelectedUkm = await fetchProductsOfSelectedUkm(
		params.ukmSlug
	);
	return (
		<div className="flex flex-col flex-wrap w-full max-w-6xl">
			<div className="flex flex-col flex-wrap items-start">
				<div className="w-full h-56 xl:h-[440px] items-center relative">
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
				{/* credit foto sampul untuk profil ukm */}
				<ReactMarkdown
					className="italic pt-2"
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
				{/* profil ukm */}
				<div className="flex flex-col items-start pt-3">
					<h3 className="text-2xl font-semibold">{ukmName}</h3>
					<h4 className="py-2 text-lg text-primary-400">Tentang Usaha</h4>
					<p className="text-lg">Ketua UKM : {ukmChairman}</p>
					<p className="text-lg">
						Kategori Produk:{" "}
						{selectedUkm.categoryOfUkmProducts.map((item) => item)}
					</p>
					<div className="flex flex-col xl:flex-row xl:gap-1 text-lg">
						Situs milik UKM :{" "}
						<Link
							showAnchorIcon={selectedUkm.ukmWebsite === null ? false : true}
							href={
								selectedUkm.ukmWebsite === null
									? "#belum-ada-situs"
									: selectedUkm.ukmWebsite
							}
							color="success"
						>
							{selectedUkm.ukmWebsite === null
								? "UKM ini belum memiliki website"
								: selectedUkm.ukmName}
						</Link>{" "}
					</div>

					<h4 className="pt-4 pb-2 text-lg text-primary-400">Deskripsi UKM</h4>
					<p className="text-lg xl:text-xl">{ukmDescription}</p>
				</div>
				<Divider className="my-3" />
				{/* produk-produk dari ukm */}
				<div className="flex flex-col">
					<h4 className="text-lg text-primary-400">
						Produk-produk dari {selectedUkm.ukmName}
					</h4>
					<div className="grid grid-cols-1 xl:grid-cols-4 col-span-1 gap-5 py-2">
						{productsOfSelectedUkm.map((productFetched, index) => (
							<div className="flex flex-col" key={index}>
								<Card
									className="col-span-12 sm:col-span-4 w-60 h-56 xl:h-[360px] relative"
									isFooterBlurred
								>
									<Image
										as={NextImage}
										isZoomed
										removeWrapper
										alt={`Cover image untuk produk ${productFetched.productName}`}
										className="z-0"
										src={productFetched.creditImageReference.imageFile.url}
										style={{ objectFit: "cover" }}
										fill
										priority={true}
										sizes="(max-width:1366)100vw, 85vw"
									/>
									<CardFooter className="absolute bottom-0 xl:right-0 z-10 flex flex-col items-start p-4">
										<div className="flex flex-col">
											<span className="">
												{productFetched.productOrigin.ukmName}
											</span>
											<span className="font-semibold">
												{productFetched.productName}
											</span>
										</div>
										<Link
											as={NextLink}
											color="primary"
											href={`/katalog-produk/${productFetched.productSlug}`}
											className="w-full mt-4 xl:mt-0 xl:w-auto capitalize"
											size="lg"
										>
											Info lengkap
										</Link>
									</CardFooter>
								</Card>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
