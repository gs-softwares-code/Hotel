import { Metadata } from "next";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TrendingUp, FileText, Download, DollarSign, BarChart3, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Investor Relations & SEC Governance | Aura Conglomerate",
  description:
    "Audited financial performance, Q3 earnings, Form 10-K, Form 10-Q SEC filings, and shareholder governance for Aura Global Hospitality (NYSE: AURA).",
};

export default function InvestorsPage() {
  const filings = [
    { type: "10-Q", period: "Quarter Ended September 30, 2026", date: "Nov 02, 2026", size: "4.2 MB" },
    { type: "8-K", period: "Acquisition of Alpine Sanctuary Portfolio", date: "Oct 14, 2026", size: "1.1 MB" },
    { type: "10-K", period: "Annual Report for Fiscal Year 2025", date: "Mar 15, 2026", size: "12.8 MB" },
    { type: "DEF 14A", period: "Official Proxy Statement", date: "Apr 28, 2026", size: "2.4 MB" },
  ];

  return (
    <div className="py-16 px-6 lg:px-12 max-w-7xl mx-auto space-y-12">
      {/* Investor Hero */}
      <div className="border-b border-slate-200 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-3">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-amber-700">
            <ShieldCheck className="h-4 w-4" />
            <span>Authority & Shareholder Governance</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-slate-950">
            Investor Relations
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl">
            Delivering sustained alpha through peerless real estate moats, high ADR margins, and edge-native operational efficiency.
          </p>
        </div>

        {/* Live Mock Edge Stock Ticker */}
        <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm flex items-center space-x-6">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">NYSE: AURA</p>
            <p className="text-2xl font-serif font-bold text-slate-900">$184.62</p>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center text-xs font-bold text-emerald-600">
              <TrendingUp className="h-3.5 w-3.5 mr-1" />
              +2.84 (+1.56%)
            </span>
            <p className="text-[10px] text-slate-400 mt-1">Real-Time Edge Feed</p>
          </div>
        </div>
      </div>

      {/* Financial KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold text-slate-500 uppercase">RevPAR Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-serif text-slate-950">+18.4% YoY</div>
            <p className="text-[11px] text-emerald-600 mt-1">Across Luxury Tier</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold text-slate-500 uppercase">Average Daily Rate (ADR)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-serif text-slate-950">$1,240 USD</div>
            <p className="text-[11px] text-slate-500 mt-1">Global Sanctuary Average</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold text-slate-500 uppercase">Gross Operating Profit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-serif text-slate-950">46.2% Margin</div>
            <p className="text-[11px] text-emerald-600 mt-1">+240 bps vs industry</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold text-slate-500 uppercase">Total Pipeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-serif text-slate-950">$4.8 Billion</div>
            <p className="text-[11px] text-slate-500 mt-1">14 Flagships in Development</p>
          </CardContent>
        </Card>
      </div>

      {/* SEC Filings Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl font-bold text-slate-950">
            SEC Regulatory Dispatches
          </h2>
          <Button variant="outline" size="sm" className="text-xs">
            Export XBRL
          </Button>
        </div>

        <div className="border border-slate-200 rounded-xl bg-white overflow-hidden shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-semibold">
              <tr>
                <th className="p-4">Filing Type</th>
                <th className="p-4">Reporting Period</th>
                <th className="p-4">Filing Date</th>
                <th className="p-4 text-right">Download</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filings.map((f, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-bold text-amber-700 font-mono">
                    {f.type}
                  </td>
                  <td className="p-4 font-medium text-slate-900">
                    {f.period}
                  </td>
                  <td className="p-4 text-slate-500">{f.date}</td>
                  <td className="p-4 text-right">
                    <Button variant="ghost" size="sm" className="text-xs text-slate-600 hover:text-slate-950">
                      <Download className="h-3.5 w-3.5 mr-1" />
                      PDF ({f.size})
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
