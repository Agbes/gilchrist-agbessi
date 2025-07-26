import AboutSection from '@/components/About/AboutSection';
import { generateMetadata } from "@/lib/metadata";
import type { Metadata } from "next";



export const metadata: Metadata = generateMetadata({
  title: "À propos | Gilchrist - Développeur Web & Mathématicien",
  description:
    "Apprenez-en plus sur Gilchrist, développeur web passionné, avec une expertise en React, Next.js et mathématiques.",
  slug: "about",
  keywords: ["profil", "biographie", "compétences"],
});



export default function About() {
  return <AboutSection />;
}
