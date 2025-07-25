import { FaCode, FaServer, FaPaintBrush, FaMobileAlt, FaCloud, FaChartLine } from "react-icons/fa";
import SkillCard from "@/components/Skill/SkillCard";
import prisma from "@/lib/prisma";

type Tag = {
  id: number;
  name: string;
};

const iconMap = {
  "fa-code": FaCode,
  "fa-server": FaServer,
  "fa-paint-brush": FaPaintBrush,
  "fa-mobile-alt": FaMobileAlt,
  "fa-cloud": FaCloud,
  "fa-chart-line": FaChartLine,
} as const;

type IconKey = keyof typeof iconMap;

type Competence = {
  id: number;
  title: string;
  description: string;
  icon: IconKey;
  color: string;
  tagColor: string;
  tags: Tag[];
};

export default async function SkillsSection() {
  const skillsFromDb = await prisma.competence.findMany({
    include: { tags: true },
  });

  const skills: Competence[] = skillsFromDb.map((skill) => {
    const iconKey = skill.icon as IconKey;
    if (!(iconKey in iconMap)) {
      throw new Error(`Icône inconnue : ${skill.icon}`);
    }
    return {
      id: skill.id,
      title: skill.title,
      description: skill.description,
      icon: iconKey,
      color: skill.color,
      tagColor: skill.tagColor,
      tags: skill.tags,
    };
  });

  return (
    <section id="skills" className="py-20 bg-slate-900">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Mes{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            compétences
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill) => (
            <SkillCard
              key={skill.id}
              color={skill.color}
              icon={skill.icon} // on passe la clé, pas le composant React
              title={skill.title}
              description={skill.description}
              tags={skill.tags.map((t) => t.name)}
              tagColor={skill.tagColor}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
