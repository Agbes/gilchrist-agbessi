import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";

// Validation Zod pour l'id dans params
const paramsSchema = z.object({
  id: z.string().regex(/^\d+$/, "ID invalide"),
});

// Validation Zod pour la mise à jour POST/PUT
const competenceSchema = z.object({
  title: z.string().min(1, "Titre requis"),
  description: z.string().min(1, "Description requise"),
  icon: z.string().min(1, "Icône requise"),
  color: z.string().min(1, "Couleur requise"),
  tagColor: z.string().min(1, "Couleur d'étiquette requise"),
  tags: z.array(z.string().min(1, "Nom de tag requis")),
});

export async function DELETE(
  _: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const parsedParams = paramsSchema.parse({ id });
    const competenceId = parseInt(parsedParams.id);

    // Supprime les tags liés à cette compétence
    await prisma.tagCompetence.deleteMany({
      where: { competenceId },
    });

    // Supprime la compétence
    await prisma.competence.delete({
      where: { id: competenceId },
    });

    return NextResponse.json({ message: "Compétence supprimée avec succès." });
  } catch (error) {
    console.error("Erreur suppression compétence:", error);
    return NextResponse.json({ message: "Erreur lors de la suppression" }, { status: 500 });
  }
}

export async function GET(
  _: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const parsedParams = paramsSchema.parse({ id });
    const competenceId = parseInt(parsedParams.id);

    const competence = await prisma.competence.findUnique({
      where: { id: competenceId },
      include: { tags: true },
    });

    if (!competence) {
      return NextResponse.json({ message: "Compétence non trouvée" }, { status: 404 });
    }

    return NextResponse.json(competence);
  } catch (error) {
    console.error("Erreur récupération compétence:", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const parsedParams = paramsSchema.parse({ id });
    const competenceId = parseInt(parsedParams.id);

    const body = await req.json();
    const data = competenceSchema.parse(body);

    // Supprime tous les anciens tags puis recrée
    const updatedCompetence = await prisma.competence.update({
      where: { id: competenceId },
      data: {
        title: data.title,
        description: data.description,
        icon: data.icon,
        color: data.color,
        tagColor: data.tagColor,
        tags: {
          deleteMany: {},
          create: data.tags.map((name) => ({ name })),
        },
      },
      include: {
        tags: true,
      },
    });

    return NextResponse.json(updatedCompetence);
  } catch (error) {
    console.error("Erreur mise à jour compétence:", error);
    return NextResponse.json({ message: "Erreur lors de la mise à jour" }, { status: 500 });
  }
}
