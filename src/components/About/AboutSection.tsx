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
    <section id="about" className="py-16 px-4 sm:px-6 md:px-12 lg:px-20 bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          À{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            propos
          </span>{" "}
          de moi
        </h2>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-10">
          <div className="w-full max-w-xs sm:max-w-sm lg:max-w-md">
            <ProfilePhoto
              imagePath={hero.profile.imagePath}
              experience={hero.profile.experience}
            />
          </div>

          <div className="w-full lg:w-2/3 lg:pl-16 text-center lg:text-left space-y-6 md:px-4">
            <h3 className="text-2xl font-semibold">{hero.title}</h3>
            <p className="text-slate-300">{hero.profile.description}</p>
            <SkillsList skills={hero.skills} />
            <Actions />
          </div>
        </div>
      </div>
    </section>
  );
}
