import { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import {
  Waves,
  Droplets,
  Dumbbell,
  Users2,
  Sparkles,
  MapPin,
  Calendar,
  Compass,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Facilities, Spa & Wellness Experiences | Aura Kyoto",
  description:
    "Explore our thermal hot-spring onsens, hydrotherapy pool, Technogym wellness studio, tea pavilion ceremonies, and banquet halls.",
};

export default function ExperiencesPage({ params }: { params: { locale?: string } }) {
  const locale = params.locale || "en";

  const facilities = [
    {
      title: "Volcanic Hot-Spring Onsens & Spa",
      category: "Wellness & Rejuvenation",
      description:
        "Mineral-laden volcanic springs drawn from deep bedrock aquifers. Features separate indoor cedar soaking pools, outdoor forest rock pools, steam chambers infused with local cypress oils, and traditional Japanese scrub rituals.",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200",
      hours: "06:00 – 23:00 Daily",
    },
    {
      title: "Indoor Heated Granite Pool",
      category: "Aquatics & Solarium",
      description:
        "A 25-meter black-granite pool heated year-round to 30°C. Floor-to-ceiling glass screens slide open in summer to merge the water with quiet bamboo garden terraces.",
      image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=1200",
      hours: "07:00 – 21:00 Daily",
    },
    {
      title: "Technogym Wellness & Yoga Studio",
      category: "Fitness & Vitality",
      description:
        "State-of-the-art cardiovascular and strength conditioning equipment from Technogym Artisan Line, alongside daily morning breathwork and Zen yoga classes overlooking the valley.",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200",
      hours: "24 Hours for In-House Guests",
    },
    {
      title: "The Higashiyama Pavilion & Event Hall",
      category: "Conferences & Private Banquets",
      description:
        "An acoustically treated timber hall capable of hosting state banquets, executive retreats, or intimate wedding vows for up to 120 guests with full audiovisual and multi-lingual translation infrastructure.",
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1200",
      hours: "By Private Reservation",
    },
  ];

  const localExperiences = [
    {
      title: "Private Kiyomizu-dera Dawn Pilgrimage",
      time: "06:00 – 08:00",
      desc: "Exclusive dawn walking tour of the historic wooden temple complex before public opening hours with a resident historian monk.",
    },
    {
      title: "Uji Ancient Organic Tea Harvest",
      time: "Half-Day Excursion",
      desc: "Private chauffeured trip to 300-year-old family-run tea fields in Uji for ceremonial harvesting and private matcha grinding.",
    },
    {
      title: "Arashiyama Bamboo Forest Evening Meditation",
      time: "17:00 – 19:30",
      desc: "Private lantern-guided meditation within tranquil Arashiyama bamboo paths with shakuhachi flute performance.",
    },
  ];

  return (
    <div className="py-16 px-6 lg:px-12 max-w-7xl mx-auto space-y-16">
      <div className="border-b border-stone-200 pb-8 space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-700">
          Holistic Rejuvenation
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-slate-950">
          Facilities & Experiences
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl leading-relaxed font-light">
          Immerse yourself in centuries of therapeutic wellness, heated architectural pools, and curated cultural excursions across Kyoto.
        </p>
      </div>

      {/* Facilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {facilities.map((f, i) => (
          <div
            key={i}
            className="rounded-3xl border border-stone-200 bg-white overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div>
              <div className="h-64 w-full bg-slate-900 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={f.image}
                  alt={f.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-8 space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">
                  {f.category}
                </span>
                <h3 className="font-serif text-2xl font-bold text-slate-950">{f.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-light">{f.description}</p>
              </div>
            </div>
            <div className="p-8 pt-0 border-t border-stone-100 flex items-center justify-between text-xs text-slate-500 mt-4">
              <span>Hours: {f.hours}</span>
              <span className="font-semibold text-slate-900">Complimentary to In-House Guests</span>
            </div>
          </div>
        ))}
      </div>

      {/* Local Cultural Experiences */}
      <div className="rounded-3xl border border-stone-200 bg-stone-100 p-8 sm:p-12 space-y-8">
        <div className="max-w-xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-700">
            Curated Excursions
          </span>
          <h2 className="font-serif text-3xl font-bold text-slate-950">
            Bespoke Kyoto Discoveries
          </h2>
          <p className="text-xs text-slate-600 font-light">
            Our Head Concierge orchestrates private access to national monuments and protected cultural treasures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {localExperiences.map((e, ei) => (
            <div key={ei} className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-3">
              <span className="text-xs font-mono font-bold text-amber-700">{e.time}</span>
              <h4 className="font-serif text-base font-bold text-slate-950">{e.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-light">{e.desc}</p>
            </div>
          ))}
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            To arrange a private itinerary, speak directly with your dedicated in-suite butler upon arrival.
          </p>
          <Link href={`/${locale}/contact`}>
            <Button variant="secondary" className="text-xs font-bold uppercase tracking-wider">
              Inquire with Concierge Desk
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

