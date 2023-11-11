import { FALLBACK_HYGRAPH_API } from "@/app/constant/hygraph-api";
import { Link } from "@nextui-org/link";
import { Image } from "@nextui-org/image";
import NextImage from "next/image";
import ReactMarkdown from "react-markdown";

export async function fetchSelectedBlogpost(postSlug) {
	const selectedBlogpost = await fetch(`${FALLBACK_HYGRAPH_API}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			query: `query SelectedBlogPost {
				blogPosts(where:{postSlug: "${postSlug}"}) {
					postTitle
					postSlug
					creditImageReference {
						imageFile {
							url
						}
						imageCreditMarkdown
					}
					content{
						markdown
					}
				}
			}`,
		}),
	})
		.then((res) => res.json())
		.catch((err) => console.log(err));
	return selectedBlogpost.data.blogPosts;
}

export async function generateMetadata({ params }) {
	const fetchInfoForMetadata = await fetchSelectedBlogpost(params.postslug);
	const [openGraphTitle] = fetchInfoForMetadata.map((item) => item.postTitle);
	const [openGraphLink] = fetchInfoForMetadata.map((item) => item.postSlug);
	const [openGraphImage] = fetchInfoForMetadata.map(
		(item) => item.creditImageReference.imageFile.url
	);
	return {
		title: `${openGraphTitle}`,
		description: `Simak postingan berjudul ${openGraphTitle} di umkmorganik.org`,
		url: `https://umkmorganik.com/blog-post/${openGraphLink}`,
		openGraph: {
			title: `${openGraphTitle}`,
			description: `Simak postingan berjudul ${openGraphTitle} di umkmorganik.org`,
			url: `https://umkmorganik.com/blog-post/${openGraphLink}`,
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

export default async function ReadUmkmOrganikPost({ params }) {
	const [blogPost] = await fetchSelectedBlogpost(params.postslug);
	// console.log("isi blogPost kaya gimana=", blogPost);
	const customizedMarkdownComponents = {
		p: (paragraph) => {
			const { node } = paragraph;
			if (node.children[0].tagName === "img") {
				const image = node.children[0];
				const metaString = image.properties.alt;
				const imageAlt = metaString?.replace(/ *\{[^)]*\} */g, "");
				return (
					<div className="w-full h-60 xl:h-[300px] relative py-2">
						<Image
							as={NextImage}
							removeWrapper
							src={image.properties.src}
							alt={imageAlt}
							style={{ objectFit: "cover" }}
							className=""
							fill={true}
							sizes="(max-width: 1366px)100vw, 80vw"
							priority={false}
						/>
					</div>
				);
			}
			return <p className="text-xl 2xl:text-lg mb-4">{paragraph.children}</p>;
		},
		h3: (heading) => {
			return <h3 className="text-2xl font-semibold">{heading.children}</h3>;
		},
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
	};
	return (
		<div className="flex flex-col flex-wrap w-full max-w-6xl">
			<div className="flex flex-col flex-wrap items-center">
				<h3 className="pb-5 text-3xl font-semibold">{blogPost.postTitle}</h3>
				<div className="w-full h-56 xl:h-[370px] relative">
					<Image
						removeWrapper
						as={NextImage}
						src={blogPost.creditImageReference.imageFile.url}
						alt={`Cover image untuk postingan berjudul ${blogPost.postTitle}`}
						style={{ objectFit: "cover" }}
						fill
						priority={true}
						sizes="(max-width:1366)100vw, 85vw"
					/>
				</div>
				<ReactMarkdown
					className="italic pt-3"
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
					{blogPost.creditImageReference.imageCreditMarkdown}
				</ReactMarkdown>
				<ReactMarkdown
					className="py-4"
					components={customizedMarkdownComponents}
				>
					{blogPost.content.markdown}
				</ReactMarkdown>
			</div>
		</div>
	);
}
