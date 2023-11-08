"use client";

import { NextUIProvider } from "@nextui-org/react";
import { CustomThemeProvider } from "./custom-themeprovider";

export function Providers({ children }) {
	return (
		<NextUIProvider>
			<CustomThemeProvider>{children}</CustomThemeProvider>
		</NextUIProvider>
	);
}
