import ProjectSection from '@/components/Projects/ProjectSection';
import { generateMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = generateMetadata({
  title: "Projets | Gilchrist - Développeur Web & Mathématicien",
  description:
    "Découvrez les projets sur lesquels j'ai travaillé : applications web, outils sur mesure, intégrations front-end et back-end.",
  slug: "projects",
  keywords: [
    "projets",
    "portfolio",
    "applications web",
    "développement",
    "frontend",
    "backend",
    "Next.js",
    "React",
  ],
});


export default function ProjectsPage() {
  return <ProjectSection />;
}
