import { Actions } from "./Actions";
import { ProfilePhoto } from "./ProfilePhoto";
import { SkillsList } from "./SkillsList";
import prisma from "@/lib/prisma";

export default async function AboutSection() {
  const hero = await prisma.hero.findFirst({
    include: {
      profile: true,
      skills: true,
    },
  });

  if (!hero || !hero.profile) return null;

  return (
    <section id="about" className="py-20 px-20 mx-auto bg-slate-800">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          À <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">propos</span> de moi
        </h2>

        <div className="flex flex-col lg:flex-row items-center">
          <ProfilePhoto
            imagePath={hero.profile.imagePath}
            experience={hero.profile.experience}
          />
          <div className="lg:w-2/3 lg:pl-16">
            <h3 className="text-2xl font-semibold mb-4">{hero.title}</h3>
            <p className="text-slate-300 mb-6">{hero.profile.description}</p>
            <SkillsList skills={hero.skills} />
            <Actions />
          </div>
        </div>
      </div>
    </section>
  );
}
