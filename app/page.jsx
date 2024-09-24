import Image from "next/image";
import { Card, CardFooter } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import NextLink from "next/link";
import { FALLBACK_HYGRAPH_API } from "./constant/hygraph-api";
import { SOLIDCOLOR_BLURDATA } from "./constant/solidcolor-blurdata";

export async function generateMetadata() {
	const mainUkm = await getUkmMenikJayaInfo();
	const [openGraphTitle] = mainUkm.map((item) => item.ukmName);
	const [openGraphDescription] = mainUkm.map((item) => item.ukmDescription);
	// console.log("isi data=", openGraphDescription);
	const [openGraphImage] = mainUkm.map(
		(item) => item.creditImageReference.imageFile.url
	);
	return {
		title: "UMKM Organik",
		description: `Menyediakan informasi seputar UMKM dengan produk organik. Website ini juga menjadi situs resmi dari UKM Menik Jaya. ${openGraphDescription}`,
		url: "https://umkmorganik.org",
		openGraph: {
			title: "UMKM Organik",
			description: `Menyediakan informasi seputar UMKM dengan produk organik. Website ini juga menjadi situs resmi dari UKM Menik Jaya. ${openGraphDescription}`,
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

export async function getUkmMenikJayaInfo() {
	const latestUkm = await fetch(`${FALLBACK_HYGRAPH_API}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		next:{
			revalidate: 60
		},
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
		next:{
			revalidate:300
		},
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
	const [fetchedUkm] = await getUkmMenikJayaInfo();
	// console.log("isi data di home=", fetchedUkm);
	const ukmName = fetchedUkm.ukmName;
	const ukmDescription = fetchedUkm.ukmDescription;
	const ukmSlug = fetchedUkm.ukmSlug;
	const ukmCoverImage = fetchedUkm.creditImageReference.imageFile.url;

	const fetchedProduct = await fetchThreeLatestProduct();
	// latest article/news
	const [fetchedBlogpost] = await fetchLatestBlogpost();
	const blogpostTitle = fetchedBlogpost.postTitle;
	const blogpostSlug = fetchedBlogpost.postSlug;
	const blogpostCoverImage = fetchedBlogpost.creditImageReference.imageFile.url;
	return (
		<div id="homepage">
			<div className="flex flex-col max-w-6xl" id="content-width">
				{/* UKM Menik Jaya */}
				<div className="flex flex-col pt-2 pb-9 ">
					<h2 className="flex justify-start xl:justify-end text-3xl font-bold pb-5">
						Sekilas UKM Menik Jaya
					</h2>
					<div className="grid w-full place-items-center min-h-[400px] text-white rounded-2xl">
						<div className="flex lg:flex-row-reverse flex-col justify-center items-center w-full h-full gap-4 bg-slate-950 shadow-xl shadow-green-700 rounded-2xl">
							<div className="w-full h-[250px] xl:h-[400px] relative">
								<Image
									className="rounded-2xl "
									src={ukmCoverImage}
									alt={`Foto sampul dari ${ukmName}`}
									priority={true}
									fill
									style={{ objectFit: "cover" }}
									placeholder="blur"
									blurDataURL={`data:image/webp;base64,${SOLIDCOLOR_BLURDATA}`}
									sizes="(max-width:1366px) 100vw, 55vw"
									quality={70}
									loading="eager"
								/>
							</div>

							{/* deskripsi singkat umkm minggu ini */}
							<div className="p-5">
								<p className="pb-3 text-2xl font-semibold">{ukmName}</p>
								<p>{ukmDescription}</p>
								<Link
									as={NextLink}
									href={`/daftar-ukm/${ukmSlug}`}
									className="font-semibold pt-3 text-primary-600"
									underline="hover"
								>
									Profil Lengkap UKM
								</Link>
							</div>
						</div>
					</div>
				</div>
				{/* produk minggu ini */}
				<div className="flex flex-col pt-8 pb-8">
					<div className="flex flex-col xl:flex-row justify-center items-baseline xl:justify-start pb-5 font-semibold">
						<h3 className="text-2xl"> Rekomendasi produk</h3>
						<Link
							as={NextLink}
							href="/katalog-produk"
							className="xl:pl-5 xl:pt-0 pt-3 text-lg text-primary-800"
						>
							Lihat semua
						</Link>
					</div>
					<div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
						{fetchedProduct.map((productFetched, index) => (
							<div className="flex flex-col" key={index}>
								<Card className="col-span-12 sm:col-span-4 shadow shadow-green-500">
									<div className="w-full h-60 lg:h-[400px] relative">
										<Image
											alt={`Cover image untuk produk ${productFetched.productName}`}
											className="z-0"
											src={productFetched.creditImageReference.imageFile.url}
											style={{
												objectFit: "cover",
												height: "100%",
												width: "100%",
											}}
											fill
											priority={true}
											sizes="(max-width:1366px)100vw, 45vw"
											placeholder="blur"
											blurDataURL={`data:image/webp;base64,${SOLIDCOLOR_BLURDATA}`}
											quality={65}
										/>
									</div>
									<CardFooter className="absolute bottom-0 h-[55%] xl:h-[37%] xl:right-0 z-10 justify-center flex flex-col xl:flex-row xl:justify-between p-4 bg-slate-950">
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
											variant="bordered"
											href={`/katalog-produk/${productFetched.productSlug}`}
											className="w-full mt-4 xl:mt-0 xl:w-auto capitalize font-bold text-primary-700 hover:bg-primary-700 hover:text-slate-950"
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
				<div className="flex flex-col pt-4 pb-8">
					<div className="flex flex-col xl:flex-row justify-center items-baseline xl:justify-end pb-5 font-semibold">
						<h3 className="text-2xl">Info Terbaru</h3>
						<Link
							as={NextLink}
							href="/blog-post"
							className="xl:pl-5 xl:pt-0 pt-3 text-lg text-primary-800"
						>
							Lihat semua
						</Link>
					</div>
					<div className="flex flex-col">
						<Card
							className="h-56 xl:h-[300px] relative shadow-md shadow-green-600"
							isFooterBlurred
						>
							<Image
								alt={`Cover image untuk post ${blogpostTitle}`}
								className="z-0"
								src={blogpostCoverImage}
								style={{ objectFit: "cover" }}
								fill
								sizes="(max-width:1366px)100vw, 55vw"
								placeholder="blur"
								blurDataURL={`data:image/webp;base64,${SOLIDCOLOR_BLURDATA}`}
								quality={60}
								priority={false}
							/>
							<CardFooter className="absolute bottom-0 xl:right-0 z-10 flex items-end xl:items-end flex-col p-4 bg-slate-950">
								<div className="flex flex-col">
									<Link
										as={NextLink}
										href={`/blog-post/${blogpostSlug}`}
										underline="hover"
										className="w-full mt-4 xl:mt-0 xl:w-auto capitalize text-white"
										showAnchorIcon
									>
										{blogpostTitle}
									</Link>
								</div>
							</CardFooter>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}
