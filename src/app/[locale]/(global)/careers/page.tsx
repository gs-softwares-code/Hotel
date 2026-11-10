import { Metadata } from "next";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Briefcase, Compass, Users2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Executive Careers & Hospitality Artistry | Aura Conglomerate",
  description:
    "Join the world's most distinguished global hospitality team. Leadership, culinary, sommelier, and guest experience roles worldwide.",
};

export default function CareersPage() {
  const roles = [
    { title: "Managing Director / General Manager", location: "Kyoto, Japan", department: "Executive Leadership" },
    { title: "Head Sommelier & Cellar Master", location: "Paris, France", department: "Culinary & Beverage" },
    { title: "Alpine Sanctuary Operations Director", location: "Aspen, USA", department: "Operations" },
    { title: "Private Guest Experience Butler", location: "Kyoto, Japan", department: "Guest Relations" },
  ];

  return (
    <div className="py-16 px-6 lg:px-12 max-w-7xl mx-auto space-y-12">
      <div className="border-b border-slate-200 pb-8 space-y-3">
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-amber-700">
          <Briefcase className="h-4 w-4" />
          <span>Talent & Executive Acquisition</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-slate-950">
          Artisans of Sovereign Hospitality
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
          We invite masters of hospitality, culinary excellence, and discreet service to craft lifelong legacies across our global sanctuaries.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-slate-950">Current Appointments</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roles.map((r, i) => (
            <Card key={i} className="hover:border-slate-400 transition-colors">
              <CardContent className="p-6 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-700 font-semibold">
                    {r.department} • {r.location}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-slate-900 mt-1">{r.title}</h3>
                </div>
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500">Full-Time Executive</span>
                  <Button variant="ghost" size="sm" className="text-xs font-semibold text-amber-700">
                    Apply for Candidacy →
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
