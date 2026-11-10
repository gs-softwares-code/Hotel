import { db, diningReservations } from "@/db";
import { desc } from "drizzle-orm";
import { Badge } from "@/components/ui/badge";
import { UtensilsCrossed, Clock, Users } from "lucide-react";

export default async function CMSDiningAdminPage() {
  let reservations: any[] = [];

  try {
    reservations = await db.query.diningReservations.findMany({
      orderBy: [desc(diningReservations.createdAt)],
    });
  } catch {}

  if (reservations.length === 0) {
    reservations = [
      {
        id: "dr_1",
        venueId: "venue_kura",
        guestName: "Lady Eleanor Vance",
        guestEmail: "eleanor@vance.co.uk",
        guestPhone: "+81 75 550 1824",
        reservationDate: "2026-12-16",
        reservationTime: "19:00",
        partySize: 2,
        specialRequests: "Anniversary dinner; pairing with rare biodynamic sake.",
        status: "CONFIRMED",
      },
      {
        id: "dr_2",
        venueId: "venue_lounge",
        guestName: "Kenichi Sato",
        guestEmail: "sato@kyotocraft.jp",
        guestPhone: "+81 90 1234 5678",
        reservationDate: "2026-12-16",
        reservationTime: "20:30",
        partySize: 4,
        specialRequests: "Single malt whiskey tasting flight.",
        status: "CONFIRMED",
      },
    ];
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-serif font-bold text-slate-900">
          Restaurant Kura & Lounge Table Seatings
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Manage evening counter seatings, party sizes, and guest dietary notes.
        </p>
      </div>

      <div className="border border-slate-200 rounded-xl bg-white overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-semibold">
            <tr>
              <th className="p-4">Guest</th>
              <th className="p-4">Venue</th>
              <th className="p-4">Date & Time</th>
              <th className="p-4">Party Size</th>
              <th className="p-4">Status</th>
              <th className="p-4">Special Requests</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {reservations.map((r) => (
              <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4 space-y-0.5">
                  <p className="font-bold text-slate-900">{r.guestName}</p>
                  <p className="text-[11px] text-slate-500">{r.guestEmail}</p>
                  <p className="text-[11px] text-slate-400">{r.guestPhone}</p>
                </td>
                <td className="p-4 font-semibold text-slate-800">
                  {r.venueId === "venue_kura" ? "Restaurant Kura (Kaiseki)" : "Higashiyama Cellar Lounge"}
                </td>
                <td className="p-4 text-slate-600 font-mono">
                  {r.reservationDate} at {r.reservationTime}
                </td>
                <td className="p-4 text-slate-600">{r.partySize} Guests</td>
                <td className="p-4">
                  <Badge variant="published">{r.status}</Badge>
                </td>
                <td className="p-4 text-slate-500 max-w-xs truncate text-[11px]">
                  {r.specialRequests || "None"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

