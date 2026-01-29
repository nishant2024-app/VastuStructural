import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import VastuAIChat from "@/components/ai/VastuAIChat";
import Script from "next/script";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VastuStructural | Modern Architecture & Vastu Science",
  description: "Designing Modern Homes with Vastu Precision in India. Get 2D/3D house plans, Vastu consultancy, and elevation designs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased font-sans bg-background text-foreground`}
      >
        <Script src="https://js.puter.com/v2/" strategy="beforeInteractive" />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <VastuAIChat />
      </body>
    </html>
  );
}

