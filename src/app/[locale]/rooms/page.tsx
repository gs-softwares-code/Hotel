import { Metadata } from "next";
import { RoomsListAndBooking, RoomItem } from "@/components/enterprise/rooms-list-and-booking";
import { generateHotelStructuredData } from "@/lib/hotel-seo";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Accommodations, Rooms & Pavilion Suites | Aura Kyoto",
  description:
    "Explore our collection of 18 handcrafted pavilion suites, featuring private cedar onsen thermal tubs, serene bamboo views, and dedicated butler service.",
};

export default function RoomsPage({
  searchParams,
  params,
}: {
  searchParams: { select?: string };
  params: { locale?: string };
}) {
  const locale = params.locale || "en";

  const rooms: RoomItem[] = [
    {
      id: "rm_bamboo_pavilion",
      name: "Imperial Bamboo Pavilion Suite",
      slug: "imperial-bamboo-pavilion",
      description:
        "Perched amid towering stalks of green bamboo, this pavilion blends fragrant hinoki cedar baths with authentic tatami living chambers and sweeping valley vistas.",
      basePrice: 1850,
      capacity: 3,
      sizeSqFt: 1150,
      bedType: "Emperor King Custom Bed",
      imageUrl: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1200",
      amenities: [
        "Private In-Suite Cedar Onsen",
        "Dedicated Tea Master Ceremony",
        "Balcony Meditation Loungers",
        "Custom White Cypress Toiletries",
        "Biometric Room Key Access",
        "Complimentary Minibar & Rare Sakes",
      ],
    },
    {
      name: "Grand Garden Onsen Residence",
      id: "rm_garden_residence",
      slug: "grand-garden-onsen-residence",
      description:
        "Direct access to an enclosed century-old stone garden with weeping maples. Features an expansive open-air natural stone hot-spring bath and separate dining salon.",
      basePrice: 2600,
      capacity: 4,
      sizeSqFt: 1600,
      bedType: "Two Master King Beds",
      imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200",
      amenities: [
        "Open-Air Volcanic Hot Spring",
        "Private Zen Garden Enclosure",
        "In-Suite Kaiseki Dining Table",
        "Rolls-Royce Chauffeur Service",
        "Dyson Supersonic Care Suite",
        "Heated Granite Floors",
      ],
    },
    {
      name: "The Presidential Sanctuary Villa",
      id: "rm_presidential_villa",
      slug: "presidential-sanctuary-villa",
      description:
        "The apex of contemporary Japanese hospitality. A multi-level private compound offering a private thermal infinity plunge pool, two master pavilions, and 360-degree mountain panoramas.",
      basePrice: 4500,
      capacity: 6,
      sizeSqFt: 2800,
      bedType: "Two Master Suites + Library",
      imageUrl: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1200",
      amenities: [
        "Private Infinity Thermal Pool",
        "24/7 Dedicated Butler & Chef",
        "Private Wine & Whiskey Cellar",
        "Helipad Arrival Transfer",
        "Private Spa Treatment Room",
        "Bang & Olufsen Acoustic System",
      ],
    },
  ];

  const hotelStructuredData = generateHotelStructuredData(
    { name: "Aura Grand Sanctuary Kyoto", city: "Kyoto", country: "Japan" },
    rooms.map((r) => ({ name: r.name, description: r.description, capacity: r.capacity, bedType: r.bedType }))
  );

  return (
    <div className="py-16 px-6 lg:px-12 max-w-7xl mx-auto space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelStructuredData) }}
      />
      <div className="border-b border-stone-200 pb-8 space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-700">
          Aura Accommodations
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-slate-950">
          Pavilion Suites & Villas
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl leading-relaxed font-light">
          Each residence is an isolated architectural sanctuary featuring natural thermal onsen waters, sustainable timber joinery, and discrete personalized care.
        </p>
      </div>

      <RoomsListAndBooking
        rooms={rooms}
        initialSelectedSlug={searchParams.select}
        locale={locale}
      />
    </div>
  );
}

