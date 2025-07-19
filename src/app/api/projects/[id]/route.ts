import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { updateProjectSchema } from "@/lib/validation/articleSchema";


export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (isNaN(id)) return NextResponse.json({ error: "ID invalide" }, { status: 400 });

  try {
    const project = await prisma.project.findUnique({
      where: { id },
      include: { technologies: true },
    });

    if (!project) return NextResponse.json({ error: "Projet non trouvé" }, { status: 404 });

    return NextResponse.json({
      ...project,
      technologyNames: project.technologies.map((t) => t.name),
    });
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}


export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (isNaN(id)) return NextResponse.json({ error: "ID invalide" }, { status: 400 });

  try {
    const formData = await req.formData();

    const rawData = {
      name: formData.get("name"),
      nature: formData.get("nature"),
      description: formData.get("description"),
      imageUrl: formData.get("imageUrl") ?? undefined,
      technologies: formData.get("technologies")?.toString().split(",").map(t => t.trim()) || [],
    };

    // Valider les données
    const parseResult = updateProjectSchema.safeParse(rawData);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: parseResult.error.errors.map(e => e.message).join(", ") },
        { status: 400 }
      );
    }

    // Construire les technologies pour Prisma
    const techArray = parseResult.data.technologies.map(name => name.toLowerCase());

    const project = await prisma.project.update({
      where: { id },
      data: {
        name: parseResult.data.name,
        nature: parseResult.data.nature,
        description: parseResult.data.description,
        imageUrl: parseResult.data.imageUrl, // si mise à jour
        technologies: {
          set: [],
          connectOrCreate: techArray.map(name => ({
            where: { name },
            create: { name },
          })),
        },
      },
      include: { technologies: true },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error("Erreur mise à jour projet :", error);
    return NextResponse.json({ error: "Erreur mise à jour" }, { status: 500 });
  }
}


export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (isNaN(id)) return NextResponse.json({ error: "ID invalide" }, { status: 400 });

  try {
    await prisma.project.delete({ where: { id } });
    return NextResponse.json({ message: "Projet supprimé avec succès" });
  } catch (error: any) {
    console.error("Erreur suppression projet :", error);
    return NextResponse.json({ error: "Erreur suppression" }, { status: 500 });
  }
}
