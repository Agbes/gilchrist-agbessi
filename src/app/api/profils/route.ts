import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { heroInputSchema } from "@/lib/validation/articleSchema";

// GET: Tous les profils (résumé)
export async function GET() {
  try {
    const heroes = await prisma.hero.findMany({
      include: { profile: true },
    });

    const profils = heroes.map((hero) => ({
      id: hero.id,
      name: hero.name,
      title: hero.title,
      description: hero.description,
    }));

    return NextResponse.json(profils);
  } catch (error) {
    console.error("Erreur GET profils :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// POST: Créer un nouveau Hero complet
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // ✅ Validation avec Zod
    const result = heroInputSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: "Champs invalides", details: result.error.issues }, { status: 400 });
    }

    const { name, title, subtitle, description, profile, skills } = result.data;

    const newHero = await prisma.hero.create({
      data: {
        name,
        title,
        subtitle,
        description,
        profile: {
          create: {
            imagePath: profile.imagePath,
            experience: parseInt(profile.experience),
            description: profile.description,
          },
        },
        skills: {
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

    return NextResponse.json({ success: true, hero: newHero }, { status: 201 });
  } catch (error) {
    console.error("Erreur POST profil :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
