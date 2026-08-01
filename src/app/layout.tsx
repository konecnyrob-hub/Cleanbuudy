import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import Analytics from "@/components/Analytics";

// Finální doména e-shopu (OG / canonical). Lze přepsat env proměnnou NEXT_PUBLIC_SITE_URL.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cleanner.cz";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Cleaner — mini stolní vysavač do dlaně",
    template: "%s · Cleaner",
  },
  description:
    "Cleaner je tichý mini stolní vysavač s dobíjením přes USB. Za pár vteřin odstraní drobky, prach i nečistoty z klávesnice a stolu. Doprava po ČR zdarma, vrácení do 14 dnů.",
  keywords: [
    "stolní vysavač",
    "mini vysavač",
    "vysavač na klávesnici",
    "vysavač na drobky",
    "USB vysavač",
    "Cleaner",
  ],
  applicationName: "Cleaner",
  authors: [{ name: "Cleaner" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    url: siteUrl,
    siteName: "Cleaner",
    title: "Cleaner — mini stolní vysavač do dlaně",
    description:
      "Tichý mini stolní vysavač s USB dobíjením. Uklidí klávesnici i stůl za pár vteřin. Doprava zdarma, vrácení do 14 dnů.",
    images: [
      {
        url: "/images/hero.webp",
        width: 800,
        height: 800,
        alt: "Mini stolní vysavač Cleaner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cleaner — mini stolní vysavač do dlaně",
    description:
      "Tichý mini stolní vysavač s USB dobíjením. Uklidí klávesnici i stůl za pár vteřin.",
    images: ["/images/hero.webp"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="cs">
      <body className="grain antialiased">
        <Nav />
        {children}
        <Footer />
        <CookieBanner />
        <Analytics />
      </body>
    </html>
  );
}
