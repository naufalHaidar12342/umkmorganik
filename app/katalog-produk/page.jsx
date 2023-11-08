import FilterProduk from "@/app/components/filter-produk";
import MarketplaceDropdown from "@/app/components/marketplace-dropdown";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Link } from "@nextui-org/link";
import NextImage from "next/image";
import NextLink from "next/link";
export async function fetchUkmProducts() {}

export async function generateMetadata() {
	return {
		title: "Katalog Produk",
		description:
			"Katalog produk yang dipasarkan oleh UMKM yang hadir di website ini.",
	};
}

export async function fetchLatestProduct() {
	const latestProduct = await fetch(process.env.KATALOG_UMKM_API, {
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
		<main className="min-h-full flex flex-col justify-center items-center p-6">
			{/* drop-down untuk jenis marketplace yang menjual produk (shopee, tokopedia, dsb) */}
			<div className="max-w-6xl">
				<div className="block py-5">
					<div className="flex gap-3">
						<div>filter marketplace (🚧 in development) </div>
						<div>filter jenis produk (🚧 in development) </div>
					</div>
				</div>
				<div className="block">
					<div className="grid grid-cols-1 xl:grid-cols-4 col-span-2 gap-5">
						{latestProduct.map((product, index) => (
							<div className="flex flex-col" key={index}>
								<Card className="pb-4">
									<Image
										isZoomed
										as={NextImage}
										alt={`Cover image untuk produk`}
										className=""
										src={product.creditImageReference.imageFile.url}
										width={300}
										height={300}
										priority={true}
										// style={{ objectFit: "cover" }}
										// fill
									/>

									<CardFooter className="pb-0 pt-5 px-4 flex-col items-start">
										<h4 className="font-bold text-large">
											{product.productName}
										</h4>
										<Link
											as={NextLink}
											href={`/katalog-produk/${product.productSlug}`}
											color="primary"
											className="capitalize"
											underline="hover"
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
		</main>
	);
}
