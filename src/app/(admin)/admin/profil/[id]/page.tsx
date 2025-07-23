import ProfilView from "@/components/Admin/Hero/ProfilDetails";
import prisma from "@/lib/prisma";

type Params = {
  params: {
    id: string;
  };
};

export default async function ProfilPage({ params }: Params) {
  const { id } = params;

  const hero = await prisma.hero.findUnique({
    where: { id: Number(id) },
    include: {
      profile: true,
      skills: true,
    },
  });

  if (!hero) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center text-red-600">
        Profil non trouvé pour l&apos;id : <strong>{id}</strong>
      </div>
    );
  }

  const profil = {
    name: hero.name,
    title: hero.title,
    subtitle: hero.subtitle,
    description: hero.description,
    profile: {
      imagePath: hero.profile?.imagePath ?? "",
      experience: hero.profile?.experience ?? 0,
      description: hero.profile?.description ?? "",
    },
    skills: hero.skills.map((skill) => ({
      title: skill.title,
      description: skill.description,
      color: skill.color,
      svgPath: skill.svgPath,
    })),
  };

  return <ProfilView profil={profil} />;
}
