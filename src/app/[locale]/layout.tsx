import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "../globals.css";
import { EnterpriseHeader, EnterpriseFooter } from "@/components/enterprise/navigation";
import { StickyBookingBar } from "@/components/enterprise/sticky-booking-bar";
import { generateOrganizationJsonLd } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Aura Grand Luxury Hotel & Sanctuary | Kyoto, Japan",
  description:
    "Discover a peerless luxury hotel and private onsen hot-spring retreat. Michelin gastronomy, cedar pavilion suites, and serene mountain vistas.",
  keywords: [
    "Luxury Hotel Kyoto",
    "Aura Grand Sanctuary",
    "Private Onsen Hotel",
    "Michelin Dining Kyoto",
    "Kyoto Luxury Suites",
  ],
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale?: string };
}) {
  const locale = params.locale || "en";
  const orgJsonLd = generateOrganizationJsonLd();

  return (
    <html lang={locale} className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-slate-50 font-sans antialiased text-slate-900 flex flex-col pb-16">
        <EnterpriseHeader locale={locale} />
        <main className="flex-1">{children}</main>
        <EnterpriseFooter locale={locale} />
        <StickyBookingBar locale={locale} />
      </body>
    </html>
  );
}
