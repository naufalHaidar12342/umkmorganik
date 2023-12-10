import { Card, CardFooter } from "@nextui-org/card";
export default function ProductSkeleton() {
	return (
		<div className="flex flex-col">
			<Card className="col-span-12 sm:col-span-4 w-60 h-96 xl:h-[360px] relative shadow shadow-green-400 hover:scale-110 hover:shadow-md hover:shadow-green-400">
				<Skeleton className="z-0 rounded-2xl" />
				<CardFooter className="absolute bottom-0 h-1/2 xl:h-[48%] xl:right-0 z-10 flex flex-col items-start py-10 px-6 bg-slate-950">
					<div className="flex flex-col">
						<Skeleton />
						<Skeleton className="font-semibold" />
					</div>
					<Skeleton className="w-full mt-4 xl:mt-0 xl:w-auto capitalize text-primary-600" />
				</CardFooter>
			</Card>
		</div>
	);
}
