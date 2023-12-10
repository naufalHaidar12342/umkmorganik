import { Card } from "@nextui-org/card";
import { Skeleton } from "@nextui-org/skeleton";

export default function LoadingAllUkm() {
	return (
		<div className="flex flex-col flex-wrap w-full max-w-6xl">
			<Skeleton className="text-2xl font-bold text-center xl:text-start" />
			<div className="grid grid-cols-1 col-span-2 gap-8 py-5">
				<Card className="flex flex-col xl:flex-row bg-background/60 dark:bg-default-100/50 shadow-lg shadow-success-100">
					<div className="w-full xl:w-1/2 h-48 xl:h-64 relative">
						<Skeleton className="h-full w-full" />
					</div>
					<div className="w-full flex flex-col justify-center items-start p-6">
						<Skeleton className="pb-2 text-xl font-semibold" />
						<Skeleton />
						<Skeleton className="w-full xl:w-auto mt-4 font-medium" />
					</div>
				</Card>
				<Card className="flex flex-col xl:flex-row bg-background/60 dark:bg-default-100/50 shadow-lg shadow-success-100">
					<div className="w-full xl:w-1/2 h-48 xl:h-64 relative">
						<Skeleton className="h-full w-full" />
					</div>
					<div className="w-full flex flex-col justify-center items-start p-6">
						<Skeleton className="pb-2 text-xl font-semibold" />
						<Skeleton />
						<Skeleton className="w-full xl:w-auto mt-4 font-medium" />
					</div>
				</Card>
			</div>
		</div>
	);
}
