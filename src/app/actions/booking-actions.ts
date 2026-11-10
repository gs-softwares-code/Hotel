"use server";

import { revalidatePath } from "next/cache";
import { db, bookings, diningReservations, inquiries, type Booking, type DiningReservation } from "@/db";
import { z } from "zod";

const bookingInputSchema = z.object({
  propertyId: z.string().min(1),
  roomId: z.string().min(1),
  checkIn: z.string().min(1),
  checkOut: z.string().min(1),
  guestName: z.string().min(2, "Name required"),
  guestEmail: z.string().email("Valid email required"),
  guestPhone: z.string().min(5, "Contact phone required"),
  adultsCount: z.coerce.number().min(1).default(2),
  childrenCount: z.coerce.number().default(0),
  specialRequests: z.string().optional(),
  totalAmount: z.coerce.number().min(1),
});

export async function createBookingAction(formData: FormData) {
  const raw = Object.fromEntries(formData.entries());
  const parsed = bookingInputSchema.safeParse(raw);

  if (!parsed.success) {
    return { error: parsed.error.errors.map((e) => e.message).join(", ") };
  }

  const data = parsed.data;
  const bookingReference = `AURA-${Date.now().toString().slice(-6)}-${Math.random().toString(36).substring(2, 5).toUpperCase()}`;
  const bookingId = `bk_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;

  try {
    const newBooking = {
      id: bookingId,
      bookingReference,
      propertyId: data.propertyId,
      roomId: data.roomId,
      guestName: data.guestName,
      guestEmail: data.guestEmail,
      guestPhone: data.guestPhone,
      specialRequests: data.specialRequests || "",
      checkIn: new Date(data.checkIn),
      checkOut: new Date(data.checkOut),
      adultsCount: data.adultsCount,
      childrenCount: data.childrenCount,
      totalAmount: data.totalAmount,
      status: "CONFIRMED" as const,
      paymentStatus: "CONFIRMED" as const,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.insert(bookings).values(newBooking);

    revalidatePath("/cms/bookings");
    revalidatePath("/loyalty/dashboard");

    return {
      success: true,
      bookingReference,
      guestName: data.guestName,
      totalAmount: data.totalAmount,
      checkIn: data.checkIn,
      checkOut: data.checkOut,
    };
  } catch (err: any) {
    return { error: err.message || "Failed to finalize booking with sanctuary database." };
  }
}

const diningReservationSchema = z.object({
  venueId: z.string().min(1),
  guestName: z.string().min(2, "Name required"),
  guestEmail: z.string().email("Valid email required"),
  guestPhone: z.string().min(5, "Phone number required"),
  reservationDate: z.string().min(1, "Date required"),
  reservationTime: z.string().min(1, "Time required"),
  partySize: z.coerce.number().min(1).max(20),
  specialRequests: z.string().optional(),
});

export async function createDiningReservationAction(formData: FormData) {
  const raw = Object.fromEntries(formData.entries());
  const parsed = diningReservationSchema.safeParse(raw);

  if (!parsed.success) {
    return { error: parsed.error.errors.map((e) => e.message).join(", ") };
  }

  const data = parsed.data;
  const reservationId = `dr_${Date.now()}`;

  try {
    await db.insert(diningReservations).values({
      id: reservationId,
      venueId: data.venueId,
      guestName: data.guestName,
      guestEmail: data.guestEmail,
      guestPhone: data.guestPhone,
      reservationDate: data.reservationDate,
      reservationTime: data.reservationTime,
      partySize: data.partySize,
      specialRequests: data.specialRequests || "",
      status: "CONFIRMED",
      createdAt: new Date(),
    });

    return { success: true, reservationId };
  } catch (err: any) {
    return { error: err.message || "Dining reservation failed." };
  }
}

const inquirySchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  category: z.enum(["GENERAL", "RESERVATION", "EVENTS", "PRESS", "CONCIERGE"]).default("GENERAL"),
  subject: z.string().min(3),
  message: z.string().min(10),
});

export async function submitInquiryAction(formData: FormData) {
  const raw = Object.fromEntries(formData.entries());
  const parsed = inquirySchema.safeParse(raw);

  if (!parsed.success) {
    return { error: parsed.error.errors.map((e) => e.message).join(", ") };
  }

  const data = parsed.data;
  const inquiryId = `inq_${Date.now()}`;

  try {
    await db.insert(inquiries).values({
      id: inquiryId,
      name: data.name,
      email: data.email,
      phone: data.phone || "",
      category: data.category,
      subject: data.subject,
      message: data.message,
      status: "NEW",
      createdAt: new Date(),
    });

    return { success: true };
  } catch (err: any) {
    return { error: err.message || "Failed to dispatch concierge message." };
  }
}

