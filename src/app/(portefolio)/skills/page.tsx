import SkillsSection from "@/components/Skill/SkillsSection";
import prisma from "@/lib/prisma";
import { generateMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

type Tag = {
  id: number;
  name: string;
};

type CompetenceFromDb = {
  id: number;
  title: string;
  description: string;
  icon: string; // string type
  color: string;
  tagColor: string;
  tags?: Tag[];
};

type Competence = {
  id: number;
  title: string;
  description: string;
  iconKey: string; // renamed to avoid confusion
  color: string;
  tagColor: string;
  tags: string[];
};

export const metadata: Metadata = generateMetadata({
  title: "Compétences | Gilchrist - Développeur Web & Mathématicien",
  description:
    "Découvrez mes compétences techniques en développement web, frameworks modernes et mathématiques appliquées.",
  slug: "skills",
  keywords: [
    "compétences",
    "skills",
    "développement web",
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "mathématiques appliquées",
  ],
});

export default async function SkillsPage() {
  const skillsFromDb: CompetenceFromDb[] = await prisma.competence.findMany({
    include: { tags: true },
  });

  const skills: Competence[] = skillsFromDb.map((skill) => ({
    id: skill.id,
    title: skill.title,
    description: skill.description,
    iconKey: skill.icon,
    color: skill.color,
    tagColor: skill.tagColor,
    tags: skill.tags?.map((t) => t.name) ?? [],
  }));

  return <SkillsSection skills={skills} />;
}
