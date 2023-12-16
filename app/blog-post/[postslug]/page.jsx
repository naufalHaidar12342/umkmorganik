import { FALLBACK_HYGRAPH_API } from "@/app/constant/hygraph-api";
import { Link } from "@nextui-org/link";
import { Image } from "@nextui-org/image";
import NextImage from "next/image";
import ReactMarkdown from "react-markdown";
import { Chip } from "@nextui-org/chip";
import ISOTimeToHumanReadable from "@/app/utilities/iso_date_to_human_format";
import { IoMdSync } from "react-icons/io";
import { TfiWrite } from "react-icons/tfi";
import { SOLIDCOLOR_BLURDATA } from "@/app/constant/solidcolor-blurdata";
import CustomBreadcrumbs from "@/app/components/breadcrumbs";

export async function fetchSelectedBlogpost(postSlug) {
	const selectedBlogpost = await fetch(`${FALLBACK_HYGRAPH_API}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			query: `query SelectedBlogPost {
				blogPosts(where:{postSlug: "${postSlug}"}, stage: PUBLISHED) {
					postTitle
					postSlug
					createdAt
					updatedAt
					publishedAt
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
	const blogPostWrittenDate = blogPost.createdAt;
	const blogPostPublishedDate = blogPost.publishedAt;
	const blogPostUpdatedDate = blogPost.updatedAt;
	const customizedMarkdownComponents = {
		p: (paragraph) => {
			const { node } = paragraph;
			if (node.children[0].tagName === "img") {
				const image = node.children[0];
				const metaString = image.properties.alt;
				const imageAlt = metaString?.replace(/ *\{[^)]*\} */g, "");
				return (
					<div className="w-full h-60 xl:h-[600px] relative py-2">
						<NextImage
							src={image.properties.src}
							alt={imageAlt}
							style={{ objectFit: "cover" }}
							className="rounded-2xl"
							fill={true}
							sizes="(max-width: 1366px)100vw, 70vw"
							priority={false}
							placeholder="blur"
							blurDataURL={`data:image/png;base64,${SOLIDCOLOR_BLURDATA}`}
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
					className="text-lg"
					href={link.href}
					referrerPolicy="no-referrer"
					target="_blank"
					showAnchorIcon
				>
					{link.children}
				</Link>
			);
		},
		ol: (list) => {
			return <ol className="list-decimal list-inside">{list.children}</ol>;
		},
	};
	const breadCrumbsBlogPost = [
		{ pageName: "Halaman Utama", pageUrl: "/" },
		{ pageName: "Blog", pageUrl: "/blog-post" },
		{
			pageName: `${blogPost.postTitle}`,
			pageUrl: `/blog-post/${blogPost.postSlug}`,
		},
	];

	return (
		<div className="flex flex-col w-full max-w-6xl">
			<CustomBreadcrumbs breadcrumbsPath={breadCrumbsBlogPost} />
			<h3 className="pb-5 text-3xl font-semibold text-center">
				{blogPost.postTitle}
			</h3>
			<div className="w-full h-56 xl:h-[400px] relative">
				{/* warna yang dipakai untuk blurDataUrl= rgb(49, 49, 57) atau #313139. base64 di-generate oleh https://png-pixel.com/ */}
				<NextImage
					className="rounded-2xl"
					src={blogPost.creditImageReference.imageFile.url}
					alt={`Cover image untuk postingan berjudul ${blogPost.postTitle}`}
					style={{ objectFit: "cover" }}
					fill
					priority={true}
					sizes="(max-width:1366px)100vw, 70vw"
					blurDataURL={`data:image/png;base64,${SOLIDCOLOR_BLURDATA}`}
				/>
			</div>
			<ReactMarkdown
				className="text-center italic pt-3"
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
				{blogPost.creditImageReference.imageCreditMarkdown}
			</ReactMarkdown>
			<div className="flex flex-col h-full w-full gap-3 flex-wrap pt-3">
				<Link className="text-lg text-primary-600">
					<IoMdSync className="w-8 h-8 md:w-6 md:h-6 mr-4" />
					Diperbarui: {ISOTimeToHumanReadable(blogPostUpdatedDate)}
				</Link>
				<Link className="text-lg text-primary-600 ">
					<TfiWrite className="w-8 h-8 md:w-6 md:h-6 mr-4" />
					Ditulis: {ISOTimeToHumanReadable(blogPostWrittenDate)}
				</Link>
			</div>
			<ReactMarkdown className="py-4" components={customizedMarkdownComponents}>
				{blogPost.content.markdown}
			</ReactMarkdown>
		</div>
	);
}
