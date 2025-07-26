import HomeSection from "@/components/CarouselComponents/HomeSection";

import { generateMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = generateMetadata({
  title: "Accueil | Gilchrist - Développeur Web & Mathématicien",
  description:
    "Bienvenue sur mon portfolio. Je suis Gilchrist, développeur web passionné par les technologies modernes et les mathématiques appliquées.",
});





export default function Home() {
    return <HomeSection />;
}
