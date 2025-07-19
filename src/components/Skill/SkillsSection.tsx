import SkillCard from "@/components/Skill/SkillCard";
import prisma from "@/lib/prisma";

type Tag = {
  id: number;
  name: string;
};

type Competence = {
  id: number;
  title: string;
  description: string;
  icon: keyof typeof iconMap; // correspond aux clés de iconMap
  color: string;
  tagColor: string;
  tags: Tag[];
};

// Pour bien typer iconMap ici, on peut le réexporter aussi depuis SkillCard, ou redéfinir :

const iconMap = {
  'fa-code': 'fa-code',
  'fa-server': 'fa-server',
  'fa-paint-brush': 'fa-paint-brush',
  'fa-mobile-alt': 'fa-mobile-alt',
  'fa-cloud': 'fa-cloud',
  'fa-chart-line': 'fa-chart-line',
} as const;

export default async function SkillsSection() {
  const skills: Competence[] = await prisma.competence.findMany({
    include: { tags: true },
  });

  return (
    <section id="skills" className="py-20 bg-slate-900">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Mes{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            compétences
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill) => {
            console.log('Compétences récupérées:', skill.id, skill.icon);

            return (
              <SkillCard
                key={skill.id}
                color={skill.color}
                icon={skill.icon as keyof typeof iconMap}
                title={skill.title}
                description={skill.description}
                tags={skill.tags.map((t) => t.name)}
                tagColor={skill.tagColor}
              />
            );
          })}

        </div>
      </div>
    </section>
  );
}
