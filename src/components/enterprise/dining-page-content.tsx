"use client";

import { useState } from "react";
import { createDiningReservationAction } from "@/app/actions/booking-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  UtensilsCrossed,
  Clock,
  Wine,
  Calendar,
  Users,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export function DiningPageContent() {
  const [selectedVenue, setSelectedVenue] = useState<string>("venue_kura");
  const [confirmed, setConfirmed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const venues = [
    {
      id: "venue_kura",
      name: "Restaurant Kura",
      stars: "Two Michelin Stars",
      cuisine: "Seasonal Kyoto Kaiseki & Micro-Climate Tasting",
      hours: "Lunch: 12:00 – 14:30 | Dinner: 18:00 – 22:30",
      dressCode: "Smart Elegant (Kimono / Jacket Preferred)",
      description:
        "Led by Master Chef Kenjiro Takahashi, Kura presents a 12-course narrative of Kyoto's micro-seasons. Prepared across an 8-seat Japanese cypress counter facing moonlit bamboo gardens.",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200",
      menuHighlights: [
        "Wild Sea Bream with Pickled Mountain Herbs",
        "A5 Matsusaka Wagyu smoked over Binchotan Charcoal",
        "Heirloom Tamba Black Soy & White Miso Soufflé",
      ],
    },
    {
      id: "venue_lounge",
      name: "The Higashiyama Cellar & Tea Salon",
      stars: "Grand Award of Excellence",
      cuisine: "Rare Single-Cask Japanese Whiskeys, Biodynamic Wines & Artisanal Gyokuro",
      hours: "14:00 – 01:00 Daily",
      dressCode: "Resort Casual",
      description:
        "An intimate candlelit library bar housing over 800 vintages, alongside rare Karuizawa and Yamazaki distillery reserves. Afternoon tea ceremonies conducted daily by 15th-generation Urasenke tea masters.",
      image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1200",
      menuHighlights: [
        "1984 Vintage Karuizawa Single Malt by the dram",
        "Hand-Harvested Uji Matcha with Seasonal Wagashi",
        "Kyoto Craft Gin Botanicals Infused with Hinoki Wood",
      ],
    },
  ];

  async function handleReservationSubmit(formData: FormData) {
    setSubmitting(true);
    formData.set("venueId", selectedVenue);
    const res = await createDiningReservationAction(formData);
    setSubmitting(false);

    if (res.success) {
      setConfirmed(true);
    } else {
      alert(res.error || "Failed to reserve table");
    }
  }

  return (
    <div className="py-16 px-6 lg:px-12 max-w-7xl mx-auto space-y-16">
      <div className="border-b border-stone-200 pb-8 space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-700">
          Gastronomy & Rare Cellars
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-slate-950">
          Culinary Masterpieces
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl leading-relaxed font-light">
          Experience world-class culinary artistry, rare vintages, and traditional tea ceremonies in secluded garden settings.
        </p>
      </div>

      {/* Venues Showcase */}
      <div className="space-y-12">
        {venues.map((v) => (
          <div
            key={v.id}
            className="rounded-3xl border border-stone-200 bg-white overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-0"
          >
            <div className="lg:col-span-6 relative h-80 lg:h-auto bg-slate-900">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={v.image}
                alt={v.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <Badge className="bg-slate-950 text-amber-300 border-amber-400/30 text-[10px] uppercase font-bold tracking-wider">
                  {v.stars}
                </Badge>
              </div>
            </div>

            <div className="lg:col-span-6 p-8 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-serif text-3xl font-bold text-slate-950">{v.name}</h3>
                  <p className="text-xs font-medium text-amber-700 mt-1">{v.cuisine}</p>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                  {v.description}
                </p>

                <div className="space-y-2 text-xs text-slate-500 border-y border-stone-100 py-3">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-amber-700" />
                    <span>{v.hours}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <UtensilsCrossed className="h-4 w-4 text-amber-700" />
                    <span>Dress Code: {v.dressCode}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Signature Highlights
                  </span>
                  {v.menuHighlights.map((m, mi) => (
                    <div key={mi} className="flex items-center space-x-2 text-xs text-slate-700">
                      <Sparkles className="h-3 w-3 text-amber-600 flex-shrink-0" />
                      <span>{m}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                onClick={() => {
                  setSelectedVenue(v.id);
                  document.getElementById("reservation-form")?.scrollIntoView({ behavior: "smooth" });
                }}
                variant="secondary"
                className="w-full sm:w-auto text-xs font-bold uppercase tracking-wider"
              >
                Reserve Table at {v.name} →
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Table Reservation Section */}
      <div id="reservation-form" className="rounded-3xl border border-stone-200 bg-stone-100 p-8 sm:p-12 space-y-8">
        <div className="max-w-xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-700">
            Table Reservations
          </span>
          <h2 className="font-serif text-3xl font-bold text-slate-950">
            Request an Evening Table
          </h2>
          <p className="text-xs text-slate-600 font-light">
            Due to the intimate counter seating, advance booking is strictly recommended.
          </p>
        </div>

        {confirmed ? (
          <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-center space-y-3">
            <CheckCircle2 className="h-10 w-10 text-emerald-600 mx-auto" />
            <h3 className="font-serif text-xl font-bold">Table Request Confirmed</h3>
            <p className="text-xs text-emerald-700 max-w-md mx-auto">
              Our maitre d&apos; has reserved your table and will reconfirm seating arrangements with your party 24 hours prior.
            </p>
            <Button
              onClick={() => setConfirmed(false)}
              variant="outline"
              size="sm"
              className="text-xs mt-2"
            >
              Make Another Reservation
            </Button>
          </div>
        ) : (
          <form action={handleReservationSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="space-y-1 text-xs">
                <label className="font-semibold text-slate-700">Venue</label>
                <select
                  value={selectedVenue}
                  onChange={(e) => setSelectedVenue(e.target.value)}
                  className="flex h-9 w-full rounded-md border border-slate-200 bg-white px-3 py-1 text-xs"
                >
                  <option value="venue_kura">Restaurant Kura (Kaiseki)</option>
                  <option value="venue_lounge">Higashiyama Tea & Cellar</option>
                </select>
              </div>

              <div className="space-y-1 text-xs">
                <label className="font-semibold text-slate-700">Date</label>
                <Input type="date" name="reservationDate" defaultValue="2026-12-16" required />
              </div>

              <div className="space-y-1 text-xs">
                <label className="font-semibold text-slate-700">Time</label>
                <select
                  name="reservationTime"
                  defaultValue="19:00"
                  className="flex h-9 w-full rounded-md border border-slate-200 bg-white px-3 py-1 text-xs"
                >
                  <option value="18:00">18:00 (Early Seating)</option>
                  <option value="19:00">19:00</option>
                  <option value="20:00">20:00</option>
                  <option value="20:30">20:30 (Late Seating)</option>
                </select>
              </div>

              <div className="space-y-1 text-xs">
                <label className="font-semibold text-slate-700">Party Size</label>
                <select
                  name="partySize"
                  defaultValue={2}
                  className="flex h-9 w-full rounded-md border border-slate-200 bg-white px-3 py-1 text-xs"
                >
                  <option value={1}>1 Guest</option>
                  <option value={2}>2 Guests</option>
                  <option value={3}>3 Guests</option>
                  <option value={4}>4 Guests</option>
                  <option value={6}>6 Guests (Private Room)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1 text-xs">
                <label className="font-semibold text-slate-700">Guest Name</label>
                <Input name="guestName" placeholder="Lady Eleanor Vance" required />
              </div>
              <div className="space-y-1 text-xs">
                <label className="font-semibold text-slate-700">Email Address</label>
                <Input name="guestEmail" type="email" placeholder="eleanor@vance.co.uk" required />
              </div>
              <div className="space-y-1 text-xs">
                <label className="font-semibold text-slate-700">Contact Telephone</label>
                <Input name="guestPhone" placeholder="+81 75 550 1824" required />
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <label className="font-semibold text-slate-700">Allergies or Special Occasion Notes</label>
              <textarea
                name="specialRequests"
                rows={2}
                placeholder="Vegetarian kaiseki preferences, birthday anniversary, wine pairing notes..."
                className="w-full rounded-md border border-slate-200 p-2 text-xs bg-white"
              />
            </div>

            <Button
              type="submit"
              disabled={submitting}
              variant="secondary"
              className="text-xs font-bold uppercase tracking-wider px-8 h-11"
            >
              {submitting ? "Confirming Table..." : "Submit Dining Reservation"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}

