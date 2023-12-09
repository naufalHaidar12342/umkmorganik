import { FALLBACK_HYGRAPH_API } from "@/app/constant/hygraph-api";
import { Link } from "@nextui-org/link";
import NextLink from "next/link";
import { Image } from "@nextui-org/image";
import NextImage from "next/image";
import ReactMarkdown from "react-markdown";
import { Divider } from "@nextui-org/divider";
import { Card, CardFooter } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { SiShopee } from "react-icons/si";
import ShopeeMarketplaceButton from "./shopee-button";
import UkmWebsiteLink from "./ukm-website-link";
import TokopediaMarketplace from "./tokopedia-button";
import { SOLIDCOLOR_BLURDATA } from "@/app/constant/solidcolor-blurdata";

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
		cache: "no-cache",
		body: JSON.stringify({
			query: `query SelectedUkmProfile{
				ukmProfiles(where: {ukmSlug: "${ukmSlug}"}) {
					ukmName
					ukmSlug
					ukmDescription
					ukmChairman
					categoryOfUkmProducts
					ukmWebsite
					creditImageReference{
						imageCreditMarkdown
						imageFile{
							url
						}
					}
					ukmMarketplaces{
						shopeeStore
						tokopediaStore
						blibliStore
						lazadaStore
					}
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
				products(where: {productOrigin: {ukmSlug: "${ukmSlug}"}}, orderBy: createdAt_DESC) {
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
	// console.log("isi ukm terpilih=", selectedUkm);
	const ukmName = selectedUkm.ukmName;
	const ukmDescription = selectedUkm.ukmDescription;
	const ukmChairman = selectedUkm.ukmChairman;
	const ukmCoverImage = selectedUkm.creditImageReference.imageFile.url;
	const ukmCoverImageCredit =
		selectedUkm.creditImageReference.imageCreditMarkdown;
	const productsOfSelectedUkm = await fetchProductsOfSelectedUkm(
		params.ukmSlug
	);
	const [ukmMarketplaces] = selectedUkm.ukmMarketplaces;
	console.log("isi ukmMarketplaces=", ukmMarketplaces);
	// const shopeeStore = ukmMarketplaces.shopeeStore;
	// console.log("isi shopeeStore=", shopeeStore);

	return (
		<div className="flex flex-col flex-wrap w-full max-w-6xl">
			<div className="flex flex-col flex-wrap items-start">
				<div className="w-full h-56 xl:h-[440px] items-center relative">
					<NextImage
						className="rounded-2xl"
						src={ukmCoverImage}
						alt={`Foto sampul dari ${ukmName}`}
						style={{ objectFit: "cover" }}
						fill
						priority={true}
						sizes="(max-width:480px) 100vw, (max-width:1366px) 80vw, 65vw"
						placeholder="blur"
						blurDataURL={`data:image/png;base64,${SOLIDCOLOR_BLURDATA}`}
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
						<span>Situs milik UKM:</span>
						<UkmWebsiteLink
							ukmName={ukmName}
							ukmWebsite={selectedUkm.ukmWebsite}
						/>
					</div>
					<div className="flex flex-col md:flex-row md:items-center gap-3 pt-4">
						<span className="text-lg">Lapak/marketplace UKM :</span>
						<ShopeeMarketplaceButton
							shopeeMarketplaceLink={ukmMarketplaces.shopeeStore}
							ukmName={ukmName}
						/>
						<TokopediaMarketplace
							ukmTokopediaLink={ukmMarketplaces.tokopediaStore}
							ukmName={ukmName}
						/>
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
										sizes="(max-width:480px) 100vw, (max-width:1366px) 80vw, 65vw"
										placeholder="blur"
										blurDataURL={`data:image/png;base64,${SOLIDCOLOR_BLURDATA}`}
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
