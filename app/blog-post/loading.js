import { Card, CardFooter } from "@nextui-org/card";
import { Skeleton } from "@nextui-org/skeleton";
export default function LoadingBlogpost() {
	return (
		<div className="flex flex-col flex-wrap w-full max-w-6xl animate-pulse">
			<div className="flex flex-col">
				<div className="flex flex-col justify-start font-semibold pb-5">
					<Skeleton className="h-7 leading-8" />
				</div>
				<div className="flex flex-col">
					<Card className="h-56 xl:h-[450px] relative shadow-xl shadow-emerald-500">
						<Skeleton className="z-0 w-full h-full object-cover rounded-2xl" />
						<CardFooter className="absolute bottom-0 xl:right-0 z-10 flex items-end xl:items-end flex-col p-4 bg-slate-950">
							<div className="flex flex-col">
								<Skeleton className="w-full mt-4 xl:mt-0 xl:w-auto capitalize h-12" />
							</div>
						</CardFooter>
					</Card>
				</div>
			</div>
			{/* list of blogpost */}
			<div className="flex flex-col mt-24">
				<div className="flex flex-col justify-start font-semibold pb-5">
					<Skeleton className="h-7" />
				</div>
				<div className="grid grid-cols-1 xl:grid-cols-3 gap-7 pb-5">
					<div className="flex flex-col">
						<Card className="h-56 xl:h-[300px] relative hover:scale-105 shadow-lg shadow-emerald-500">
							<Skeleton className="z-0 w-full h-full object-cover rounded-2xl" />
							<CardFooter className="absolute bottom-0 xl:right-0 z-10 flex items-end xl:items-end flex-col p-4 bg-slate-950">
								<div className="flex flex-col">
									<Skeleton className="w-full mt-4 xl:mt-0 xl:w-auto capitalize" />
								</div>
							</CardFooter>
						</Card>
					</div>
					<div className="flex flex-col">
						<Card className="h-56 xl:h-[300px] relative hover:scale-105 shadow-lg shadow-emerald-500">
							<Skeleton className="z-0 w-full h-full object-cover rounded-2xl" />
							<CardFooter className="absolute bottom-0 xl:right-0 z-10 flex items-end xl:items-end flex-col p-4 bg-slate-950">
								<div className="flex flex-col">
									<Skeleton className="w-full mt-4 xl:mt-0 xl:w-auto capitalize" />
								</div>
							</CardFooter>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}
