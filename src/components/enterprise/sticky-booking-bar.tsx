"use client";

import Link from "next/link";
import { Calendar, MessageSquare, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function StickyBookingBar({ locale = "en" }: { locale?: string }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur border-t border-slate-800 text-white py-3.5 px-4 sm:px-8 shadow-2xl transition-all">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center space-x-3 text-xs">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-serif text-amber-200 font-semibold tracking-wide hidden md:inline">
            Aura Sanctuary Best Rate Guarantee
          </span>
          <span className="text-slate-400 hidden lg:inline">• Complimentary daily artisanal breakfast & private onsen access</span>
        </div>

        <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
          <Link
            href="https://wa.me/81755501824?text=Hello%20Aura%20Concierge,%20I%20would%20like%20to%20inquire%20about%20a%20stay"
            target="_blank"
            className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-md bg-slate-900 border border-slate-700 text-xs text-slate-300 hover:text-white"
          >
            <MessageSquare className="h-3.5 w-3.5 text-emerald-400" />
            <span>Chat</span>
          </Link>

          <Link href={`/${locale}/rooms`} className="w-full sm:w-auto">
            <Button
              size="sm"
              variant="secondary"
              className="w-full sm:w-auto text-xs uppercase tracking-wider font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 px-6 h-9"
            >
              <Calendar className="h-3.5 w-3.5 mr-2" />
              Check Availability & Reserve
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

