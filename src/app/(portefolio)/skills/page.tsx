import SkillsSection from '@/components/Skill/SkillsSection';

import { generateMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';

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

export default function SkillsPage() {
  return <SkillsSection />;
}
