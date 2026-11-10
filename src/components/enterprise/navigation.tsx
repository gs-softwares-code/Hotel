import Link from "next/link";
import { Sparkles, MessageSquare, Phone, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EnterpriseHeader({ locale = "en" }: { locale?: string }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="max-w-7xl mx-auto flex h-20 items-center justify-between px-6 lg:px-12">
        {/* Brand Crest */}
        <Link href={`/${locale}`} className="flex items-center space-x-3 group">
          <div className="h-10 w-10 rounded-full bg-slate-950 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform duration-300">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl font-bold tracking-[0.2em] text-slate-950 uppercase">
              Aura
            </span>
            <span className="text-[9px] tracking-[0.25em] text-amber-700 uppercase font-medium">
              Grand Luxury Hotel & Spa
            </span>
          </div>
        </Link>

        {/* Primary Guest Experience Navigation */}
        <nav className="hidden lg:flex items-center space-x-7 text-xs uppercase tracking-widest font-semibold text-slate-700">
          <Link
            href={`/${locale}/rooms`}
            className="hover:text-amber-600 transition-colors py-2"
          >
            Rooms & Suites
          </Link>
          <Link
            href={`/${locale}/dining`}
            className="hover:text-amber-600 transition-colors py-2"
          >
            Dining
          </Link>
          <Link
            href={`/${locale}/experiences`}
            className="hover:text-amber-600 transition-colors py-2"
          >
            Facilities & Spa
          </Link>
          <Link
            href={`/${locale}/gallery`}
            className="hover:text-amber-600 transition-colors py-2"
          >
            Gallery
          </Link>
          <Link
            href={`/${locale}/about`}
            className="hover:text-amber-600 transition-colors py-2"
          >
            Our Story
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="hover:text-amber-600 transition-colors py-2"
          >
            Contact
          </Link>
        </nav>

        {/* Quick Actions & Instant Booking */}
        <div className="flex items-center space-x-3">
          <Link
            href="https://wa.me/81755501824?text=Hello%20Aura%20Concierge,%20I%20would%20like%20to%20inquire%20about%20a%20luxury%20stay"
            target="_blank"
            className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold hover:bg-emerald-100 transition-colors border border-emerald-200"
          >
            <MessageSquare className="h-3.5 w-3.5 text-emerald-600" />
            <span>WhatsApp Concierge</span>
          </Link>

          <Link href="/cms/login" className="hidden xl:inline-flex">
            <Button
              variant="outline"
              size="sm"
              className="text-[11px] uppercase tracking-wider font-semibold border-slate-300"
            >
              CMS Staff
            </Button>
          </Link>

          <Link href={`/${locale}/rooms`}>
            <Button
              variant="secondary"
              size="sm"
              className="text-xs uppercase tracking-wider font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 px-5 shadow-sm"
            >
              Book Now
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

export function EnterpriseFooter({ locale = "en" }: { locale?: string }) {
  return (
    <footer className="border-t border-slate-900 bg-slate-950 text-slate-400 text-xs py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-5 gap-10">
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-full bg-amber-400/10 flex items-center justify-center text-amber-400">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="font-serif text-lg font-bold tracking-widest text-white uppercase">
              Aura Grand Sanctuary
            </span>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
            A serene sanctuary where timeless Japanese artistry, Michelin-caliber gastronomy, and private onsen hot springs unite to deliver an extraordinary contemporary luxury stay.
          </p>
          <div className="pt-2 text-[11px] text-amber-400 font-mono">
            Direct Concierge: +81 (75) 550-1824 • stay@aurahotels.internal
          </div>
        </div>

        <div>
          <h4 className="text-white font-serif font-semibold uppercase tracking-wider mb-4">
            Guest Experience
          </h4>
          <ul className="space-y-2.5">
            <li>
              <Link href={`/${locale}/rooms`} className="hover:text-amber-400">
                Rooms & Suites
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/dining`} className="hover:text-amber-400">
                Michelin Dining & Lounge
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/experiences`} className="hover:text-amber-400">
                Onsen Spa & Heated Pool
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/gallery`} className="hover:text-amber-400">
                Architectural Gallery
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-serif font-semibold uppercase tracking-wider mb-4">
            Hotel Story
          </h4>
          <ul className="space-y-2.5">
            <li>
              <Link href={`/${locale}/about`} className="hover:text-amber-400">
                Philosophy & Heritage
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/contact`} className="hover:text-amber-400">
                Location & Private Map
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/loyalty/dashboard`} className="hover:text-amber-400">
                Aura Privilege Lounge
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/investors`} className="hover:text-amber-400">
                Corporate Governance
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-serif font-semibold uppercase tracking-wider mb-4">
            Direct Contact
          </h4>
          <p className="text-slate-400 mb-2">12 Higashiyama Sanctuary Way, Kyoto 605-0862, Japan</p>
          <div className="pt-2 space-y-2">
            <Link
              href="https://wa.me/81755501824?text=Hello%20Aura%20Concierge"
              target="_blank"
              className="inline-flex items-center text-emerald-400 hover:underline"
            >
              <span>WhatsApp Direct Desk →</span>
            </Link>
            <div>
              <Link href="/cms/login" className="text-amber-500 hover:text-amber-400 font-semibold block">
                Hotel Management CMS
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center text-[11px] text-slate-500">
        <p>© {new Date().getFullYear()} Aura Grand Luxury Hotel. All rights reserved.</p>
        <p className="mt-2 sm:mt-0 font-mono">Edge-Native Hospitality Architecture • Direct Booking Best Rate Guarantee</p>
      </div>
    </footer>
  );
}
