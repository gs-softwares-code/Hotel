"use client";

import { useState } from "react";
import { submitInquiryAction } from "@/app/actions/booking-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  CheckCircle2,
  Compass,
} from "lucide-react";
import Link from "next/link";

export function ContactPageContent() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(formData: FormData) {
    setSubmitting(true);
    const res = await submitInquiryAction(formData);
    setSubmitting(false);

    if (res.success) {
      setSubmitted(true);
    } else {
      alert(res.error || "Failed to dispatch message.");
    }
  }

  return (
    <div className="py-16 px-6 lg:px-12 max-w-7xl mx-auto space-y-16">
      <div className="border-b border-stone-200 pb-8 space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-700">
          Concierge & Location
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-slate-950">
          Connect with Our Sanctuary
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl leading-relaxed font-light">
          Whether planning a private retreat, a bespoke event, or requiring arrival transfers, our head concierge is at your service.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Contact Information & Map */}
        <div className="lg:col-span-5 space-y-8">
          <div className="p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-6">
            <h3 className="font-serif text-2xl font-bold text-slate-950">
              Sanctuary Address
            </h3>

            <div className="space-y-4 text-xs text-slate-600">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-amber-700 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900">Aura Grand Sanctuary Kyoto</p>
                  <p>12 Higashiyama Sanctuary Way, Kyoto 605-0862, Japan</p>
                  <p className="text-[11px] text-slate-400 mt-1">Coordinates: 34.9989° N, 135.7807° E</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-amber-700 flex-shrink-0" />
                <span>+81 (75) 550-1824 (Concierge 24/7)</span>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-amber-700 flex-shrink-0" />
                <span>stay@aurahotels.internal</span>
              </div>

              <div className="flex items-center space-x-3">
                <Clock className="h-4 w-4 text-amber-700 flex-shrink-0" />
                <span>Check-in: 15:00 | Check-out: 12:00 (Flexible for Aura Privilege)</span>
              </div>
            </div>

            {/* Instant WhatsApp Pill */}
            <div className="pt-2">
              <Link
                href="https://wa.me/81755501824?text=Hello%20Aura%20Concierge,%20I%20would%20like%20to%20inquire%20about%20a%20stay"
                target="_blank"
                className="flex items-center justify-center space-x-2 w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors shadow-sm"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Chat via WhatsApp Concierge</span>
              </Link>
            </div>
          </div>

          {/* Transportation & Directions */}
          <div className="p-8 rounded-3xl bg-stone-100 border border-stone-200 space-y-4">
            <h4 className="font-serif text-lg font-bold text-slate-950">Arrival & Transfers</h4>
            <div className="space-y-3 text-xs text-slate-600 font-light leading-relaxed">
              <p>
                <strong>From Kyoto Station:</strong> 15 minutes by chauffeured car or private hotel electric taxi.
              </p>
              <p>
                <strong>From Kansai International Airport (KIX):</strong> 75 minutes via hotel private limousine transfer.
              </p>
              <p>
                <strong>Private Helicopter Transfers:</strong> Direct landing pad available at our certified Higashiyama summit pad by prior arrangement.
              </p>
            </div>
          </div>
        </div>

        {/* Contact & Inquiry Form */}
        <div className="lg:col-span-7">
          <div className="p-8 sm:p-12 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-700">
                Direct Communication
              </span>
              <h2 className="font-serif text-3xl font-bold text-slate-950">
                Inquire with Head Concierge
              </h2>
              <p className="text-xs text-slate-500 font-light">
                All communications are treated with strict executive discretion.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-center space-y-3">
                <CheckCircle2 className="h-10 w-10 text-emerald-600 mx-auto" />
                <h3 className="font-serif text-xl font-bold">Message Received</h3>
                <p className="text-xs text-emerald-700 max-w-md mx-auto">
                  Our head concierge will review your inquiry and respond within two business hours.
                </p>
                <Button
                  onClick={() => setSubmitted(false)}
                  variant="outline"
                  size="sm"
                  className="text-xs mt-2"
                >
                  Send Another Dispatch
                </Button>
              </div>
            ) : (
              <form action={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1 text-xs">
                    <label className="font-semibold text-slate-700">Full Name</label>
                    <Input name="name" placeholder="Lord Sterling Archer" required />
                  </div>
                  <div className="space-y-1 text-xs">
                    <label className="font-semibold text-slate-700">Email Address</label>
                    <Input name="email" type="email" placeholder="sterling@sovereign.ch" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1 text-xs">
                    <label className="font-semibold text-slate-700">Telephone / WhatsApp</label>
                    <Input name="phone" placeholder="+81 75 550 1824" />
                  </div>
                  <div className="space-y-1 text-xs">
                    <label className="font-semibold text-slate-700">Inquiry Classification</label>
                    <select
                      name="category"
                      className="flex h-9 w-full rounded-md border border-slate-200 bg-white px-3 py-1 text-xs"
                    >
                      <option value="GENERAL">General Inquiries</option>
                      <option value="RESERVATION">Pavilion Suite Reservations</option>
                      <option value="CONCIERGE">Bespoke Concierge & Helicopter Transfers</option>
                      <option value="EVENTS">Private Banquets & Weddings</option>
                      <option value="PRESS">Media & Editorial Desk</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1 text-xs">
                  <label className="font-semibold text-slate-700">Subject</label>
                  <Input name="subject" placeholder="Private 5-Night Stay & Tea Ceremony Request" required />
                </div>

                <div className="space-y-1 text-xs">
                  <label className="font-semibold text-slate-700">Your Message</label>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Please specify any preferred suite, dates, arrival requirements..."
                    className="w-full rounded-md border border-slate-200 p-2 text-xs"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  variant="secondary"
                  className="w-full text-xs font-bold uppercase tracking-wider h-11"
                >
                  {submitting ? "Transmitting to Concierge..." : "Transmit Message"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

