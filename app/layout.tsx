import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DermaCompare",
  description: "Scientific skincare and haircare recommendation platform"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={manrope.className}>
        <NavBar />
        <main className="mx-auto min-h-screen max-w-7xl px-4 pb-20 pt-6 sm:px-6 lg:px-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
