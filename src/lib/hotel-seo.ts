import { Property, RoomType } from "@/db";

export function generateHotelStructuredData(
  property: Partial<Property>,
  rooms: Partial<RoomType>[] = [],
  appUrl: string = "https://aura.internal"
) {
  return {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "@id": `${appUrl}#hotel`,
    name: property.name || "Aura Grand Sanctuary Kyoto",
    description: property.description || "A luxury secluded hot-spring sanctuary in Higashiyama, Kyoto.",
    url: appUrl,
    image: property.featuredImageUrl || "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200",
    telephone: property.phone || "+81 75 550 1824",
    email: property.email || "stay@aurahotels.internal",
    starRating: {
      "@type": "Rating",
      ratingValue: property.starRating || 5,
      bestRating: 5,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: property.address || "12 Higashiyama Sanctuary Way",
      addressLocality: property.city || "Kyoto",
      postalCode: "605-0862",
      addressCountry: "JP",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: property.latitude || 34.9989,
      longitude: property.longitude || 135.7807,
    },
    priceRange: "$$$$",
    currenciesAccepted: "USD, JPY, EUR",
    paymentAccepted: "Credit Card, Direct In-Suite Payment, Wire Transfer",
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Natural Geothermal Onsen Hot Springs", value: true },
      { "@type": "LocationFeatureSpecification", name: "Two Michelin Star Dining (Restaurant Kura)", value: true },
      { "@type": "LocationFeatureSpecification", name: "Indoor Heated 25m Granite Pool", value: true },
      { "@type": "LocationFeatureSpecification", name: "24/7 Dedicated Butler Service", value: true },
      { "@type": "LocationFeatureSpecification", name: "Helipad Arrival Access", value: true },
      { "@type": "LocationFeatureSpecification", name: "High-Speed Encrypted Wi-Fi", value: true },
    ],
    checkinTime: "15:00",
    checkoutTime: "12:00",
    containsPlace: rooms.map((r) => ({
      "@type": "HotelRoom",
      name: r.name,
      description: r.description,
      occupancy: {
        "@type": "QuantitativeValue",
        value: r.capacity || 2,
        unitCode: "C62",
      },
      bed: {
        "@type": "BedDetails",
        numberOfBeds: 1,
        typeOfBed: r.bedType || "King Size Imperial Bed",
      },
    })),
  };
}

export function generateRestaurantStructuredData(appUrl: string = "https://aura.internal") {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${appUrl}/dining#restaurant`,
    name: "Restaurant Kura",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200",
    telephone: "+81 75 550 1824",
    url: `${appUrl}/dining`,
    servesCuisine: "Japanese Kaiseki",
    priceRange: "$$$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "12 Higashiyama Sanctuary Way",
      addressLocality: "Kyoto",
      addressCountry: "JP",
    },
    award: "Two Michelin Stars (Michelin Guide Kyoto 2026)",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "12:00",
        closes: "14:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "18:00",
        closes: "22:30",
      },
    ],
  };
}

