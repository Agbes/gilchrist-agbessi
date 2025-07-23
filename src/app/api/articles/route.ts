import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { saveUploadedFiles } from "@/lib/saveUploadedFiles";
import { articleBodySchema } from "@/lib/validation/articleSchema";

// GET: récupérer tous les articles
export async function GET() {
  try {
    const articles = await prisma.article.findMany({
      include: { images: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(articles);
  } catch {
    return NextResponse.json(
      { error: "Erreur lors de la récupération des articles" },
      { status: 500 }
    );
  }
}

// POST: créer un article
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const parsed = articleBodySchema.safeParse({
      title: formData.get("title"),
      description: formData.get("description"),
      topicId: formData.get("topicId"),
      date: formData.get("date"),
      readTime: formData.get("readTime"),
      tags: formData.get("tags"),
    });

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Données invalides", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { title, description, topicId, date, readTime, tags } = parsed.data;

    const tagsArray = tags
      ?.split(",")
      .map((tag) => tag.trim().toLowerCase())
      .filter((tag) => tag.length > 0) || [];

    const files = formData.getAll("images") as File[];
    const savedImageUrls = await saveUploadedFiles(files);

    const slug = title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

    const article = await prisma.article.create({
      data: {
        title,
        slug,
        description,
        date: date ? new Date(date) : new Date(),
        readTime: readTime || "1 min",
        topic: {
          connect: {
            id: Number(topicId),
          },
        },
        images: {
          create: savedImageUrls.map((url) => ({ url })),
        },
        tags: {
          connectOrCreate: tagsArray.map((name) => ({
            where: { name },
            create: { name },
          })),
        },
      },
      include: {
        images: true,
        tags: true,
      },
    });

    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    console.error("Erreur POST article:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
