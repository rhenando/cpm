import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { getSiteSettings } from "@/lib/cms";
import { DEFAULT_SOCIAL_IMAGE, organizationJsonLd, SITE_URL, websiteJsonLd } from "@/lib/seo";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"]
});

export const metadata: Metadata = {
  title: {
    default: "Property Management Dubai | Cordova",
    template: "%s | Cordova"
  },
  description:
    "Expert property management in Dubai, from tenant screening and maintenance to leasing, inspections, and landlord support.",
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png"
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Cordova Property Management",
    title: "Cordova Property Management",
    description:
      "Expert property management in Dubai for landlords, tenants, and premium rental homes.",
    images: [
      DEFAULT_SOCIAL_IMAGE
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Property Management Dubai | Cordova",
    description: "Expert property management in Dubai for landlords, tenants, and premium rental homes.",
    images: [DEFAULT_SOCIAL_IMAGE]
  },
  robots: { index: true, follow: true }
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();
  return (
    <html lang="en">
      <body className={montserrat.variable}>
        <JsonLd data={[organizationJsonLd(settings), websiteJsonLd()]} />
        <Header settings={settings} />
        <main>{children}</main>
        <Footer settings={settings} />
      </body>
    </html>
  );
}
