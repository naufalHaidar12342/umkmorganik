import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Header from "./components/header";
import Footer from "./components/footer";
const inter = Inter({
	subsets: ["latin"],
	weights: ["400", "500", "600", "700"],
});

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={`${inter.className}`}>
				<Header />
				<Providers>
					<main className="min-h-full flex flex-col justify-center items-center p-7">
						{children}
					</main>
				</Providers>
				<Footer />
			</body>
		</html>
	);
}
