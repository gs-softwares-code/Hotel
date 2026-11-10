import Link from "next/link";
import { BookingWidget } from "@/components/enterprise/booking-widget";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Star,
  UtensilsCrossed,
  Droplets,
  Wine,
  Compass,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Waves,
  HeartHandshake,
} from "lucide-react";

export const runtime = "edge";

export default function HomePage({ params }: { params: { locale?: string } }) {
  const locale = params.locale || "en";

  const featuredRooms = [
    {
      name: "Imperial Bamboo Pavilion Suite",
      size: "1,150 sq.ft / 107 m²",
      view: "Sacred Higashiyama Mountain & Bamboo Valley",
      bed: "Master King Bed",
      guests: "Up to 3 Guests",
      price: "$1,850",
      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1200",
      slug: "imperial-bamboo-pavilion",
      features: ["Private Natural Hot-Spring Onsen", "Dedicated Tea Master", "Terrace Loungers"],
    },
    {
      name: "Grand Garden Onsen Residence",
      size: "1,600 sq.ft / 148 m²",
      view: "Century-Old Japanese Zen Garden",
      bed: "Two King Beds",
      guests: "Up to 4 Guests",
      price: "$2,600",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200",
      slug: "grand-garden-onsen-residence",
      features: ["Open-Air Hinoki Wood Tub", "Private Tatami Dining Salon", "Rolls-Royce Chauffeur"],
    },
    {
      name: "The Presidential Sanctuary Villa",
      size: "2,800 sq.ft / 260 m²",
      view: "Panoramic Kyoto Skyline & Historic Pagodas",
      bed: "Two Master Suites",
      guests: "Up to 6 Guests",
      price: "$4,500",
      image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1200",
      slug: "presidential-sanctuary-villa",
      features: ["Infinity Thermal Plunge Pool", "24/7 Dedicated Butler", "Private Wine Cellar"],
    },
  ];

  const amenities = [
    {
      icon: Droplets,
      title: "Natural Thermal Onsens",
      description: "Mineral-rich volcanic spring waters routed directly to private in-suite cedar baths and shared forest pools.",
    },
    {
      icon: UtensilsCrossed,
      title: "Three-Star Michelin Dining",
      description: "Traditional Kyoto Kaiseki and contemporary French-Japanese fusion led by master chef Kenjiro Takahashi.",
    },
    {
      icon: Waves,
      title: "Heated Granite Pool & Hydro-Spa",
      description: "Indoor-outdoor hydrotherapy circuit set among peaceful Japanese stone gardens and weeping maples.",
    },
    {
      icon: HeartHandshake,
      title: "Discreet Butler Care",
      description: "Unobtrusive yet flawless hospitality tailored to your preferences from private arrival to departure.",
    },
  ];

  const testimonials = [
    {
      quote: "The quietude of the bamboo forest paired with private onsen waters makes Aura one of the world's most restorative retreats.",
      author: "Condé Nast Traveler Gold List 2026",
      guest: "Verified Stay — Suite 104",
    },
    {
      quote: "The kaiseki dining experience in our private pavilion was pure culinary poetry. Service is impeccable without feeling rigid.",
      author: "Michelin Guide Kyoto Inspection",
      guest: "Verified Stay — Garden Villa",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-stone-50 text-slate-900 font-sans">
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/30 z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-1000 ease-out"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2000')",
          }}
        />

        <div className="relative z-20 max-w-5xl mx-auto px-6 text-center space-y-6 pt-16">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-semibold tracking-widest uppercase">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Higashiyama, Kyoto • A Sanctuary of Rare Tranquility</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
            Where Ancient Serenity <br />
            <span className="italic font-light text-amber-200">Meets Modern Hospitality</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto font-light leading-relaxed">
            Secluded private pavilions, mineral-rich thermal springs, and Michelin-curated kaiseki nestled within the sacred hills of Kyoto.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href={`/${locale}/rooms`}>
              <Button
                size="lg"
                variant="secondary"
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold uppercase tracking-wider text-xs px-8 h-12 shadow-lg"
              >
                Explore Rooms & Suites
              </Button>
            </Link>
            <Link href={`/${locale}/about`}>
              <Button
                size="lg"
                variant="outline"
                className="border-slate-400 text-slate-100 hover:text-white hover:bg-white/10 text-xs uppercase tracking-wider h-12 px-8"
              >
                Discover The Story
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. FUNCTIONAL ROOM BOOKING WIDGET */}
      <BookingWidget locale={locale} />

      {/* 3. BRAND INTRODUCTION / STORY PREVIEW */}
      <section className="py-24 px-6 lg:px-12 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-amber-700">
              <span>The Aura Philosophy</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-950 leading-tight">
              An Architectural Sanctuary Consecrated to the Senses
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Constructed from sustainable Japanese cedar, hand-chiseled river stone, and washi paper screens, Aura Kyoto was designed by renowned architects to harmonize seamlessly with its protected national forest environment.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              Every detail—from the gentle acoustic murmur of bamboo gardens to the custom aroma of white cypress and green tea—has been meticulously orchestrated to deliver an uncompromising sense of calm.
            </p>
            <div className="pt-2">
              <Link
                href={`/${locale}/about`}
                className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-amber-800 hover:text-amber-900 border-b border-amber-800 pb-1"
              >
                <span>Read Full Architectural & Heritage Story</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="relative h-96 sm:h-[450px] w-full rounded-2xl overflow-hidden shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1200"
                alt="Aura Hotel Architecture in Kyoto"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-slate-950 text-white p-6 rounded-xl shadow-xl max-w-xs hidden sm:block border border-slate-800">
              <p className="font-serif text-2xl font-bold text-amber-300">100%</p>
              <p className="text-xs text-slate-400 mt-1">Geothermal spring water routed to every private pavilion suite.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED ROOMS & SUITES */}
      <section className="py-20 bg-stone-100 border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-700">
                Accommodation Collection
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-950 mt-1">
                Curated Rooms & Suites
              </h2>
            </div>
            <Link
              href={`/${locale}/rooms`}
              className="text-xs font-bold uppercase tracking-wider text-amber-800 hover:text-amber-900 underline underline-offset-4"
            >
              View All 18 Suites & Rates →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredRooms.map((r, i) => (
              <div
                key={i}
                className="group rounded-2xl bg-white border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-64 w-full overflow-hidden bg-slate-900">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={r.image}
                      alt={r.name}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur px-3 py-1 rounded-full text-[11px] text-amber-200 font-medium">
                      {r.size}
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="font-serif text-xl font-bold text-slate-950 group-hover:text-amber-700 transition-colors">
                        {r.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">{r.view}</p>
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-600">
                      {r.features.map((f, fi) => (
                        <div key={fi} className="flex items-center space-x-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-amber-600 flex-shrink-0" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-stone-100 flex items-center justify-between mt-4">
                  <div>
                    <span className="text-[10px] uppercase text-slate-400 font-bold block">From</span>
                    <span className="font-serif font-bold text-slate-950 text-xl">{r.price}</span>
                    <span className="text-[11px] text-slate-500"> / night</span>
                  </div>

                  <Link href={`/${locale}/rooms?select=${r.slug}`}>
                    <Button size="sm" variant="secondary" className="text-xs font-bold uppercase tracking-wider">
                      Book Suite
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SIGNATURE AMENITIES & FACILITIES */}
      <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-700">
            Wellness & Comfort
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-950">
            Thoughtfully Crafted Facilities
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Designed for guests seeking genuine rejuvenation, peaceful seclusion, and sensory balance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {amenities.map((a, i) => {
            const Icon = a.icon;
            return (
              <div
                key={i}
                className="p-8 rounded-2xl border border-stone-200 bg-white hover:border-amber-400 transition-all duration-300 shadow-sm space-y-4"
              >
                <div className="h-12 w-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-slate-950">{a.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{a.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. SIGNATURE DINING SHOWCASE */}
      <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              Gastronomic Excellence
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white leading-tight">
              Kura: Seasonal Kaiseki & Fine Wine Salon
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Awarded two Michelin stars, Restaurant Kura celebrates the micro-seasons of Kyoto prefecture with heirloom wild herbs, Matsusaka wagyu, and pristine seafood sourced daily from the Sea of Japan.
            </p>
            <div className="grid grid-cols-2 gap-4 text-xs pt-2">
              <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/60">
                <p className="text-slate-400">Dinner Service</p>
                <p className="font-bold text-amber-200 mt-1">18:00 — 22:30</p>
              </div>
              <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/60">
                <p className="text-slate-400">Omakase Cellar</p>
                <p className="font-bold text-amber-200 mt-1">800+ Rare Vintages</p>
              </div>
            </div>
            <div className="pt-2 flex items-center space-x-4">
              <Link href={`/${locale}/dining`}>
                <Button variant="secondary" className="text-xs font-bold uppercase tracking-wider">
                  Reserve a Table
                </Button>
              </Link>
              <Link href={`/${locale}/dining`} className="text-xs text-slate-300 hover:text-white underline">
                View Tasting Menus →
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="h-64 sm:h-80 rounded-2xl overflow-hidden shadow-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800"
                alt="Michelin Dining Kaiseki Dish"
                className="h-full w-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="h-64 sm:h-80 rounded-2xl overflow-hidden shadow-xl mt-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=800"
                alt="Wine Cellar and Sommelier Room"
                className="h-full w-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 7. VERIFIED TESTIMONIALS */}
      <section className="py-20 px-6 lg:px-12 max-w-5xl mx-auto space-y-10 text-center">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-700">
            Distinguished Praise
          </span>
          <h2 className="font-serif text-3xl font-bold text-slate-950">
            Guest Reflections
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="p-8 rounded-2xl border border-stone-200 bg-white shadow-sm space-y-4 flex flex-col justify-between"
            >
              <div className="flex text-amber-500 space-x-1">
                {[...Array(5)].map((_, s) => (
                  <Star key={s} className="h-4 w-4 fill-amber-500" />
                ))}
              </div>
              <p className="font-serif italic text-slate-800 text-sm leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="pt-4 border-t border-stone-100">
                <p className="font-bold text-xs text-slate-900">{t.author}</p>
                <p className="text-[11px] text-slate-400">{t.guest}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. INSTAGRAM / VISUAL ATMOSPHERE GALLERY */}
      <section className="py-16 bg-stone-100 border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-8">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-700">
                Visual Atmosphere
              </span>
              <h2 className="font-serif text-2xl font-bold text-slate-950">
                #AuraSanctuary Moments
              </h2>
            </div>
            <Link
              href={`/${locale}/gallery`}
              className="text-xs font-bold text-amber-800 hover:underline uppercase tracking-wider"
            >
              Open Gallery →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800",
              "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=800",
              "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800",
              "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=800",
            ].map((img, i) => (
              <div key={i} className="h-48 sm:h-64 rounded-xl overflow-hidden shadow-sm group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img}
                  alt="Hotel visual moment"
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
