import ExperienceSection from "@/components/Experiences/ExperienceSection";
import { generateMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = generateMetadata({
  title: "Expériences | Gilchrist - Développeur Web & Mathématicien",
  description:
    "Parcourez mes expériences professionnelles, projets clients et missions réalisées en développement web et mathématiques appliquées.",
  slug: "experience",
  keywords: ["expériences", "parcours", "projets", "développement web", "freelance", "mission"],
});



export default function ExperiencePage() {
  return <ExperienceSection />;
}
