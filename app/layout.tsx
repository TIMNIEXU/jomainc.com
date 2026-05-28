import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Joma Logistics Incorporated | AI Freight & Customs Solutions",
  description:
    "Joma Logistics Incorporated provides freight forwarding, customs clearance support, Amazon delivery coordination, trucking, warehousing, and AI-assisted shipment document review.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
