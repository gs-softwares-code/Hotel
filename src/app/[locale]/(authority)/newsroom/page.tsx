import { Metadata } from "next";
import { db, pressReleases } from "@/db";
import { eq, desc } from "drizzle-orm";
import { Card, CardContent } from "@/components/ui/card";
import { Newspaper, Calendar } from "lucide-react";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Corporate Newsroom & Press Releases | Aura Conglomerate",
  description:
    "Official statements, property openings, corporate acquisitions, and governance updates from the executive leadership of Aura Global Hospitality.",
};

export default async function NewsroomPage() {
  let releases: any[] = [];
  try {
    releases = await db.query.pressReleases.findMany({
      where: eq(pressReleases.status, "PUBLISHED"),
      orderBy: [desc(pressReleases.publishDate)],
    });
  } catch {}

  if (releases.length === 0) {
    releases = [
      {
        id: "pr-1",
        title: "Aura Conglomerate Announces Flagship Opening in Historic Kyoto",
        slug: "aura-flagship-kyoto-opening",
        summary: "Ultra-luxury sanctuary featuring private cedar onsens opens bookings for autumn 2026.",
        publishDate: new Date("2026-10-18"),
      },
      {
        id: "pr-2",
        title: "Q3 2026 Financial Results: RevPAR Advances 18.4% Across Flagships",
        slug: "q3-2026-financial-results",
        summary: "EBITDA margins expand to 46.2% following strategic Alpine acquisition.",
        publishDate: new Date("2026-09-30"),
      },
      {
        id: "pr-3",
        title: "Aura Unveils 2030 Microgrid Net-Zero Initiative",
        slug: "aura-2030-microgrid-initiative",
        summary: "Over $80M committed to on-site geothermal and solar microgrids across global portfolio.",
        publishDate: new Date("2026-08-12"),
      },
    ];
  }

  return (
    <div className="py-16 px-6 lg:px-12 max-w-7xl mx-auto space-y-12">
      <div className="border-b border-slate-200 pb-8 space-y-3">
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-amber-700">
          <Newspaper className="h-4 w-4" />
          <span>Global Press & Corporate Newsroom</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-slate-950">
          Press Dispatches
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
          Official corporate communications, executive announcements, and portfolio milestones.
        </p>
      </div>

      <div className="space-y-4">
        {releases.map((r) => (
          <Card key={r.id} className="hover:border-slate-400 transition-all">
            <CardContent className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-[11px] text-amber-700 font-semibold uppercase">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{new Date(r.publishDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-slate-950">{r.title}</h3>
                <p className="text-xs text-slate-600 max-w-3xl leading-relaxed">{r.summary}</p>
              </div>
              <button className="text-xs font-semibold text-slate-900 hover:text-amber-700 whitespace-nowrap">
                Read Release →
              </button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
