"use server";
import { Card, CardFooter } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Skeleton } from "@nextui-org/skeleton";
import { Image } from "@nextui-org/image";
import NextImage from "next/image";
import NextLink from "next/link";

export default async function LatestProductSkeleton() {
	return (
		<div>
			<div className="flex flex-col">
				<Card
					className="col-span-12 sm:col-span-4 h-56 xl:h-[300px] relative"
					isFooterBlurred
				>
					<Skeleton className="z-0" />
					<CardFooter className="absolute bottom-0 xl:right-0 z-10 justify-center flex flex-col xl:flex-row xl:justify-between p-4">
						<div className="flex flex-col">
							<Skeleton className=""></Skeleton>
							<Skeleton className="font-semibold"></Skeleton>
						</div>
						<Skeleton className="w-full mt-4 xl:mt-0 xl:w-auto capitalize"></Skeleton>
					</CardFooter>
				</Card>
			</div>
			<div className="flex flex-col">
				<Card
					className="col-span-12 sm:col-span-4 h-56 xl:h-[300px] relative"
					isFooterBlurred
				>
					<Skeleton className="z-0" />
					<CardFooter className="absolute bottom-0 xl:right-0 z-10 justify-center flex flex-col xl:flex-row xl:justify-between p-4">
						<div className="flex flex-col">
							<Skeleton className=""></Skeleton>
							<Skeleton className="font-semibold"></Skeleton>
						</div>
						<Skeleton className="w-full mt-4 xl:mt-0 xl:w-auto capitalize"></Skeleton>
					</CardFooter>
				</Card>
			</div>
			<div className="flex flex-col">
				<Card
					className="col-span-12 sm:col-span-4 h-56 xl:h-[300px] relative"
					isFooterBlurred
				>
					<Skeleton className="z-0" />
					<CardFooter className="absolute bottom-0 xl:right-0 z-10 justify-center flex flex-col xl:flex-row xl:justify-between p-4">
						<div className="flex flex-col">
							<Skeleton className=""></Skeleton>
							<Skeleton className="font-semibold"></Skeleton>
						</div>
						<Skeleton className="w-full mt-4 xl:mt-0 xl:w-auto capitalize"></Skeleton>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
}
