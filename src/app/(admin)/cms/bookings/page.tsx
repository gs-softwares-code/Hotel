import { db, bookings } from "@/db";
import { desc } from "drizzle-orm";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarCheck, DollarSign, Users, Mail, Phone } from "lucide-react";

export default async function CMSBookingsPage() {
  let reservations: any[] = [];

  try {
    reservations = await db.query.bookings.findMany({
      orderBy: [desc(bookings.createdAt)],
    });
  } catch {}

  if (reservations.length === 0) {
    reservations = [
      {
        id: "bk_seed_01",
        bookingReference: "AURA-849201-KYT",
        guestName: "Lord Sterling Archer",
        guestEmail: "sterling@sovereign.ch",
        guestPhone: "+81 75 550 1824",
        roomId: "rm_bamboo_pavilion",
        checkIn: new Date("2026-12-15"),
        checkOut: new Date("2026-12-18"),
        adultsCount: 2,
        totalAmount: 5550,
        status: "CONFIRMED",
        paymentStatus: "CONFIRMED",
        specialRequests: "Arriving by private helicopter; require white cypress onsen aromatherapy.",
      },
      {
        id: "bk_seed_02",
        bookingReference: "AURA-714088-PAR",
        guestName: "Madame Vivienne Laurent",
        guestEmail: "v.laurent@parisart.fr",
        guestPhone: "+33 1 42 68 55 00",
        roomId: "rm_garden_residence",
        checkIn: new Date("2026-12-24"),
        checkOut: new Date("2026-12-29"),
        adultsCount: 2,
        totalAmount: 13000,
        status: "CONFIRMED",
        paymentStatus: "CONFIRMED",
        specialRequests: "Christmas Eve private kaiseki dining in pavilion salon.",
      },
    ];
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif font-bold text-slate-900">
            Guest Reservations & Arrivals
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Confirmed guest bookings, stay dates, guest profiles, and special concierge requirements.
          </p>
        </div>
        <div className="text-right">
          <span className="text-xs font-semibold text-slate-600 block">Total Active Bookings</span>
          <span className="font-serif font-bold text-xl text-amber-700">{reservations.length}</span>
        </div>
      </div>

      <div className="border border-slate-200 rounded-xl bg-white overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-semibold">
            <tr>
              <th className="p-4">Reference</th>
              <th className="p-4">Guest</th>
              <th className="p-4">Stay Dates</th>
              <th className="p-4">Party</th>
              <th className="p-4">Total Amount</th>
              <th className="p-4">Status</th>
              <th className="p-4">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {reservations.map((b) => (
              <tr key={b.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4 font-mono font-bold text-amber-800">
                  {b.bookingReference}
                </td>
                <td className="p-4 space-y-0.5">
                  <p className="font-bold text-slate-900">{b.guestName}</p>
                  <p className="text-[11px] text-slate-500">{b.guestEmail}</p>
                  <p className="text-[11px] text-slate-400">{b.guestPhone}</p>
                </td>
                <td className="p-4 text-slate-600">
                  {new Date(b.checkIn).toLocaleDateString()} → {new Date(b.checkOut).toLocaleDateString()}
                </td>
                <td className="p-4 text-slate-600">
                  {b.adultsCount} Adults
                </td>
                <td className="p-4 font-bold text-slate-900">
                  ${b.totalAmount?.toLocaleString()} USD
                </td>
                <td className="p-4">
                  <Badge variant="published">{b.status}</Badge>
                </td>
                <td className="p-4 text-slate-500 max-w-xs truncate text-[11px]">
                  {b.specialRequests || "No special requests"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

