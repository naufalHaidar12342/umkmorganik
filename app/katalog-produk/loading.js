import { Skeleton } from "@nextui-org/skeleton";
import ProductSkeleton from "./product-skeleton";
export default function LoadingProductCatalogue() {
	return (
		<div className="h-full max-w-6xl animate-pulse">
			{/* in development: drop-down untuk jenis marketplace yang menjual produk (shopee, tokopedia, dsb) */}
			{/* daftar produk */}
			<div className="block">
				<div className="flex flex-col xl:flex-row items-start">
					<Skeleton className="text-2xl font-semibold" />
				</div>
				<div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 py-4">
					<ProductSkeleton />
					<ProductSkeleton />
					<ProductSkeleton />
					<ProductSkeleton />
					<ProductSkeleton />
					<ProductSkeleton />
					<ProductSkeleton />
					<ProductSkeleton />
				</div>
			</div>
		</div>
	);
}
