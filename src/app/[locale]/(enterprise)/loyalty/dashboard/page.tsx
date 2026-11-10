import { Metadata } from "next";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Award, Sparkles, Key, Compass, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Aura Privilege Club | Member Lounge & Tier Benefits",
  description:
    "Private loyalty tier dashboard for Aura Privilege members. Check accumulated tier points, private jet transfers, and suite upgrades.",
};

export default function LoyaltyDashboardPage() {
  const member = {
    name: "Lord Sterling Archer",
    tier: "AMBASSADOR RESERVE",
    tierPoints: "48,250",
    nightsStayed: 32,
    multiplier: "3.5x",
    membershipId: "AURA-AMB-99214",
  };

  return (
    <div className="py-16 px-6 lg:px-12 max-w-7xl mx-auto space-y-12">
      {/* Loyalty Header */}
      <div className="border-b border-slate-200 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-3">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-amber-700">
            <Sparkles className="h-4 w-4" />
            <span>Aura Privilege Elite Tier</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-slate-950">
            Welcome, {member.name}
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl">
            Membership ID: <span className="font-mono font-semibold text-slate-900">{member.membershipId}</span> • Tier Status Guaranteed Worldwide
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-950 text-white flex items-center space-x-6">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-amber-400 font-bold">Tier Classification</p>
            <p className="text-lg font-serif font-bold text-amber-200">{member.tier}</p>
          </div>
          <Award className="h-8 w-8 text-amber-400" />
        </div>
      </div>

      {/* Member Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold text-slate-500 uppercase">Privilege Points</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-serif font-bold text-slate-950">{member.tierPoints}</div>
            <p className="text-[11px] text-amber-700 mt-1">Earning at {member.multiplier} Points / $1 spent</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold text-slate-500 uppercase">Nights Completed (2026)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-serif font-bold text-slate-950">{member.nightsStayed} Nights</div>
            <p className="text-[11px] text-emerald-600 mt-1">Lifetime Ambassador Status Achieved</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold text-slate-500 uppercase">Available Upgrades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-serif font-bold text-slate-950">4 Vouchers</div>
            <p className="text-[11px] text-slate-500 mt-1">Guaranteed Presidential Suite confirmation</p>
          </CardContent>
        </Card>
      </div>

      {/* Privilege Perks */}
      <div className="border border-slate-200 rounded-2xl bg-white p-8 space-y-6">
        <h2 className="font-serif text-2xl font-bold text-slate-950">
          Your Ambassador Privileges
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600">
          <div className="p-4 rounded-xl border border-slate-100 bg-slate-50 space-y-2">
            <Key className="h-5 w-5 text-amber-600" />
            <h3 className="font-bold text-slate-900">24/7 Dedicated Butler Desk</h3>
            <p>Direct private WhatsApp & signal line to your personal sanctuary curator.</p>
          </div>
          <div className="p-4 rounded-xl border border-slate-100 bg-slate-50 space-y-2">
            <Compass className="h-5 w-5 text-amber-600" />
            <h3 className="font-bold text-slate-900">Complimentary Helicopter Transfers</h3>
            <p>Available between regional hubs and remote alpine/atoll properties.</p>
          </div>
          <div className="p-4 rounded-xl border border-slate-100 bg-slate-50 space-y-2">
            <ShieldCheck className="h-5 w-5 text-amber-600" />
            <h3 className="font-bold text-slate-900">Discrete Check-In & Security</h3>
            <p>Direct in-suite biometric arrival without passing public lobbies.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
