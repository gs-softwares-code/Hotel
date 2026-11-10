import Link from "next/link";
import { type Property } from "@/db";
import { Star, MapPin, Compass } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function PropertyCard({ property, locale = "en" }: { property: Property; locale?: string }) {
  const brandNames: Record<string, string> = {
    "aura-reserve": "Aura Reserve",
    "aura-regency": "Aura Regency",
    "aura-horizon": "Aura Horizon",
  };

  return (
    <div className="group rounded-xl border border-slate-200/90 bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
      {/* Property Visual Banner */}
      <div className="relative h-64 w-full bg-slate-900 overflow-hidden">
        {property.featuredImageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={property.featuredImageUrl}
            alt={property.name}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-slate-900 via-slate-800 to-amber-950 flex items-center justify-center p-6 text-center">
            <span className="font-serif text-amber-200 text-lg tracking-widest uppercase">
              {property.name}
            </span>
          </div>
        )}

        <div className="absolute top-4 left-4">
          <Badge className="bg-slate-950/80 text-amber-300 backdrop-blur border border-amber-500/20 text-[10px] uppercase tracking-wider font-semibold">
            {brandNames[property.brandId] || property.brandId}
          </Badge>
        </div>

        <div className="absolute bottom-4 right-4 bg-slate-950/80 backdrop-blur px-2.5 py-1 rounded text-amber-400 font-bold text-xs flex items-center space-x-1">
          <Star className="h-3.5 w-3.5 fill-amber-400" />
          <span>{property.starRating || 5}.0</span>
        </div>
      </div>

      {/* Property Content */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center text-xs text-slate-500 space-x-1 mb-2">
            <MapPin className="h-3.5 w-3.5 text-amber-600" />
            <span className="capitalize">
              {property.city}, {property.country}
            </span>
          </div>
          <h3 className="font-serif text-xl font-bold text-slate-950 group-hover:text-amber-700 transition-colors">
            {property.name}
          </h3>
          <p className="text-xs text-slate-600 line-clamp-2 mt-2 leading-relaxed">
            {property.description}
          </p>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
          <div className="text-slate-500">
            From <span className="font-serif font-bold text-slate-950 text-sm">$950</span> / night
          </div>
          <Link
            href={`/${locale}/destinations/${property.region}/${property.country}`}
            className="text-amber-700 font-semibold hover:underline flex items-center space-x-1"
          >
            <span>Explore Sanctuary</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

