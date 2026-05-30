import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"]
});

export const metadata: Metadata = {
  title: {
    default: "Cordova Property Management",
    template: "%s | Cordova Property Management"
  },
  description:
    "Expert property management in Dubai, from tenant screening and maintenance to leasing, inspections, and landlord support.",
  metadataBase: new URL("https://cordovaproperty.com"),
  openGraph: {
    title: "Cordova Property Management",
    description:
      "Expert property management in Dubai for landlords, tenants, and premium rental homes.",
    images: [
      "https://cordovaproperty.com/wp-content/uploads/2025/07/modern-cozy-living-room-wooden-wall-texture-background-interior-design-3d-rendering-scaled.jpg"
    ]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.variable}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
