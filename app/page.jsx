import NextImage from "next/image";
import Foto1 from "@/public/images/fotoukm1.jpg";
import Foto2 from "@/public/images/fotoukm2.jpg";
import Foto3 from "@/public/images/fotoukm3.jpg";
import Foto4 from "@/public/images/nib-ukm-menik-jaya.jpg";
import { Card, CardHeader, CardFooter, CardBody } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { Link } from "@nextui-org/link";
import NextLink from "next/link";
import { FALLBACK_HYGRAPH_API } from "./constant/hygraph-api";

export async function generateMetadata() {
	const mainUkm = await getMainUkm();
	const [openGraphTitle] = mainUkm.map((item) => item.ukmName);
	const [openGraphDescription] = mainUkm.map((item) => item.ukmDescription);
	const [openGraphImage] = mainUkm.map(
		(item) => item.creditImageReference.imageFile.url
	);
	return {
		title: "UMKM Organik",
		description: "Menyediakan informasi seputar UMKM dengan produk organik.",
		url: "https://umkmorganik.org",
		openGraph: {
			title: "UMKM Organik",
			description: "Menyediakan informasi seputar UMKM dengan produk organik.",
			url: "https://umkmorganik.org",
			images: [
				{
					url: openGraphImage,
					width: 1280,
					height: 600,
					alt: openGraphTitle,
				},
			],
		},
	};
}

export async function getMainUkm() {
	const latestUkm = await fetch(`${FALLBACK_HYGRAPH_API}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		next: { revalidate: 100 },
		body: JSON.stringify({
			query: `query MainUkmProfile {
				ukmProfiles(where: {ukmSlug: "ukm-menik-jaya"}) {
					ukmName
					ukmSlug
					ukmDescription
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
	// console.log("isi data=", latestUkm.data.ukmProfiles);
	return latestUkm.data.ukmProfiles;
}

export async function fetchThreeLatestProduct() {
	const latestProduct = await fetch(FALLBACK_HYGRAPH_API, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		next: { revalidate: 100 },
		body: JSON.stringify({
			query: `query LatestThreeProducts {
				products(orderBy: createdAt_DESC, first: 3) {
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

export async function fetchLatestBlogpost() {
	const latestBlogpost = await fetch(`${FALLBACK_HYGRAPH_API}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			query: `query LatestBlogPost {
				blogPosts(orderBy: createdAt_DESC, first: 1) {
					postTitle
					postSlug
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
	return latestBlogpost.data.blogPosts;
}

export default async function Home() {
	const fetchedUkm = await getMainUkm();
	const fetchedProduct = await fetchThreeLatestProduct();
	const fetchedBlogpost = await fetchLatestBlogpost();
	// console.log("isi data di home=", fetchedUkm);
	return (
		<div id="homepage">
			{/* featured umkm (umkm minggu ini) */}
			<div className="max-w-6xl" id="content-width">
				<div className="block pt-8 pb-9">
					<h2 className="flex justify-start xl:justify-end text-3xl font-bold pb-5">
						Info UKM
					</h2>
					{fetchedUkm.map((ukmFetched, index) => (
						<div
							className="grid w-full place-items-center min-h-[25rem]"
							key={index}
						>
							<div className="flex lg:flex-row-reverse flex-col justify-center items-center w-full h-full gap-[1rem] bg-gradient-to-b lg:bg-gradient-to-l from-green-800 to-zinc-500 rounded-2xl">
								<div className="w-full min-h-[16rem] h-full relative">
									<NextImage
										className="rounded-2xl "
										src={ukmFetched.creditImageReference.imageFile.url}
										alt={`Logo dari `}
										priority={true}
										fill
										style={{ objectFit: "cover" }}
										// placeholder="blur"
										sizes="(max-width:1280) 100vw, 75vw"
									/>
								</div>

								{/* deskripsi singkat umkm minggu ini */}
								<div className="p-5">
									<p className="pb-3 text-2xl font-semibold">
										{ukmFetched.ukmName}
									</p>
									<p>{ukmFetched.ukmDescription}</p>
									<Link
										as={NextLink}
										href={`/daftar-ukm/${ukmFetched.ukmSlug}`}
										color="success"
										className="font-semibold pt-3"
										underline="hover"
										showAnchorIcon
									>
										Profil Lengkap UKM
									</Link>
								</div>
							</div>
						</div>
					))}
				</div>
				{/* produk minggu ini */}
				<div className="block pb-8">
					<div className="flex flex-col xl:flex-row justify-center items-baseline xl:justify-start pb-5 font-semibold">
						<h3 className="text-2xl"> Rekomendasi produk</h3>
						<Link
							color="success"
							as={NextLink}
							href="/katalog-produk"
							className="xl:pl-5 xl:pt-0 pt-3 text-lg text-primary-300"
						>
							Lihat semua
						</Link>
					</div>
					<div className="grid grid-cols-1 xl:grid-cols-3 col-span-3 gap-5">
						{fetchedProduct.map((productFetched, index) => (
							<div className="flex flex-col" key={index}>
								<Card
									className="col-span-12 sm:col-span-4 h-56 xl:h-[300px] relative"
									isFooterBlurred
								>
									<Image
										as={NextImage}
										removeWrapper
										alt={`Cover image untuk produk ${productFetched.productName}`}
										className="z-0"
										src={productFetched.creditImageReference.imageFile.url}
										style={{ objectFit: "cover" }}
										fill
										priority={true}
										sizes="(max-width:1366)100vw, 85vw"
									/>
									<CardFooter className="absolute bottom-0 xl:right-0 z-10 justify-center flex flex-col xl:flex-row xl:justify-between p-4">
										<div className="flex flex-col">
											<span className="">
												{productFetched.productOrigin.ukmName}
											</span>
											<span className="font-semibold">
												{productFetched.productName}
											</span>
										</div>
										<Button
											as={NextLink}
											radius="full"
											variant="ghost"
											color="primary"
											href={`/katalog-produk/${productFetched.productSlug}`}
											className="w-full mt-4 xl:mt-0 xl:w-auto capitalize"
											size="lg"
										>
											Info lengkap
										</Button>
									</CardFooter>
								</Card>
							</div>
						))}
					</div>
				</div>
				{/* info terbaru dalam bentuk blog post */}
				<div className="block pt-4 pb-8">
					<div className="flex flex-col xl:flex-row justify-center items-baseline xl:justify-end pb-5 font-semibold">
						<h3 className="text-2xl">Info Terbaru</h3>
						<Link
							as={NextLink}
							href="/blog-post"
							className="xl:pl-5 xl:pt-0 pt-3 text-lg text-primary-300"
						>
							Lihat semua
						</Link>
					</div>
					{fetchedBlogpost.map((blogpostFetched, index) => (
						<div className="flex flex-col" key={index}>
							<Card className="h-56 xl:h-[500px] relative" isFooterBlurred>
								<Image
									as={NextImage}
									removeWrapper
									alt={`Cover image untuk post ${blogpostFetched.postTitle}`}
									className="z-0"
									src={blogpostFetched.creditImageReference.imageFile.url}
									style={{ objectFit: "cover" }}
									fill
									priority={false}
									sizes="(max-width:1366)100vw, 85vw"
								/>
								<CardFooter className="absolute bottom-0 xl:right-0 z-10 flex items-end xl:items-end flex-col p-4">
									<div className="flex flex-col">
										<Link
											as={NextLink}
											href={`/blog-post/${blogpostFetched.postSlug}`}
											color="foreground"
											underline="hover"
											className="w-full mt-4 xl:mt-0 xl:w-auto capitalize"
											showAnchorIcon
										>
											{blogpostFetched.postTitle}
										</Link>
									</div>
								</CardFooter>
							</Card>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
