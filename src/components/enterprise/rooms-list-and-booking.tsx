"use client";

import { useState } from "react";
import { createBookingAction } from "@/app/actions/booking-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  CheckCircle2,
  Users,
  Maximize2,
  Bed,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CreditCard,
} from "lucide-react";

export interface RoomItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  basePrice: number;
  capacity: number;
  sizeSqFt: number;
  bedType: string;
  imageUrl: string;
  amenities: string[];
}

export function RoomsListAndBooking({
  rooms,
  initialSelectedSlug,
  locale = "en",
}: {
  rooms: RoomItem[];
  initialSelectedSlug?: string;
  locale?: string;
}) {
  const [selectedRoom, setSelectedRoom] = useState<RoomItem | null>(
    rooms.find((r) => r.slug === initialSelectedSlug) || null
  );

  const [checkIn, setCheckIn] = useState("2026-12-15");
  const [checkOut, setCheckOut] = useState("2026-12-18");
  const [adults, setAdults] = useState(2);
  const [submitting, setSubmitting] = useState(false);
  const [bookingResult, setBookingResult] = useState<any>(null);

  // Dynamic pricing calculation
  const nights = Math.max(
    1,
    Math.round(
      (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
        (1000 * 60 * 60 * 24)
    ) || 3
  );

  const totalPrice = selectedRoom ? selectedRoom.basePrice * nights : 0;
  const taxes = Math.round(totalPrice * 0.1);
  const grandTotal = totalPrice + taxes;

  async function handleBookingSubmit(formData: FormData) {
    if (!selectedRoom) return;

    setSubmitting(true);
    formData.set("propertyId", "prop_kyoto_01");
    formData.set("roomId", selectedRoom.id);
    formData.set("checkIn", checkIn);
    formData.set("checkOut", checkOut);
    formData.set("adultsCount", adults.toString());
    formData.set("totalAmount", grandTotal.toString());

    const result = await createBookingAction(formData);
    setSubmitting(false);

    if (result.success) {
      setBookingResult(result);
    } else {
      alert(result.error || "Reservation error. Please check form inputs.");
    }
  }

  return (
    <div className="space-y-12">
      {/* Confirmation View Modal */}
      {bookingResult && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur flex items-center justify-center p-4">
          <Card className="max-w-lg w-full border-amber-300 shadow-2xl p-6 bg-white space-y-6">
            <div className="text-center space-y-2">
              <div className="h-14 w-14 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-slate-950">
                Reservation Confirmed
              </h3>
              <p className="text-xs text-slate-500">
                A formal sanctuary confirmation letter has been dispatched.
              </p>
            </div>

            <div className="border border-stone-200 rounded-xl p-4 bg-stone-50 text-xs space-y-2.5">
              <div className="flex justify-between">
                <span className="text-slate-500">Booking Reference</span>
                <span className="font-mono font-bold text-amber-700">
                  {bookingResult.bookingReference}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Primary Guest</span>
                <span className="font-semibold text-slate-900">
                  {bookingResult.guestName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Stay Dates</span>
                <span className="font-medium text-slate-800">
                  {bookingResult.checkIn} to {bookingResult.checkOut} ({nights} nights)
                </span>
              </div>
              <div className="flex justify-between border-t border-stone-200 pt-2 font-bold text-sm">
                <span>Total Guaranteed Rate</span>
                <span className="text-slate-950">${bookingResult.totalAmount} USD</span>
              </div>
            </div>

            <Button
              onClick={() => {
                setBookingResult(null);
                setSelectedRoom(null);
              }}
              className="w-full bg-slate-950 text-white hover:bg-slate-800 text-xs uppercase font-semibold h-11"
            >
              Close Confirmation Window
            </Button>
          </Card>
        </div>
      )}

      {/* Booking Drawer / Panel (When room is selected) */}
      {selectedRoom && !bookingResult && (
        <div className="rounded-3xl border border-amber-300 bg-amber-50/40 p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-700">
                Direct Reservation Step 2/2
              </span>
              <h2 className="font-serif text-2xl font-bold text-slate-950">
                Booking: {selectedRoom.name}
              </h2>
            </div>
            <button
              onClick={() => setSelectedRoom(null)}
              className="text-xs text-slate-500 hover:text-slate-900 underline"
            >
              Choose a different room
            </button>
          </div>

          <form action={handleBookingSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1 text-xs">
                <label className="font-semibold text-slate-700">Check-in Date</label>
                <Input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-1 text-xs">
                <label className="font-semibold text-slate-700">Check-out Date</label>
                <Input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-1 text-xs">
                <label className="font-semibold text-slate-700">Adult Guests</label>
                <select
                  value={adults}
                  onChange={(e) => setAdults(Number(e.target.value))}
                  className="flex h-9 w-full rounded-md border border-slate-200 bg-white px-3 py-1 text-xs shadow-sm"
                >
                  <option value={1}>1 Guest</option>
                  <option value={2}>2 Guests</option>
                  <option value={3}>3 Guests</option>
                  <option value={4}>4 Guests</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1 text-xs">
                <label className="font-semibold text-slate-700">Full Name</label>
                <Input name="guestName" placeholder="Lord Sterling Archer" required />
              </div>

              <div className="space-y-1 text-xs">
                <label className="font-semibold text-slate-700">Email Address</label>
                <Input name="guestEmail" type="email" placeholder="sterling@sovereign.ch" required />
              </div>

              <div className="space-y-1 text-xs">
                <label className="font-semibold text-slate-700">Phone / WhatsApp</label>
                <Input name="guestPhone" placeholder="+81 75 550 1824" required />
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <label className="font-semibold text-slate-700">Special Dietary or Sanctuary Requests</label>
              <textarea
                name="specialRequests"
                rows={2}
                placeholder="Allergies, preferred arrival time, private tea master preferences..."
                className="w-full rounded-md border border-slate-200 p-2 text-xs"
              />
            </div>

            {/* Price Breakdown */}
            <div className="p-4 rounded-xl border border-stone-200 bg-white text-xs space-y-2">
              <div className="flex justify-between text-slate-600">
                <span>
                  ${selectedRoom.basePrice} x {nights} nights
                </span>
                <span>${totalPrice} USD</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Local Bath Tax & Resort Service Charges (10%)</span>
                <span>${taxes} USD</span>
              </div>
              <div className="flex justify-between border-t border-stone-200 pt-2 font-bold text-sm text-slate-950">
                <span>Total Due at Confirmation</span>
                <span className="text-amber-700">${grandTotal} USD</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-2">
              <div className="flex items-center space-x-2 text-xs text-slate-500">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span>Zero Cancellation Fee up to 48 hours prior to arrival.</span>
              </div>

              <Button
                type="submit"
                disabled={submitting}
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto font-bold uppercase tracking-wider text-xs px-8 h-11"
              >
                {submitting ? "Confirming with Sanctuary..." : "Complete Official Reservation"}
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Room Listing Grid */}
      <div className="space-y-10">
        {rooms.map((room) => (
          <div
            key={room.id}
            id={room.slug}
            className="rounded-3xl border border-stone-200 bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-0"
          >
            {/* Room Image */}
            <div className="lg:col-span-5 relative h-72 sm:h-96 lg:h-auto bg-slate-900">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={room.imageUrl}
                alt={room.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <Badge className="bg-slate-950/80 text-amber-300 backdrop-blur text-[10px] uppercase font-bold tracking-wider">
                  Guaranteed Thermal Onsen
                </Badge>
              </div>
            </div>

            {/* Room Info */}
            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <h3 className="font-serif text-2xl font-bold text-slate-950">
                    {room.name}
                  </h3>
                  <div className="text-right">
                    <span className="font-serif font-bold text-2xl text-slate-950">
                      ${room.basePrice}
                    </span>
                    <span className="text-xs text-slate-500"> / night</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                  {room.description}
                </p>

                {/* Key specs */}
                <div className="flex flex-wrap gap-4 text-xs text-slate-600 border-y border-stone-100 py-3">
                  <div className="flex items-center space-x-1.5">
                    <Maximize2 className="h-4 w-4 text-amber-700" />
                    <span>{room.sizeSqFt} sq.ft</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Bed className="h-4 w-4 text-amber-700" />
                    <span>{room.bedType}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Users className="h-4 w-4 text-amber-700" />
                    <span>Up to {room.capacity} Guests</span>
                  </div>
                </div>

                {/* Amenities pills */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-slate-600">
                  {room.amenities.map((a, i) => (
                    <div key={i} className="flex items-center space-x-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-amber-600 flex-shrink-0" />
                      <span className="truncate">{a}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-emerald-700 font-medium">
                  ✓ Available for Instant Confirmation
                </span>

                <Button
                  onClick={() => {
                    setSelectedRoom(room);
                    window.scrollTo({ top: 120, behavior: "smooth" });
                  }}
                  variant="secondary"
                  className="w-full sm:w-auto text-xs font-bold uppercase tracking-wider px-6 h-10"
                >
                  Select & Configure Stay →
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

