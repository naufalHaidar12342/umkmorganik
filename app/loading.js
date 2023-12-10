import { Card, CardFooter } from "@nextui-org/card";
import { Skeleton } from "@nextui-org/skeleton";
export default function LoadingHome() {
	return (
		<div id="homepage">
			<div className="max-w-6xl" id="content-width">
				{/* UKM Menik Jaya */}
				<div className="block pt-2 pb-9 ">
					<Skeleton className="flex justify-start xl:justify-end text-3xl font-bold pb-5" />
					<div className="grid w-full place-items-center min-h-[25rem] hover:shadow-md shadow-green-400 shadow-opacity-50 text-white rounded-2xl">
						<div className="flex lg:flex-row-reverse flex-col justify-center items-center w-full h-full gap-[1rem] bg-slate-950 shadow-xl shadow-green-700 rounded-2xl">
							<div className="w-full h-[250px] xl:h-[25rem] relative">
								<Skeleton className="rounded-2xl " />
							</div>

							{/* deskripsi singkat umkm minggu ini */}
							<div className="p-5">
								<Skeleton className="pb-3 text-2xl font-semibold" />
								<Skeleton />
								<Skeleton className="font-semibold pt-3 text-primary-600" />
							</div>
						</div>
					</div>
				</div>
				{/* produk minggu ini */}
				<div className="block pt-8 pb-8">
					<div className="flex flex-col xl:flex-row justify-center items-baseline xl:justify-start pb-5 font-semibold">
						<Skeleton className="text-2xl" />
						<Skeleton className="xl:pl-5 xl:pt-0 pt-3 text-lg text-primary-800" />
					</div>
					<div className="grid md:grid-cols-2 xl:grid-cols-3 col-span-3 gap-5">
						<div className="flex flex-col">
							<Card className="col-span-12 sm:col-span-4 shadow shadow-green-500">
								<div className="w-full h-60 lg:h-[400px] relative">
									<Skeleton className="w-full h-full" />
								</div>
								<CardFooter className="absolute bottom-0 h-[55%] xl:h-[37%] xl:right-0 z-10 justify-center flex flex-col xl:flex-row xl:justify-between p-4 bg-slate-950">
									<div className="flex flex-col">
										<Skeleton className="font-semibold" />
										<Skeleton className="font-semibold" />
									</div>
									<Skeleton className="w-full mt-4 xl:mt-0 xl:w-auto capitalize" />
								</CardFooter>
							</Card>
						</div>
						<div className="flex flex-col">
							<Card className="col-span-12 sm:col-span-4 shadow shadow-green-500">
								<div className="w-full h-60 lg:h-[400px] relative">
									<Skeleton className="w-full h-full" />
								</div>
								<CardFooter className="absolute bottom-0 h-[55%] xl:h-[37%] xl:right-0 z-10 justify-center flex flex-col xl:flex-row xl:justify-between p-4 bg-slate-950">
									<div className="flex flex-col">
										<Skeleton className="font-semibold" />
										<Skeleton className="font-semibold" />
									</div>
									<Skeleton className="w-full mt-4 xl:mt-0 xl:w-auto capitalize" />
								</CardFooter>
							</Card>
						</div>
						<div className="flex flex-col">
							<Card className="col-span-12 sm:col-span-4 shadow shadow-green-500">
								<div className="w-full h-60 lg:h-[400px] relative">
									<Skeleton className="w-full h-full" />
								</div>
								<CardFooter className="absolute bottom-0 h-[55%] xl:h-[37%] xl:right-0 z-10 justify-center flex flex-col xl:flex-row xl:justify-between p-4 bg-slate-950">
									<div className="flex flex-col">
										<Skeleton className="font-semibold" />
										<Skeleton className="font-semibold" />
									</div>
									<Skeleton className="w-full mt-4 xl:mt-0 xl:w-auto capitalize" />
								</CardFooter>
							</Card>
						</div>
					</div>
				</div>
				{/* info terbaru dalam bentuk blog post */}
				<div className="block pt-4 pb-8">
					<div className="flex flex-col xl:flex-row justify-center items-baseline xl:justify-end pb-5 font-semibold">
						<Skeleton className="text-2xl" />
						<Skeleton className="xl:pl-5 xl:pt-0 pt-3 text-lg text-primary-800" />
					</div>
					<div className="flex flex-col">
						<Card className="h-56 xl:h-[500px] relative shadow-md shadow-green-600">
							<Skeleton className="w-full h-full" />
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
