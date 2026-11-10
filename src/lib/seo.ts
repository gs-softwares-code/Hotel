import { Property } from "@/db";

export function generatePropertyJsonLd(property: Property, appUrl: string = "https://aura.internal") {
  return {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: property.name,
    description: property.description,
    url: `${appUrl}/destinations/${property.region}/${property.country}`,
    image: property.featuredImageUrl || undefined,
    starRating: {
      "@type": "Rating",
      ratingValue: property.starRating || 5,
      bestRating: 5,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: property.address,
      addressLocality: property.city,
      addressCountry: property.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: property.latitude,
      longitude: property.longitude,
    },
    priceRange: "$$$$",
  };
}

export function generateOrganizationJsonLd(appUrl: string = "https://aura.internal") {
  return {
    "@context": "https://schema.org",
    "@type": "Corporation",
    name: "Aura Global Hospitality Conglomerate Inc.",
    alternateName: "Aura Hotels & Resorts",
    url: appUrl,
    logo: `${appUrl}/crest.png`,
    tickerSymbol: "NYSE:AURA",
    sameAs: [
      "https://www.sec.gov/edgar/browse/?CIK=0001948201",
    ],
  };
}

