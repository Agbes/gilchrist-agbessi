import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { experienceSchema, idSchema } from "@/lib/validation/articleSchema";

export async function GET(_: NextRequest, context: { params: Promise<{ id: string }> }) {
  const params = await context.params;

  // Valider id
  const idParsed = idSchema.safeParse(params);
  if (!idParsed.success) {
    return NextResponse.json(
      { error: idParsed.error.issues[0].message },
      { status: 400 }
    );
  }

  try {
    const experience = await prisma.experience.findUnique({
      where: { id: Number(params.id) },
      include: { services: true },
    });

    if (!experience) {
      return NextResponse.json({ error: "Expérience non trouvée" }, { status: 404 });
    }

    return NextResponse.json({
      ...experience,
      serviceNames: experience.services.map((s) => s.name),
    });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, context: { params: Promise<{ id: string }> }) {
  const params = await context.params;

  // Valider id
  const idParsed = idSchema.safeParse(params);
  if (!idParsed.success) {
    return NextResponse.json({ error: idParsed.error.issues[0].message }, { status: 400 });
  }

  try {
    const experience = await prisma.experience.findUnique({
      where: { id: Number(params.id) },
    });

    if (!experience) {
      return NextResponse.json({ error: "Expérience non trouvée" }, { status: 404 });
    }

    await prisma.experience.delete({
      where: { id: Number(params.id) },
    });

    return NextResponse.json({ message: "Expérience supprimée avec succès" });
  } catch (error: unknown) {
    console.error("Erreur suppression :", error);

    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code?: string }).code === "P2003"
    ) {
      return NextResponse.json(
        { error: "Impossible de supprimer : dépendances liées." },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: "Erreur lors de la suppression" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const params = await context.params;

  // Valider id
  const idParsed = idSchema.safeParse(params);
  if (!idParsed.success) {
    return NextResponse.json({ error: idParsed.error.issues[0].message }, { status: 400 });
  }

  try {
    const formData = await req.formData();

    const rawData = {
      name: formData.get("name"),
      periode: formData.get("periode"),
      description: formData.get("description"),
      lieu: formData.get("lieu"),
      services: formData.get("services") || "",
    };

    // Valider données (hors image)
    const parseResult = experienceSchema.safeParse(rawData);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: parseResult.error.issues.map((e) => e.message).join(", ") },
        { status: 400 }
      );
    }

    const servicesArray = parseResult.data.services
      .toString()
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter((s) => s.length > 0);

    const updatedExperience = await prisma.experience.update({
      where: { id: Number(params.id) },
      data: {
        name: parseResult.data.name,
        periode: parseResult.data.periode,
        description: parseResult.data.description,
        lieu: parseResult.data.lieu,
        services: {
          set: [],
          connectOrCreate: servicesArray.map((name) => ({
            where: { name },
            create: { name },
          })),
        },
      },
      include: { services: true },
    });

    return NextResponse.json(updatedExperience);
  } catch (error) {
    console.error("Erreur modification :", error);
    return NextResponse.json({ error: "Erreur lors de la mise à jour" }, { status: 500 });
  }
}
