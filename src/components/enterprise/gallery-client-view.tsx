"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { X, ZoomIn } from "lucide-react";

interface GalleryImage {
  id: string;
  url: string;
  title: string;
  category: "all" | "suites" | "wellness" | "dining" | "architecture";
  aspect: string;
}

export function GalleryClientView() {
  const [filter, setFilter] = useState<string>("all");
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null);

  const images: GalleryImage[] = [
    {
      id: "g1",
      url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200",
      title: "Open-Air Natural Onsen Springs",
      category: "wellness",
      aspect: "col-span-1 md:col-span-2 h-80",
    },
    {
      id: "g2",
      url: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1200",
      title: "Pavilion Architecture in Bamboo Forest",
      category: "architecture",
      aspect: "col-span-1 h-80",
    },
    {
      id: "g3",
      url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1200",
      title: "Imperial Suite Cedar Bedroom",
      category: "suites",
      aspect: "col-span-1 h-80",
    },
    {
      id: "g4",
      url: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200",
      title: "Seasonal Kyoto Kaiseki Presentation",
      category: "dining",
      aspect: "col-span-1 h-80",
    },
    {
      id: "g5",
      url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200",
      title: "Grand Garden Residence Living Salon",
      category: "suites",
      aspect: "col-span-1 md:col-span-2 h-80",
    },
    {
      id: "g6",
      url: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1200",
      title: "The Higashiyama Cellar Reserve",
      category: "dining",
      aspect: "col-span-1 h-80",
    },
    {
      id: "g7",
      url: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=1200",
      title: "Indoor Heated Granite Aquatics",
      category: "wellness",
      aspect: "col-span-1 md:col-span-2 h-80",
    },
    {
      id: "g8",
      url: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1200",
      title: "Presidential Villa Balcony at Sunset",
      category: "suites",
      aspect: "col-span-1 h-80",
    },
  ];

  const filtered = filter === "all" ? images : images.filter((img) => img.category === filter);

  return (
    <div className="py-16 px-6 lg:px-12 max-w-7xl mx-auto space-y-12">
      {/* Lightbox Modal */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 text-slate-300 hover:text-white p-2 rounded-full bg-slate-900 border border-slate-700"
          >
            <X className="h-6 w-6" />
          </button>
          <div
            className="max-w-5xl max-h-[85vh] overflow-hidden rounded-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={lightbox.url}
              alt={lightbox.title}
              className="w-full max-h-[75vh] object-contain rounded-xl"
            />
            <div className="text-center text-white space-y-1">
              <h3 className="font-serif text-xl font-bold">{lightbox.title}</h3>
              <p className="text-xs text-amber-300 uppercase tracking-wider">{lightbox.category}</p>
            </div>
          </div>
        </div>
      )}

      <div className="border-b border-stone-200 pb-8 space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-700">
          Photographic Immersion
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-slate-950">
          Visual Gallery
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl leading-relaxed font-light">
          A visual journey through our suites, natural onsen hot springs, architectural timber lines, and culinary creations.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2 text-xs">
        {[
          { key: "all", label: "All Photographs" },
          { key: "suites", label: "Pavilions & Suites" },
          { key: "wellness", label: "Onsen Springs & Spa" },
          { key: "dining", label: "Michelin Gastronomy" },
          { key: "architecture", label: "Architecture & Gardens" },
        ].map((c) => (
          <button
            key={c.key}
            onClick={() => setFilter(c.key)}
            className={`px-4 py-2 rounded-full font-semibold uppercase tracking-wider text-[11px] transition-all ${
              filter === c.key
                ? "bg-slate-950 text-white shadow-md"
                : "bg-white text-slate-600 hover:bg-stone-200 border border-stone-200"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((img) => (
          <div
            key={img.id}
            onClick={() => setLightbox(img)}
            className="relative h-72 sm:h-80 rounded-2xl overflow-hidden shadow-sm cursor-pointer group bg-slate-900"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.url}
              alt={img.title}
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
              <div className="text-white space-y-1">
                <p className="font-serif text-lg font-bold">{img.title}</p>
                <div className="flex items-center space-x-1 text-xs text-amber-300">
                  <ZoomIn className="h-3.5 w-3.5" />
                  <span>Click to view full image</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

