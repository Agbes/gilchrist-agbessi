import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";

// Schéma Zod pour la création d'une compétence
const competenceSchema = z.object({
  title: z.string().min(1, "Titre requis"),
  description: z.string().min(1, "Description requise"),
  icon: z.string().min(1, "Icône requise"),
  color: z.string().min(1, "Couleur requise"),
  tagColor: z.string().min(1, "Couleur d'étiquette requise"),
  tags: z.array(z.string().min(1, "Nom de tag requis")),
});

// GET: Récupérer toutes les compétences avec leurs tags, triées par date de création décroissante
export async function GET() {
  try {
    const competences = await prisma.competence.findMany({
      include: { tags: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(competences);
  } catch (error) {
    console.error("Erreur récupération compétences :", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}

// POST: Créer une nouvelle compétence avec ses tags
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validation des données reçues
    const data = competenceSchema.parse(body);

    const newCompetence = await prisma.competence.create({
      data: {
        title: data.title,
        description: data.description,
        icon: data.icon,
        color: data.color,
        tagColor: data.tagColor,
        tags: {
          create: data.tags.map((name) => ({ name })),
        },
      },
      include: { tags: true },
    });

    return NextResponse.json(newCompetence, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Données invalides", issues: error.errors }, { status: 400 });
    }
    console.error("Erreur création compétence :", error);
    return NextResponse.json({ message: "Erreur création compétence" }, { status: 500 });
  }
}
