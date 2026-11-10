import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Compass, Shield } from "lucide-react";
import Link from "next/link";

export const runtime = "edge";

const BRANDS_DATA: Record<string, {
  name: string;
  tagline: string;
  heroImage: string;
  ethos: string;
  signatureOfferings: string[];
}> = {
  "aura-reserve": {
    name: "Aura Reserve",
    tagline: "Ultra-Luxury Secluded Sanctuaries",
    heroImage: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1600",
    ethos: "Intimate properties restricted to under 40 pavilion suites, designed in sacred harmony with surrounding national parks and UNESCO heritage grounds.",
    signatureOfferings: ["Private onsens and thermal spring pools", "Dedicated master tea & culinary docents", "Helicopter transfers from regional capitals"],
  },
  "aura-regency": {
    name: "Aura Regency",
    tagline: "Grand Urban Heritage & Capital Landmarks",
    heroImage: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1600",
    ethos: "Historic palaces and architectural monuments in the world's premier cultural capitals, blending royal pedigree with ultra-modern biometric security.",
    signatureOfferings: ["Three-star Michelin culinary residences", "Historic salon ballrooms", "Rolls-Royce house car motorcades"],
  },
  "aura-horizon": {
    name: "Aura Horizon",
    tagline: "Pristine Coastal & Alpine Escapes",
    heroImage: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1600",
    ethos: "Architectural wonders carved into secluded cliff-faces and snow-dusted summits for rejuvenation and high-altitude clarity.",
    signatureOfferings: ["Ski-in / ski-out private chalets", "Overwater cantilevered coral villas", "Thermal holistic spa sanctuaries"],
  },
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const brand = BRANDS_DATA[params.slug];
  if (!brand) return { title: "Brand Not Found | Aura" };
  return {
    title: `${brand.name} | ${brand.tagline}`,
    description: brand.ethos,
  };
}

export default function BrandDetailPage({ params }: { params: { slug: string; locale?: string[] } }) {
  const brand = BRANDS_DATA[params.slug];
  if (!brand) notFound();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Brand Hero */}
      <section className="relative h-[65vh] flex items-center justify-center bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${brand.heroImage}')` }}
        />
        <div className="relative z-20 max-w-4xl mx-auto px-6 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-amber-300">
            <Sparkles className="h-4 w-4" />
            <span>Brand Pillar</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white">
            {brand.name}
          </h1>
          <p className="text-base sm:text-lg text-slate-200 font-light max-w-2xl mx-auto">
            {brand.tagline}
          </p>
        </div>
      </section>

      {/* Brand Ethos */}
      <section className="py-20 px-6 lg:px-12 max-w-5xl mx-auto space-y-12">
        <div className="space-y-4 text-center">
          <h2 className="text-xs uppercase tracking-widest text-amber-700 font-bold">The Distinction</h2>
          <p className="font-serif text-3xl font-bold text-slate-950">{brand.name} Ethos</p>
          <p className="text-sm text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {brand.ethos}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {brand.signatureOfferings.map((offering, idx) => (
            <Card key={idx} className="border-slate-200">
              <CardContent className="p-6 space-y-2">
                <span className="text-xs font-mono font-bold text-amber-600">0{idx + 1}</span>
                <p className="font-serif font-bold text-slate-900 text-sm">{offering}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
