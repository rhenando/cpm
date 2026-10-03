import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Cordova Administration" },
  description: "Authorized Cordova team access.",
  robots: { index: false, follow: false, nocache: true }
};

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
