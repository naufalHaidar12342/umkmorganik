import { Skeleton } from "@nextui-org/skeleton";

export default function LoadingSelectedProduct() {
	return (
		<div className="flex flex-col flex-wrap w-full max-w-6xl">
			<div className="flex flex-col items-center animate-pulse">
				<div className="w-full h-56 xl:h-[600px] relative">
					<Skeleton />
				</div>
				<Skeleton />
				<div className="w-full grid grid-cols-1 xl:grid-cols-3 items-start gap-5 pt-3">
					<div className="flex flex-col xl:col-span-1">
						<Skeleton className="text-xl font-semibold" />
						<Skeleton className="mt-3 text-lg font-medium" />
					</div>
					<div className="flex flex-col col-span-2">
						<Skeleton className="text-lg text-primary-400 font-semibold" />
						<Skeleton className="text-lg" />
						{/* kategori produk */}
						<div className="flex flex-wrap gap-2 pt-1">
							<Skeleton />
							<Skeleton />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
