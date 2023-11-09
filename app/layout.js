import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Header from "./components/header";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={`${inter.className}`}>
				<Header />
				<Providers>
					<main className="min-h-full flex flex-col justify-center items-center p-6">
						{children}
					</main>
				</Providers>
			</body>
		</html>
	);
}
