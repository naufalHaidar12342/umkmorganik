import { FALLBACK_HYGRAPH_API } from "@/app/constant/hygraph-api";
import { Link } from "@nextui-org/link";
import NextLink from "next/link";
import { Image } from "@nextui-org/image";
import NextImage from "next/image";
import ReactMarkdown from "react-markdown";
import { Divider } from "@nextui-org/divider";
import { Card, CardFooter, CardBody } from "@nextui-org/card";
import { SOLIDCOLOR_BLURDATA } from "@/app/constant/solidcolor-blurdata";

import UkmMarketplaces from "./_partial-views-selected-ukm/ukm-marketplaces";
import { SlLink } from "react-icons/sl";
import UkmOfficialSite from "./_partial-views-selected-ukm/ukm-official-site";
import CustomBreadcrumbs from "@/app/components/breadcrumbs";
import { notFound } from "next/navigation";
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
	if (ukmSlug != selectedUkm.data.ukmProfiles.ukmSlug) {
		notFound();
	}
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
	const ukmProfileBreadcrumbs = [
		{ pageName: "Halaman Utama", pageUrl: "/" },
		{ pageName: "Daftar UKM", pageUrl: "/daftar-ukm" },
		{ pageName: ukmName, pageUrl: `/daftar-ukm/${params.ukmSlug}` },
	];
	return (
		<div className="flex flex-col flex-wrap w-full max-w-7xl">
			<CustomBreadcrumbs breadcrumbsPath={ukmProfileBreadcrumbs} />
			<div className="flex flex-col flex-wrap items-start">
				{/* foto sampul ukm */}
				<div className="w-full h-56 xl:h-[440px] items-center relative">
					<NextImage
						className="rounded-2xl"
						src={ukmCoverImage}
						alt={`Foto sampul dari ${ukmName}`}
						style={{ objectFit: "cover" }}
						fill
						priority={true}
						sizes="(max-width:480px) 100vw, (max-width:1366px) 80vw, 75vw"
						placeholder="blur"
						blurDataURL={`data:image/png;base64,${SOLIDCOLOR_BLURDATA}`}
						quality={70}
						loading="eager"
					/>
				</div>
				{/* credit foto sampul untuk profil ukm */}
				<ReactMarkdown
					className="italic pt-2"
					components={{
						a: (link) => {
							return (
								<Link
									href={link.href}
									referrerPolicy="no-referrer"
									target="_blank"
									className="text-primary-800"
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
					<h4 className="py-2 text-lg text-primary-700">Tentang Usaha</h4>
					<p className="text-lg">Ketua UKM : {ukmChairman}</p>
					<p className="text-lg">
						Kategori Produk:{" "}
						{selectedUkm.categoryOfUkmProducts.map((item) => item)}
					</p>
					<UkmOfficialSite
						ukmName={ukmName}
						ukmWebsiteLink={selectedUkm.ukmWebsite}
					/>

					<UkmMarketplaces
						shopeeLink={ukmMarketplaces.shopeeStore}
						tokopediaLink={ukmMarketplaces.tokopediaStore}
						ukmName={ukmName}
					/>
					<h4 className="pt-4 pb-2 text-lg text-primary-700">Deskripsi UKM</h4>
					<p className="text-lg xl:text-xl">{ukmDescription}</p>
				</div>
				<Divider className="my-3" />
				{/* produk-produk dari ukm */}
				<div className="flex flex-col">
					<h4 className="text-lg text-primary-700">
						Produk-produk dari {selectedUkm.ukmName}
					</h4>
					<div className="flex justify-center">
						<div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-6 py-2 ">
							{productsOfSelectedUkm.map((productFetched, index) => (
								<div className="flex flex-col" key={index}>
									<Card className="w-60 h-80 xl:h-[400px] relative bg-slate-950 shadow-md shadow-green-600">
										<CardBody className="">
											<Image
												as={NextImage}
												removeWrapper
												alt={`Cover image untuk produk ${productFetched.productName}`}
												className=""
												src={productFetched.creditImageReference.imageFile.url}
												style={{ objectFit: "cover" }}
												fill
												priority={false}
												sizes="(max-width:480px) 100vw, (max-width:1366px) 80vw, 65vw"
												placeholder="blur"
												blurDataURL={`data:image/png;base64,${SOLIDCOLOR_BLURDATA}`}
												quality={65}
											/>
										</CardBody>
										<CardFooter className="flex flex-col items-start p-4 h-[54%] lg:h-[47%]">
											<div className="flex flex-col w-full">
												<span className="font-bold">
													{productFetched.productOrigin.ukmName}
												</span>
												<span className="font-medium">
													{productFetched.productName}
												</span>
												<Link
													as={NextLink}
													href={`/katalog-produk/${productFetched.productSlug}`}
													className="mt-3 text-primary-700 w-full capitalize "
													underline="hover"
													anchorIcon={<SlLink className="ml-2 text-lg" />}
													showAnchorIcon
												>
													Info lengkap
												</Link>
											</div>
										</CardFooter>
									</Card>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
