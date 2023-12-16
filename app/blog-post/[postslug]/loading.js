import { Skeleton } from "@nextui-org/skeleton";

export default function LoadingSelectedBlogpost() {
	return (
		<div className="animate-pulse">
			{/* breadcrumbs skeleton */}
			<div className="flex flex-col w-full">
				<Skeleton className="h-[18px] leading-7" />
				<Skeleton className="flex flex-col md:flex-row items-start p-3">
					<Skeleton className="h-14 md:h-7" />
					<Skeleton className="h-14 md:h-7" />
				</Skeleton>
			</div>
			{/* title of blogpost */}
			<Skeleton className="h-32 md:h-14" />
			{/* cover image */}
			<div className="w-full h-56 xl-h-[400px] relative">
				<Skeleton className="w-full h-full object-cover rounded-2xl" />
			</div>
			{/* cover image credit */}
			<div className="pt-3">
				<Skeleton className="h-6" />
			</div>
			{/* write and update date */}
			<div className="flex flex-col h-full w-full gap-3 flex-wrap pt-3">
				<div className="h-5 leading-7">
					<Skeleton className="h-8 md:h-6" />
					<Skeleton className="h-8 md:h-6" />
				</div>
			</div>
			{/* content */}
			<div className="flex flex-col py-4 w-full">
				<Skeleton className="h-11" />
				<Skeleton className="h-11" />
				<Skeleton className="h-11" />
			</div>
		</div>
	);
}
