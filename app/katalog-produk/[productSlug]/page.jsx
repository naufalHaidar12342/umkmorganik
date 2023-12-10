import { FALLBACK_HYGRAPH_API } from "@/app/constant/hygraph-api";
import { Link } from "@nextui-org/link";
import { Image } from "@nextui-org/image";
import NextImage from "next/image";
import NextLink from "next/link";
import ReactMarkdown from "react-markdown";
import { Chip } from "@nextui-org/chip";
import { Button } from "@nextui-org/button";
import { IoCartOutline } from "react-icons/io5";
import { SOLIDCOLOR_BLURDATA } from "@/app/constant/solidcolor-blurdata";

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
	return (
		<div className="flex flex-col flex-wrap w-full max-w-6xl">
			<div className="flex flex-col items-center">
				<div className="w-full h-56 xl:h-[600px] relative">
					<Image
						removeWrapper
						as={NextImage}
						src={productCoverImage}
						alt={`Foto sampul dari produk ${productName}`}
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
					{productCreditImage}
				</ReactMarkdown>
				<div className="w-full grid grid-cols-1 xl:grid-cols-3 items-start gap-5 pt-3">
					<div className="flex flex-col xl:col-span-1">
						<h3 className=" text-xl font-semibold">
							{productOriginUkmName} - {productName}
						</h3>
						<Button
							as={Link}
							href={`
								${productLink === null ? "#belum-ada-link-produk" : productLink}
							`}
							size="lg"
							className="mt-3 text-lg font-medium"
							color="primary"
							variant="shadow"
							startContent={<IoCartOutline className="w-6 h-6" />}
						>
							Belanja sekarang
						</Button>
					</div>
					<div className="flex flex-col col-span-2">
						<h4 className="text-lg text-primary-400 font-semibold">
							Deskripsi produk
						</h4>
						<p className="text-lg">{productDescription}</p>
						{/* kategori produk */}
						<div className="flex flex-wrap gap-2 pt-1">
							{productCategory.map((category, index) => (
								<Chip key={index} color="success" variant="faded">
									{category}
								</Chip>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
