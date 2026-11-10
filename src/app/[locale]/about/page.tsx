import { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Shield, Compass, Award, Heart, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "About Our Hotel & Story | Aura Grand Luxury Sanctuary",
  description:
    "Learn about Aura Kyoto's architectural philosophy, heritage onsen springs, and uncompromising Japanese hospitality standards.",
};

export default function AboutPage({ params }: { params: { locale?: string } }) {
  const locale = params.locale || "en";

  return (
    <div className="py-16 px-6 lg:px-12 max-w-6xl mx-auto space-y-16">
      {/* 1. Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-700">
          Heritage & Architecture
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-slate-950">
          The Story of Aura Sanctuary
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-light">
          Born from a profound respect for Kyoto&apos;s ancient crafts guilds and centuries-old hot-spring traditions, Aura was conceived as a living sanctuary of contemplation and sensory restoration.
        </p>
      </div>

      {/* 2. Hero Image Banner */}
      <div className="h-96 sm:h-[480px] w-full rounded-2xl overflow-hidden shadow-2xl relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1600"
          alt="Aura Sanctuary Architecture"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-8">
          <p className="font-serif text-white text-xl sm:text-2xl font-bold max-w-xl">
            &ldquo;We did not build upon the forest; we allowed the forest to dictate the architecture.&rdquo;
          </p>
        </div>
      </div>

      {/* 3. Three Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-4">
          <div className="h-12 w-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
            <Sparkles className="h-6 w-6" />
          </div>
          <h3 className="font-serif text-xl font-bold text-slate-950">Omotenashi Hospitality</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Anticipating every guest need with discretion and subtlety. Care without pretense, attention without intrusion.
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-4">
          <div className="h-12 w-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
            <Compass className="h-6 w-6" />
          </div>
          <h3 className="font-serif text-xl font-bold text-slate-950">Sacred Thermal Waters</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Naturally heated 800 meters underground in the Higashiyama hills, our waters are rich in silica, magnesium, and soothing minerals.
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-4">
          <div className="h-12 w-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
            <Award className="h-6 w-6" />
          </div>
          <h3 className="font-serif text-xl font-bold text-slate-950">Artisan Guild Collaboration</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Every joinery beam was finished by Kyoto master carpenters using ancient joinery techniques requiring zero iron nails.
          </p>
        </div>
      </div>

      {/* 4. Standards & Details */}
      <div className="p-8 sm:p-12 rounded-3xl bg-slate-950 text-white space-y-6">
        <div className="max-w-2xl space-y-3">
          <h2 className="font-serif text-3xl font-bold text-white">Hospitality Standards Guaranteed</h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Our commitment to guest comfort, discrete safety, and sensory peace is uncompromising:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300">
          <div className="flex items-start space-x-3">
            <CheckCircle2 className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
            <span>24/7 dedicated in-suite butler service for all pavilion suites.</span>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircle2 className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
            <span>Private luxury electric chauffeured transfers across Kyoto Station and Kansai Airport.</span>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircle2 className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
            <span>Strict soundproof acoustic design ensuring complete serenity in all guest accommodations.</span>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircle2 className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
            <span>Single-use plastic zero commitment across all hotel operations since inception.</span>
          </div>
        </div>

        <div className="pt-4">
          <Link href={`/${locale}/rooms`}>
            <Button variant="secondary" className="text-xs font-bold uppercase tracking-wider">
              Reserve Your Sanctuary Experience
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

