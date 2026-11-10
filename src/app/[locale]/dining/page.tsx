import { Metadata } from "next";
import { DiningPageContent } from "@/components/enterprise/dining-page-content";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Fine Dining & Michelin Kaiseki | Aura Kyoto",
  description:
    "Discover seasonal Kyoto kaiseki at Two-Michelin-starred Restaurant Kura and rare single-cask Japanese spirits in our Higashiyama cellar lounge.",
};

export default function DiningPage() {
  return <DiningPageContent />;
}

