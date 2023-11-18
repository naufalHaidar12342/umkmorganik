import { Card, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Link } from "@nextui-org/link";
import NextImage from "next/image";
import NextLink from "next/link";
import { FALLBACK_HYGRAPH_API } from "../constant/hygraph-api";

export async function fetchOpenGraphUkmProduct() {
	const openGraphUkmProduct = await fetch(FALLBACK_HYGRAPH_API, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		next: { revalidate: 100 },
		body: JSON.stringify({
			query: `query LatestProducts {
				products(orderBy: createdAt_DESC, first: 1) {
					productName
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
	return openGraphUkmProduct.data.products;
}

export async function generateMetadata() {
	const [openGraphUkmProduct] = await fetchOpenGraphUkmProduct();
	const openGraphProductName = openGraphUkmProduct.productName;
	const openGraphProductImage =
		openGraphUkmProduct.creditImageReference.imageFile.url;
	return {
		title: "Katalog Produk",
		description:
			"Katalog produk yang dipasarkan oleh UMKM yang hadir di website ini.",
		url: "https://umkmorganik.org/katalog-produk",
		openGraph: {
			title: "Katalog Produk",
			description:
				"Katalog produk yang dipasarkan oleh UMKM yang hadir di website ini.",
			url: "https://umkmorganik.org/katalog-produk",
			images: [
				{
					url: openGraphProductImage,
					width: 1280,
					height: 600,
					alt: `Foto sampul untuk produk ${openGraphProductName}`,
				},
			],
		},
	};
}

export async function fetchLatestProduct() {
	const latestProduct = await fetch(FALLBACK_HYGRAPH_API, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		next: { revalidate: 100 },
		body: JSON.stringify({
			query: `query LatestProducts {
				products(orderBy: createdAt_DESC) {
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
	return latestProduct.data.products;
}

export default async function ProductCatalog() {
	const latestProduct = await fetchLatestProduct();
	return (
		<div className="">
			{/* in development: drop-down untuk jenis marketplace yang menjual produk (shopee, tokopedia, dsb) */}
			{/* daftar produk */}
			<div className="max-w-6xl">
				<div className="block">
					<div className="flex flex-col xl:flex-row items-start">
						<h3 className="text-2xl font-semibold">Semua produk</h3>
					</div>
					<div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 py-4">
						{latestProduct.map((productFetched, index) => (
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
