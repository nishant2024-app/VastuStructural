import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "@/components/layout/ConditionalLayout";
import Script from "next/script";
import { LanguageProvider } from "@/context/LanguageContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "VastuStructural | Vastu Structural Engineering Mangrulpir | P M and Associates",
    template: "%s | VastuStructural",
  },
  description: "P M and Associates - AI-powered Vastu structural engineering in Mangrulpir, Maharashtra. Get 2D/3D house plans, Vastu consultancy, and elevation designs with 48-hour delivery. Trusted by 500+ families.",
  keywords: [
    "Vastu Structural Engineering Mangrulpir",
    "Vastu consultant Maharashtra",
    "2D floor plan India",
    "3D elevation design",
    "structural engineer Washim",
    "Vastu compliant house plans",
    "AI Vastu analysis",
    "construction cost calculator",
    "P M and Associates",
    "VastuStructural",
  ],
  authors: [{ name: "P M and Associates" }],
  creator: "P M and Associates",
  publisher: "VastuStructural",
  metadataBase: new URL("https://vastustructural.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://vastustructural.com",
    siteName: "VastuStructural",
    title: "VastuStructural | AI-Powered Vastu Structural Engineering",
    description: "Design your dream home with Vastu precision. 48-hour delivery guaranteed. Trusted by 500+ families across Maharashtra.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "VastuStructural - AI-Powered Vastu Engineering",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VastuStructural | Vastu Structural Engineering",
    description: "AI-powered Vastu analysis and structural plans with 48-hour delivery.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/icons/icon-192x192.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#38bdf8",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// Structured Data (JSON-LD)
const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "P M and Associates - VastuStructural",
  description: "AI-powered Vastu structural engineering services in Mangrulpir, Maharashtra",
  url: "https://vastustructural.com",
  telephone: "+919067969756",
  email: "contact@vastustructural.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Mangrulpir",
    addressRegion: "Maharashtra",
    postalCode: "444403",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "20.2585",
    longitude: "77.3437",
  },
  priceRange: "₹2,999 - ₹24,999",
  openingHours: "Mo-Sa 09:00-18:00",
  sameAs: [],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Architectural Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Basic Plan",
          description: "2D Floor Plan + Basic Vastu Analysis",
        },
        price: "2999",
        priceCurrency: "INR",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Standard Plan",
          description: "3D Elevation + Full Structural Design",
        },
        price: "9999",
        priceCurrency: "INR",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Premium Plan",
          description: "Complete Civil + Electrical + Plumbing + Site Visit",
        },
        price: "24999",
        priceCurrency: "INR",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="VastuStructural" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased font-sans bg-background text-foreground`}
      >
        <Script src="https://js.puter.com/v2/" strategy="beforeInteractive" />
        <Script
          id="register-sw"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js')
                    .then((registration) => {
                      console.log('SW registered:', registration.scope);
                    })
                    .catch((error) => {
                      console.log('SW registration failed:', error);
                    });
                });
              }
            `,
          }}
        />
        <LanguageProvider>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        </LanguageProvider>
      </body>
    </html>
  );
}
