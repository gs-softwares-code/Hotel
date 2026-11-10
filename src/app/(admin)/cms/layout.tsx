import Link from "next/link";
import { getSessionUser, logoutAction } from "./auth-actions";
import {
  Building2,
  FileText,
  LayoutDashboard,
  LogOut,
  CalendarCheck,
  UtensilsCrossed,
  MessageSquare,
  Sparkles,
  Bed,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await getSessionUser();

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Enterprise CMS Sidebar */}
      <aside className="w-64 border-r border-slate-200 bg-slate-950 text-white flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-amber-400" />
            <span className="font-serif text-lg tracking-wider text-amber-100 font-semibold uppercase">
              Aura CMS
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Hotel Management Suite</p>
        </div>

        <nav className="flex-1 p-4 space-y-1 text-sm">
          <Link
            href="/cms/dashboard"
            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-900 transition-colors"
          >
            <LayoutDashboard className="h-4 w-4 text-amber-400" />
            <span>Dashboard & Analytics</span>
          </Link>

          <Link
            href="/cms/bookings"
            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-900 transition-colors"
          >
            <CalendarCheck className="h-4 w-4 text-amber-400" />
            <span>Guest Reservations</span>
          </Link>

          <Link
            href="/cms/properties"
            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-900 transition-colors"
          >
            <Building2 className="h-4 w-4 text-amber-400" />
            <span>Hotels & Rooms</span>
          </Link>

          <Link
            href="/cms/dining-admin"
            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-900 transition-colors"
          >
            <UtensilsCrossed className="h-4 w-4 text-amber-400" />
            <span>Dining & Tables</span>
          </Link>

          <Link
            href="/cms/inquiries"
            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-900 transition-colors"
          >
            <MessageSquare className="h-4 w-4 text-amber-400" />
            <span>Concierge Inquiries</span>
          </Link>

          <Link
            href="/cms/content"
            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-900 transition-colors"
          >
            <FileText className="h-4 w-4 text-amber-400" />
            <span>Press & Governance</span>
          </Link>
        </nav>

        {/* User Role Card & Logout */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/50">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs font-semibold text-slate-200">{user?.name || "Victoria Kensington"}</p>
              <p className="text-[10px] text-amber-400 font-mono uppercase tracking-wider">
                {user?.role || "GENERAL_MANAGER"}
              </p>
            </div>
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
          </div>
          <form action={logoutAction}>
            <Button
              type="submit"
              variant="outline"
              size="sm"
              className="w-full justify-start text-xs border-slate-700 bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800"
            >
              <LogOut className="h-3.5 w-3.5 mr-2 text-slate-400" />
              Sign Out
            </Button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-16 border-b border-slate-200 bg-white px-8 flex items-center justify-between">
          <div className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
            Aura Hotel Management Dashboard • Live Edge Sync
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              target="_blank"
              className="text-xs text-amber-600 hover:text-amber-700 font-medium hover:underline"
            >
              View Guest Experience Portal →
            </Link>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
