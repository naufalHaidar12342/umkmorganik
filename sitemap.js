export default function sitemap() {
	return [
		{
			url: "https://umkmorganik.org",
			lastModified: new Date(),
			changefreq: "always",
			priority: 1.0,
		},
		{
			url: "https://umkmorganik.org/katalog-produk",
			lastModified: new Date(),
			changefreq: "daily",
			priority: 0.9,
		},
		{
			url: "https://umkmorganik.org/daftar-ukm",
			lastModified: new Date(),
			changefreq: "daily",
			priority: 0.9,
		},
		{
			url: "https://umkmorganik.org/blog-post",
			lastModified: new Date(),
			changefreq: "weekly",
			priority: 0.9,
		},
		,
	];
}
