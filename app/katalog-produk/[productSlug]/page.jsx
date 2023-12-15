import { FALLBACK_HYGRAPH_API } from "@/app/constant/hygraph-api";
import { Link } from "@nextui-org/link";
import { Image } from "@nextui-org/image";
import NextImage from "next/image";
import NextLink from "next/link";
import ReactMarkdown from "react-markdown";
import { Chip } from "@nextui-org/chip";
import { Button } from "@nextui-org/button";

import { SOLIDCOLOR_BLURDATA } from "@/app/constant/solidcolor-blurdata";
import CustomBreadcrumbs from "@/app/components/breadcrumbs";
import ShoppingLink from "./_partial-views-productSlug/shopping-link";

export async function generateMetadata({ params }) {
	const [selectedProduct] = await fetchInfoSelectedProduct(params.productSlug);
	const openGraphProductName = selectedProduct.productName;
	const openGraphProductDescription = selectedProduct.productDescription;
	const openGraphProductImage =
		selectedProduct.creditImageReference.imageFile.url;
	return {
		title: openGraphProductName,
		description: openGraphProductDescription,
		url: `https://umkmorganik.org/katalog-produk/${params.slug}`,
		openGraph: {
			title: openGraphProductName,
			description: openGraphProductDescription,
			url: `https://umkmorganik.org/katalog-produk/${params.slug}`,
			images: [
				{
					url: openGraphProductImage,
					width: 1280,
					height: 600,
					alt: openGraphProductName,
				},
			],
		},
	};
}

export async function fetchInfoSelectedProduct(productSlug) {
	const selectedProduct = await fetch(FALLBACK_HYGRAPH_API, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			query: `query SelectedUkmProduct{
				products(where: {productSlug: "${productSlug}"}) {
					productName
					productDescription
					productLink
					category
					productOrigin{
						ukmName
						ukmSlug
					}
					creditImageReference {
						imageCreditMarkdown
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
	return selectedProduct.data.products;
}

export default async function ProductInfos({ params }) {
	const [selectedProduct] = await fetchInfoSelectedProduct(params.productSlug);
	const productName = selectedProduct.productName;
	const productDescription = selectedProduct.productDescription;
	const productCoverImage = selectedProduct.creditImageReference.imageFile.url;
	const productCreditImage =
		selectedProduct.creditImageReference.imageCreditMarkdown;
	const productCategory = selectedProduct.category;
	// console.log("kategori produk", productCategory);
	const productOriginUkmName = selectedProduct.productOrigin.ukmName;
	const productOriginUkmSlug = selectedProduct.productOrigin.ukmSlug;
	const productLink = selectedProduct.productLink;
	const breadCrumbsProductInfo = [
		{ pageName: "Halaman Utama", pageUrl: "/" },
		{ pageName: "Katalog Produk", pageUrl: "/katalog-produk" },
		{
			pageName: `${productOriginUkmName} - ${productName}`,
			pageUrl: `/ukm/${productOriginUkmSlug}`,
		},
	];
	return (
		<div className="flex flex-col flex-wrap w-full max-w-6xl">
			<CustomBreadcrumbs breadcrumbsPath={breadCrumbsProductInfo} />
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
				<div className="flex flex-col">
					<div className="w-full h-56 xl:h-[320px] relative">
						<Image
							removeWrapper
							as={NextImage}
							src={productCoverImage}
							alt={`Foto sampul dari produk ${productName}`}
							className="xl:w-[320px]"
							style={{ objectFit: "cover" }}
							fill
							priority={true}
							sizes="(max-width:1366px)100vw, 85vw"
							placeholder="blur"
							blurDataURL={`data:image/webp;base64,${SOLIDCOLOR_BLURDATA}`}
						/>
					</div>

					<ReactMarkdown
						className="italic pt-2"
						components={{
							a: (link) => {
								return (
									<Link
										className="text-primary-800 font-semibold"
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
						{productCreditImage}
					</ReactMarkdown>
				</div>
				<div className="w-full flex flex-col items-start gap-5 pt-3">
					<div className="flex flex-col xl:col-span-1">
						<h3 className=" text-xl font-semibold">
							{productOriginUkmName} - {productName}
						</h3>
						{/* kategori produk */}
						<div className="flex flex-wrap gap-2 pt-1">
							{productCategory.map((category, index) => (
								<Chip key={index} color="success" variant="faded">
									{category}
								</Chip>
							))}
						</div>
					</div>
					<div className="flex flex-col col-span-2">
						<h4 className="text-lg text-primary-700 font-semibold">
							Deskripsi produk
						</h4>
						<p className="text-lg">{productDescription}</p>
					</div>
					<ShoppingLink
						productLink={productLink}
						productUkmOrigin={productOriginUkmName}
						productTitle={productName}
					/>
				</div>
			</div>
		</div>
	);
}
