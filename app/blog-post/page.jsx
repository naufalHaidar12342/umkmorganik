import { Card, CardHeader, CardFooter, CardBody } from "@nextui-org/card";
import NextImage from "next/image";
import { Image } from "@nextui-org/image";
import NextLink from "next/link";
import { Link } from "@nextui-org/link";
import { FALLBACK_HYGRAPH_API } from "../constant/hygraph-api";
import { Divider } from "@nextui-org/divider";

export async function generateMetadata() {
	const [latestBlogpost] = await fetchLatestBlogpost();
	const openGraphBlogpostTitle = latestBlogpost.postTitle;
	const openGraphBlogpostImage =
		latestBlogpost.creditImageReference.imageFile.url;
	return {
		title: "Blogpost UMKM Organik",
		description:
			"Informasi, tips, update terkini seputar produk organik dan UMKM",
		url: "https://umkmorganik.org/blog-post",
		openGraph: {
			title: "Blogpost UMKM Organik",
			description:
				"Informasi, tips, update terkini seputar produk organik dan UMKM",
			url: "https://umkmorganik.org/blog-post",
			images: [
				{
					url: openGraphBlogpostImage,
					width: 1280,
					height: 600,
					alt: `Foto sampul untuk blogpost UMKM Organik dengan judul: ${openGraphBlogpostTitle}`,
				},
			],
		},
	};
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

export async function fetchAllBlogpost() {
	const allBlogpost = await fetch(`${FALLBACK_HYGRAPH_API}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			query: `query AllBlogpost {
				blogPosts(orderBy: createdAt_DESC) {
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
	return allBlogpost.data.blogPosts;
}

export default async function BlogPost() {
	const fetchedBlogpost = await fetchLatestBlogpost();
	const fetchedAllBlogpost = await fetchAllBlogpost();
	return (
		<div className="flex flex-col flex-wrap w-full max-w-6xl">
			{" "}
			{/* satu postingan terbaru */}
			<div className="flex flex-col">
				<div className="flex flex-col justify-start pb-5 font-semibold">
					<h3 className="text-2xl">Post Terbaru</h3>
				</div>
				{fetchedBlogpost.map((blogpostFetched, index) => (
					<div className="flex flex-col" key={index}>
						<Card className="h-56 xl:h-[350px] relative" isFooterBlurred>
							<Image
								as={NextImage}
								removeWrapper
								alt={`Cover image untuk post ${blogpostFetched.postTitle}`}
								className="z-0"
								src={blogpostFetched.creditImageReference.imageFile.url}
								style={{ objectFit: "cover" }}
								fill
								priority={true}
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
			{/* semua postingan */}
			<div className="flex flex-col">
				<Divider className="my-6" />
				<div className="flex flex-col justify-start pb-5 font-semibold">
					<h3 className="text-2xl">Semua Postingan</h3>
				</div>
				<div className="grid grid-cols-1 xl:grid-cols-3 col-span-2 gap-7 pb-5">
					{fetchedAllBlogpost.map((blogpostFetched, index) => (
						<div className="flex flex-col" key={index}>
							<Card className="h-56 xl:h-[350px] relative" isFooterBlurred>
								<Image
									as={NextImage}
									removeWrapper
									alt={`Cover image untuk post ${blogpostFetched.postTitle}`}
									className="z-0"
									src={blogpostFetched.creditImageReference.imageFile.url}
									style={{ objectFit: "cover" }}
									fill
									priority={true}
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
