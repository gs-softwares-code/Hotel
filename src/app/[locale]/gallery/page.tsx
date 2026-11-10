import { Metadata } from "next";
import { GalleryClientView } from "@/components/enterprise/gallery-client-view";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Photo Gallery & Lightbox | Aura Kyoto",
  description:
    "Immerse yourself in high-resolution photography of Aura Kyoto's private pavilion suites, hot-spring onsens, and Michelin-starred dining.",
};

export default function GalleryPage() {
  return <GalleryClientView />;
}

