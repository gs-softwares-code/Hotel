import { Metadata } from "next";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Building2, Percent, Search, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "B2B Travel Agent & GDS Portal | Aura Hospitality",
  description:
    "Direct corporate GDS integration, 10% protected agent commission, live inventory lookup, and high-touch VIP client reservation desk.",
};

export default function B2BPortalPage() {
  return (
    <div className="py-16 px-6 lg:px-12 max-w-7xl mx-auto space-y-12">
      <div className="border-b border-slate-200 pb-8 space-y-3">
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-amber-700">
          <Building2 className="h-4 w-4" />
          <span>IATA / CLIA / Virtuoso Partner Gateway</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-slate-950">
          B2B Global Travel Advisor Desk
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
          Book high-commission inventory with guaranteed client VIP amenities, late check-out privileges, and $100 culinary credits.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold text-slate-500 uppercase">Standard Commission</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-serif font-bold text-slate-950">10% - 14%</div>
            <p className="text-[11px] text-emerald-600 mt-1">Paid directly within 7 days of guest departure</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold text-slate-500 uppercase">GDS Chain Code</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-mono font-bold text-amber-700">AU (Amadeus / Sabre)</div>
            <p className="text-[11px] text-slate-500 mt-1">Full rate parity guaranteed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold text-slate-500 uppercase">VIP Amenities Included</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-serif font-bold text-slate-950">$100 USD Credit</div>
            <p className="text-[11px] text-slate-500 mt-1">Plus complimentary daily breakfast for two</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-slate-200 bg-white">
        <CardHeader>
          <CardTitle>Advisor Direct Reservation Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Advisor IATA / TIDS #</label>
              <Input placeholder="00-994821" defaultValue="00-994821" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Client Last Name</label>
              <Input placeholder="Vanderbilt" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Preferred Sanctuary</label>
              <Input placeholder="Aura Reserve Kyoto" />
            </div>
            <div className="flex items-end">
              <Button variant="secondary" className="w-full text-xs font-bold uppercase tracking-wider">
                <Search className="h-4 w-4 mr-2" />
                Query B2B Rates
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
