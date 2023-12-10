export default function LoadingSelectedUkm() {
	return (
		<div className="flex flex-col flex-wrap w-full max-w-6xl">
			<div className="flex flex-col flex-wrap items-start">
				<div className="w-full h-56 xl:h-[440px] items-center relative">
					<Skeleton className="rounded-2xl" />
				</div>
				{/* credit foto sampul untuk profil ukm */}
				<Skeleton className="italic pt-2" />

				{/* profil ukm */}
				<div className="flex flex-col items-start pt-3">
					<Skeleton className="text-2xl font-semibold" />
					<Skeleton className="py-2 text-lg text-primary-400" />
					<Skeleton className="text-lg" />
					<Skeleton className="text-lg" />
					<div className="flex flex-col xl:flex-row xl:gap-1 text-lg">
						<Skeleton className="p-4" />
						<Skeleton className="p-4" />
					</div>
					<div className="flex flex-col md:flex-row md:items-center gap-3 pt-4">
						<span className="text-lg p-2" />
						<Skeleton className="p-4" />
						<Skeleton className="p-4" />
					</div>
					<Skeleton className="pt-4 pb-2 text-lg text-primary-400" />
					<Skeleton className="text-lg xl:text-xl" />
				</div>
				<Divider className="my-3" />
				{/* produk-produk dari ukm */}
				<div className="flex flex-col">
					<Skeleton className="text-lg text-primary-400" />
					<div className="grid grid-cols-1 xl:grid-cols-4 col-span-1 gap-5 py-2">
						<div className="flex flex-col">
							<Card className="col-span-12 sm:col-span-4 w-60 h-56 xl:h-[360px] relative">
								<Skeleton className="z-0" />
								<CardFooter className="absolute bottom-0 xl:right-0 z-10 flex flex-col items-start p-4">
									<div className="flex flex-col">
										<Skeleton className="" />
										<Skeleton className="font-semibold" />
									</div>
									<Skeleton className="w-full mt-4 xl:mt-0 xl:w-auto capitalize" />
								</CardFooter>
							</Card>
						</div>
						<div className="flex flex-col">
							<Card className="col-span-12 sm:col-span-4 w-60 h-56 xl:h-[360px] relative">
								<Skeleton className="z-0" />
								<CardFooter className="absolute bottom-0 xl:right-0 z-10 flex flex-col items-start p-4">
									<div className="flex flex-col">
										<Skeleton className="" />
										<Skeleton className="font-semibold" />
									</div>
									<Skeleton className="w-full mt-4 xl:mt-0 xl:w-auto capitalize" />
								</CardFooter>
							</Card>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
