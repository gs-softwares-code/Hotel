import { Metadata } from "next";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Leaf, Droplets, Sun, Award, Globe, Shield } from "lucide-react";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "ESG & Sustainability Governance | Aura Conglomerate",
  description:
    "Net-zero commitments, renewable microgrid deployments, local artisan support, and audited sustainability metrics.",
};

export default function ESGPage() {
  const metrics = [
    {
      title: "Carbon Footprint Reduction",
      value: "-44.6%",
      desc: "Measured against 2020 operational baseline across all properties.",
      icon: Leaf,
    },
    {
      title: "Renewable Energy On-Site",
      value: "82.4%",
      desc: "Powered via dedicated geothermal, hydro, and solar microgrids.",
      icon: Sun,
    },
    {
      title: "Water Reclaimed & Conserved",
      value: "148M Gal",
      desc: "Closed-loop greywater purification in drought-sensitive atolls.",
      icon: Droplets,
    },
    {
      title: "Heritage Artisan Endowment",
      value: "$42.5M",
      desc: "Direct investments into ancestral architectural preservation.",
      icon: Award,
    },
  ];

  return (
    <div className="py-16 px-6 lg:px-12 max-w-7xl mx-auto space-y-12">
      <div className="border-b border-slate-200 pb-8 space-y-3">
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-emerald-700">
          <Leaf className="h-4 w-4" />
          <span>ESG & Environmental Stewardship</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-slate-950">
          Sustainable Luxury by Architecture
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
          True luxury protects its cradle. We build low-impact sanctuaries engineered to coexist symbiotically with indigenous ecosystems.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m, i) => {
          const Icon = m.icon;
          return (
            <Card key={i} className="border-emerald-100 bg-emerald-50/20">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-xs font-semibold text-slate-600 uppercase">
                  {m.title}
                </CardTitle>
                <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800">
                  <Icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-serif font-bold text-slate-950">{m.value}</div>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">{m.desc}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-8 space-y-6">
        <h2 className="font-serif text-2xl font-bold text-slate-950">
          Our 2030 Carbon Negative Charter
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600 leading-relaxed">
          <div className="p-4 rounded-xl border border-slate-100 bg-slate-50 space-y-2">
            <h3 className="font-bold text-slate-900">Zero Single-Use Plastics</h3>
            <p>100% eliminated across guest rooms, culinary outlets, and global logistics since 2023.</p>
          </div>
          <div className="p-4 rounded-xl border border-slate-100 bg-slate-50 space-y-2">
            <h3 className="font-bold text-slate-900">Regenerative Sourcing</h3>
            <p>Over 78% of dining ingredients sourced within a 50-mile radius of each property sanctuary.</p>
          </div>
          <div className="p-4 rounded-xl border border-slate-100 bg-slate-50 space-y-2">
            <h3 className="font-bold text-slate-900">Local Artisan Preservation</h3>
            <p>Every resort construction directly employs ancestral stone, wood, and metal crafts guilds.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
