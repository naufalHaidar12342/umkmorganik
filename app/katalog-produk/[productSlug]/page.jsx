import { FALLBACK_HYGRAPH_API } from "@/app/constant/hygraph-api";
import { Link } from "@nextui-org/link";
import { Image } from "@nextui-org/image";
import NextImage from "next/image";
import NextLink from "next/link";
import ReactMarkdown from "react-markdown";

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
	const productOriginUkmName = selectedProduct.productOrigin.ukmName;
	const productOriginUkmSlug = selectedProduct.productOrigin.ukmSlug;
	return (
		<div className="flex flex-col flex-wrap w-full max-w-6xl">
			<div className="flex flex-col flex-wrap items-center gap-4">
				<div className="w-full h-56 xl:h-[400px] relative">
					<Image
						removeWrapper
						as={NextImage}
						src={productCoverImage}
						alt={`Foto sampul dari produk ${productName}`}
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
					{productCreditImage}
				</ReactMarkdown>
				<h3 className=" text-2xl font-semibold">{productName}</h3>
				<p className="text-md">
					Produk dari{" "}
					<Link
						as={NextLink}
						color="primary"
						showAnchorIcon
						href={productOriginUkmSlug}
					>
						{productOriginUkmName}
					</Link>
				</p>
				<p className="text-lg xl:text-xl">{productDescription}</p>
			</div>
		</div>
	);
}
