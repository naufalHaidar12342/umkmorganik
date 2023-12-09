"use client";
import {
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import { useMemo, useState } from "react";

export default function FilterProduk() {
	const [selectedProductCategory, setSelectedProductCategory] = useState(
		new Set(["Semua jenis produk"])
	);
	const selectedValue = useMemo(
		() => Array.from(selectedProductCategory).join(",").replace("_", ""),
		[selectedProductCategory]
	);
	return (
		<Dropdown>
			<DropdownTrigger>
				<Button variant="bordered" className="capitalize">
					Jenis produk : {selectedValue}
				</Button>
			</DropdownTrigger>
			<DropdownMenu
				aria-label="Marketplace selection"
				variant="flat"
				disallowEmptySelection
				selectionMode="single"
				selectedKeys={selectedValue}
				onSelectionChange={setSelectedProductCategory}
			>
				<DropdownItem key={"semua"}>Semua</DropdownItem>
				<DropdownItem key={"shopee"}>Shopee</DropdownItem>
				<DropdownItem key={"tokopedia"}>Tokopedia</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	);
}
