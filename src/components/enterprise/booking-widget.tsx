"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Users, MapPin, Search } from "lucide-react";

export function BookingWidget({ locale = "en" }: { locale?: string }) {
  const [destination, setDestination] = useState("kyoto");
  const [dates, setDates] = useState("2026-12-15 to 2026-12-22");
  const [guests, setGuests] = useState("2 Guests, 1 Suite");

  return (
    <div className="w-full max-w-5xl mx-auto -mt-12 relative z-20 px-4">
      <div className="rounded-2xl border border-slate-200/80 bg-white shadow-2xl p-4 sm:p-6 backdrop-blur">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          {/* Destination */}
          <div className="flex items-center space-x-3 p-3 rounded-xl border border-slate-200 hover:border-amber-400 transition-colors">
            <MapPin className="h-5 w-5 text-amber-600 flex-shrink-0" />
            <div className="flex-1">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Destination
              </label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full text-xs font-semibold text-slate-900 bg-transparent border-none p-0 focus:outline-none focus:ring-0"
              >
                <option value="kyoto">Kyoto, Japan (Aura Reserve)</option>
                <option value="paris">Paris, France (Aura Regency)</option>
                <option value="aspen">Aspen, USA (Aura Horizon)</option>
                <option value="maldives">Noonu Atoll (Aura Sanctuary)</option>
              </select>
            </div>
          </div>

          {/* Dates */}
          <div className="flex items-center space-x-3 p-3 rounded-xl border border-slate-200 hover:border-amber-400 transition-colors">
            <Calendar className="h-5 w-5 text-amber-600 flex-shrink-0" />
            <div className="flex-1">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Dates
              </label>
              <Input
                value={dates}
                onChange={(e) => setDates(e.target.value)}
                className="border-none p-0 h-auto text-xs font-semibold text-slate-900 focus-visible:ring-0"
              />
            </div>
          </div>

          {/* Guests */}
          <div className="flex items-center space-x-3 p-3 rounded-xl border border-slate-200 hover:border-amber-400 transition-colors">
            <Users className="h-5 w-5 text-amber-600 flex-shrink-0" />
            <div className="flex-1">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Occupancy
              </label>
              <Input
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="border-none p-0 h-auto text-xs font-semibold text-slate-900 focus-visible:ring-0"
              />
            </div>
          </div>

          {/* Search Button */}
          <Button
            size="lg"
            variant="secondary"
            className="w-full h-full min-h-[52px] bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold uppercase tracking-wider text-xs shadow-md"
            onClick={() => {
              window.location.href = `/${locale}/destinations/apac/japan`;
            }}
          >
            <Search className="h-4 w-4 mr-2" />
            Check Availability
          </Button>
        </div>
      </div>
    </div>
  );
}

