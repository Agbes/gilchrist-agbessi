import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { saveUploadedFiles } from "@/lib/saveUploadedFiles";
import { z } from "zod";

// Schéma de validation
const createProjectSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  nature: z.string().min(1, "La nature est requise"),
  description: z.string().min(1, "La description est requise"),
  technologies: z.string().optional(),
});

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      include: { technologies: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la récupération des projets" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name = formData.get("name");
    const nature = formData.get("nature");
    const description = formData.get("description");
    const rawTechnos = formData.get("technologies");
    const files = formData.getAll("image") as File[];

    // Validation Zod partielle (sans image)
    const parseResult = createProjectSchema.safeParse({
      name,
      nature,
      description,
      technologies: rawTechnos ? String(rawTechnos) : undefined,
    });

    if (!parseResult.success) {
      return NextResponse.json(
        { error: parseResult.error.errors.map((e) => e.message).join(", ") },
        { status: 400 }
      );
    }

    if (files.length === 0) {
      return NextResponse.json({ error: "Image obligatoire" }, { status: 400 });
    }

    const imageUrls = await saveUploadedFiles(files);
    const imageUrl = imageUrls[0];

    const techArray = rawTechnos
      ? String(rawTechnos)
          .split(",")
          .map((t) => t.trim().toLowerCase())
          .filter((t) => t.length > 0)
      : [];

    const project = await prisma.project.create({
      data: {
        name: parseResult.data.name,
        nature: parseResult.data.nature,
        description: parseResult.data.description,
        imageUrl,
        technologies: {
          connectOrCreate: techArray.map((name) => ({
            where: { name },
            create: { name },
          })),
        },
      },
      include: { technologies: true },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("Erreur création projet :", error);
    return NextResponse.json(
      { error: "Erreur lors de la création du projet" },
      { status: 500 }
    );
  }
}
