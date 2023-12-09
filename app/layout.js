import "./globals.css";
import { Providers } from "./providers";
import Header from "./components/header";
import Footer from "./components/footer";
import { inter } from "./fonts";

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={`${inter.className}`}>
				<Header />
				<Providers>
					<main className="min-h-screen flex flex-col justify-center items-center p-7">
						{children}
					</main>
				</Providers>
				<Footer />
			</body>
		</html>
	);
}
