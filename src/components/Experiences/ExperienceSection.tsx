import prisma from "@/lib/prisma";
import ExperienceCard from "./ExperienceCard";

export default async function ExperienceSection() {
  const experiences = await prisma.experience.findMany({
    include: { services: true },
    orderBy: { id: "asc" }, // si tu veux un ordre
  });

  return (
    <section id="experience" className="py-20 bg-slate-900 relative">
      <div className="container mx-auto px-6 max-w-5xl relative">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Mon{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            expérience
          </span>
        </h2>

        <div className="hidden md:block absolute left-1/2 top-32 h-[calc(100%-8rem)] w-1 bg-slate-600 -translate-x-1/2 z-0" />

        <div className="relative z-10 space-y-16">
          {experiences.map((exp, index) => {
            const isLeft = index % 2 === 0;

            return (
              <div
                key={exp.id}
                className={`w-full md:w-1/2 ${
                  isLeft
                    ? "md:pr-8 md:ml-0 md:mr-auto text-right"
                    : "md:pl-8 md:ml-auto md:mr-0 text-left"
                }`}
                data-aos={isLeft ? "fade-right" : "fade-left"}
              >
                <ExperienceCard
                  name={exp.name}
                  periode={exp.periode}
                  description={exp.description}
                  lieu={exp.lieu}
                  iconType={exp.iconType as "fullstack" | "ingénieur" | "manager"}
                  services={exp.services.map((s) => s.name)}
                  align={isLeft ? "right" : "left"}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
