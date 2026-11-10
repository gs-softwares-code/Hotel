import { Metadata } from "next";
import { ContactPageContent } from "@/components/enterprise/contact-page-content";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Contact & Location | Aura Kyoto Luxury Hotel",
  description:
    "Connect with Aura Kyoto. Direct 24/7 concierge desk, WhatsApp inquiries, arrival directions, and chauffeured airport limousine bookings.",
};

export default function ContactPage() {
  return <ContactPageContent />;
}

