// components/ProjectSection.tsx
import ProjectCard from "./ProjectCard";
import prisma from "@/lib/prisma"; // 🔁 adapter le chemin selon ton projet

export default async function ProjectSection() {
  const projects = await prisma.project.findMany({
    include: {
      technologies: true, // pour récupérer les noms (si tu les utilises)
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <section id="projects" className="py-20 bg-slate-800">
      <div className="container mx-auto px-6 max-w-7xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Mes{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            projets
          </span>
        </h2>

        <div className="flex flex-wrap justify-center gap-6">
          {projects.map((project) => (
            <div key={project.id} className="flex-[1_1_300px] max-w-[360px]">
              <ProjectCard
                name={project.name}
                nature={project.nature}
                description={project.description}
                imageUrl={project.imageUrl}
                language={project.technologies.map((t) => t.name)} // ou autre champ
              />
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <a
            href="#"
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full hover:opacity-90 transition-opacity"
          >
            Voir tous mes projets
          </a>
        </div>
      </div>
    </section>
  );
}
