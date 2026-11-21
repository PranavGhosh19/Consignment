import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { Poppins, PT_Sans } from "next/font/google";
import { AppProviders } from "@/components/app-providers";
import { SITE_CONFIG } from "@/lib/seo-config";
import { generateOrganizationSchema, generateWebSiteSchema } from "@/lib/seo-schema";

const fontPoppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
});

const fontPtSans = PT_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-pt-sans",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: "ShipCargo | India's Trade Ecosystem & Freight Bidding Platform",
    template: "%s | ShipCargo",
  },
  description:
    "Direct sourcing from India, verified sample approvals, live container freight bidding, and a tamper-evident Document Room. Built for exporters, overseas importers, and carriers.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: "ShipCargo | India's Trade Ecosystem & Live Freight Bidding",
    description:
      "Direct commodity sourcing from India, certified sample approvals, and competitive ocean container bidding.",
    images: [
      {
        url: "/captain-cargo.png",
        width: 1200,
        height: 630,
        alt: "ShipCargo - Captain Cargo Trade Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@shipcargo_in",
    title: "ShipCargo | India's Trade Ecosystem",
    description: "Verified sample approvals, live freight bidding, and Document Room security.",
    images: ["/captain-cargo.png"],
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/favicon.ico",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgSchema = generateOrganizationSchema();
  const websiteSchema = generateWebSiteSchema();

  return (
    <html lang="en" suppressHydrationWarning className={`${fontPoppins.variable} ${fontPtSans.variable}`}>
      <head>
        {/* Core Structured Data (Organization & WebSite) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="font-sans antialiased bg-[#13285A] text-[#ECE6DC]">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppProviders>{children}</AppProviders>
          <Toaster />
        </ThemeProvider>
        <Script
          id="razorpay-checkout-js"
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
