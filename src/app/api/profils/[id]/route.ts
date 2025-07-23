import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface Skill {
  title: string;
  description: string;
  color: string;
  svgPath: string;
}

interface Profile {
  imagePath: string;
  experience: string;
  description: string;
}

interface HeroUpdateData {
  name: string;
  title: string;
  subtitle: string;
  description: string;
  profile: Profile;
  skills: Skill[];
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  if (isNaN(id)) return NextResponse.json({ error: "ID invalide" }, { status: 400 });

  try {
    const hero = await prisma.hero.findUnique({
      where: { id },
      include: {
        profile: true,
        skills: true,
      },
    });

    if (!hero) {
      return NextResponse.json({ error: "Profil non trouvé" }, { status: 404 });
    }

    return NextResponse.json(hero);
  } catch (error) {
    console.error("Erreur GET profil :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  if (isNaN(id)) return NextResponse.json({ error: "ID invalide" }, { status: 400 });

  try {
    const {
      name,
      title,
      subtitle,
      description,
      profile,
      skills,
    } = (await req.json()) as HeroUpdateData;

    // Mise à jour du Hero
    const updatedHero = await prisma.hero.update({
      where: { id },
      data: {
        name,
        title,
        subtitle,
        description,
        profile: {
          update: {
            imagePath: profile.imagePath,
            experience: profile.experience,
            description: profile.description,
          },
        },
        skills: {
          deleteMany: {}, // supprime tous les skills existants liés au hero
          create: skills.map((skill) => ({
            title: skill.title,
            description: skill.description,
            color: skill.color,
            svgPath: skill.svgPath,
          })),
        },
      },
      include: {
        profile: true,
        skills: true,
      },
    });

    return NextResponse.json(updatedHero);
  } catch (error) {
    console.error("Erreur PUT profil :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// DELETE: Supprimer un Hero + Profile + Skills
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  if (isNaN(id)) return NextResponse.json({ error: "ID invalide" }, { status: 400 });

  try {
    const hero = await prisma.hero.findUnique({
      where: { id },
    });

    if (!hero) {
      return NextResponse.json({ error: "Héros non trouvé" }, { status: 404 });
    }

    await prisma.skill.deleteMany({ where: { heroId: id } });
    await prisma.hero.delete({ where: { id } });

    if (hero.profileId) {
      await prisma.profile.delete({ where: { id: hero.profileId } });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur DELETE profil :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
