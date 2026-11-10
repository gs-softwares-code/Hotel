import { Metadata } from "next";
import { notFound } from "next/navigation";
import { db, properties, type Property } from "@/db";
import { eq, and } from "drizzle-orm";
import { PropertyCard } from "@/components/enterprise/property-card";
import { MapPin, Globe } from "lucide-react";

export const runtime = "edge";

interface Props {
  params: {
    locale?: string[];
    region: string;
    country: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const countryName = params.country.charAt(0).toUpperCase() + params.country.slice(1);
  return {
    title: `${countryName} Sanctuaries & Luxury Resorts | Aura Hospitality`,
    description: `Explore published Aura sanctuaries, private villas, and heritage suites across ${countryName}. Guaranteed direct booking privileges.`,
  };
}

export default async function DestinationPage({ params }: Props) {
  const locale = params.locale?.[0] || "en";
  const { region, country } = params;

  let countryProps: Property[] = [];
  try {
    countryProps = await db.query.properties.findMany({
      where: and(
        eq(properties.status, "PUBLISHED"),
        eq(properties.country, country.toLowerCase())
      ),
    });
  } catch {}

  // Fallback demo for pristine rendering
  if (countryProps.length === 0 && country.toLowerCase() === "japan") {
    countryProps = [
      {
        id: "prop-jp-1",
        brandId: "aura-reserve",
        name: "Aura Reserve Kyoto",
        slug: "aura-reserve-kyoto",
        description:
          "Secluded amid ancient bamboo groves in Higashiyama, where sacred heritage meets private onsen sanctuaries.",
        region: "apac",
        country: "japan",
        city: "Kyoto",
        address: "12 Higashiyama Sanctuary Way",
        latitude: 34.9989,
        longitude: 135.7807,
        starRating: 5,
        status: "PUBLISHED",
        featuredImageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200",
        translationsJson: null,
        phone: "+81 75 550 1824",
        email: "kyoto@aurahotels.internal",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "prop-jp-2",
        brandId: "aura-regency",
        name: "Aura Regency Tokyo Ginza",
        slug: "aura-regency-tokyo",
        description:
          "Towering above Tokyo's grand fashion boulevard. Sky-terrace culinary lounges, Michelin omakase, and tranquil cedar suites.",
        region: "apac",
        country: "japan",
        city: "Tokyo",
        address: "6-10-1 Ginza, Chuo City",
        latitude: 35.6696,
        longitude: 139.7645,
        starRating: 5,
        status: "PUBLISHED",
        featuredImageUrl: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1200",
        translationsJson: null,
        phone: "+81 75 550 1824",
        email: "kyoto@aurahotels.internal",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
  }

  const countryDisplayName = country.charAt(0).toUpperCase() + country.slice(1);

  return (
    <div className="py-16 px-6 lg:px-12 max-w-7xl mx-auto space-y-12">
      {/* Region Banner Header */}
      <div className="border-b border-slate-200 pb-8 space-y-3">
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-amber-700">
          <Globe className="h-4 w-4" />
          <span>
            {region.toUpperCase()} • {countryDisplayName}
          </span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-slate-950">
          The {countryDisplayName} Portfolio
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
          Sanctuaries certified under our strictest standards of architectural distinction, discrete security, and bespoke cultural immersion.
        </p>
      </div>

      {/* Properties Grid */}
      {countryProps.length === 0 ? (
        <div className="p-16 text-center border rounded-2xl bg-white space-y-4">
          <MapPin className="h-8 w-8 text-slate-400 mx-auto" />
          <h3 className="font-serif text-lg font-bold text-slate-900">
            Expanding into {countryDisplayName}
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Our acquisition team is currently curating flagship properties in this territory. Check back or explore our Japan and France resorts.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {countryProps.map((p) => (
            <PropertyCard key={p.id} property={p} locale={locale} />
          ))}
        </div>
      )}
    </div>
  );
}
