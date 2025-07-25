import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { saveUploadedFiles } from "@/lib/saveUploadedFiles";
import { experienceSchema } from "@/lib/validation/articleSchema";

export async function GET() {
  try {
    const experiences = await prisma.experience.findMany({
      include: {
        services: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(experiences);
  } catch {
    return NextResponse.json(
      { error: "Erreur lors de la récupération des expériences" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const rawData = {
      name: formData.get("name"),
      periode: formData.get("periode"),
      description: formData.get("description"),
      lieu: formData.get("lieu"),
      services: formData.get("services") || "",
    };

    const parseResult = experienceSchema.safeParse(rawData);
    if (!parseResult.success) {
      return NextResponse.json(
        {
          error: parseResult.error.issues.map((e) => e.message).join(", "),
        },
        { status: 400 }
      );
    }

    const files = formData.getAll("image") as File[];
    if (files.length === 0) {
      return NextResponse.json({ error: "Image obligatoire" }, { status: 400 });
    }

    const servicesArray = parseResult.data.services
      .toString()
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter((s) => s.length > 0);

    const savedImageUrls = await saveUploadedFiles(files);

    const experience = await prisma.experience.create({
      data: {
        name: parseResult.data.name,
        periode: parseResult.data.periode,
        description: parseResult.data.description,
        lieu: parseResult.data.lieu,
        imageUrl: savedImageUrls[0],
        services: {
          connectOrCreate: servicesArray.map((name) => ({
            where: { name },
            create: { name },
          })),
        },
      },
      include: {
        services: true,
      },
    });

    return NextResponse.json(experience, { status: 201 });
  } catch (error) {
    console.error("Erreur création expérience :", error);
    return NextResponse.json(
      { error: "Erreur lors de la création de l'expérience" },
      { status: 500 }
    );
  }
}
