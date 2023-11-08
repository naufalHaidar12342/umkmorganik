"use client";
import {
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import { useMemo, useState } from "react";

export default function MarketplaceDropdown() {
	const [selectedMarketplace, setSelectedMarketplace] = useState(
		new Set(["Semua marketplace"])
	);
	const selectedValue = useMemo(
		() => Array.from(selectedMarketplace).join(",").replace("_", ""),
		[selectedMarketplace]
	);
	return (
		<Dropdown>
			<DropdownTrigger>
				<Button variant="bordered" className="capitalize">
					Marketplace : {selectedValue}
				</Button>
			</DropdownTrigger>
			<DropdownMenu
				aria-label="Marketplace selection"
				variant="flat"
				disallowEmptySelection
				selectionMode="single"
				selectedKeys={selectedValue}
				onSelectionChange={setSelectedMarketplace}
			>
				<DropdownItem key={"semua marketplace"}>Semua marketplace</DropdownItem>
				<DropdownItem key={"shopee"}>Shopee</DropdownItem>
				<DropdownItem key={"tokopedia"}>Tokopedia</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	);
}
