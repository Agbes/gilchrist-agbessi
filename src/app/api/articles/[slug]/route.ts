import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { articleBodySchema } from "@/lib/validation/articleSchema";

export async function GET(_: NextRequest, context: { params: Promise<{ slug: string }> }) {
  const { slug } = (await context.params);

  if (!slug) {
    return NextResponse.json({ error: "Slug manquant" }, { status: 400 });
  }

  try {
    const article = await prisma.article.findUnique({
      where: { slug },
      include: {
        images: true,
        topic: true,
        tags: true,
      },
    });

    if (!article) {
      return NextResponse.json({ error: "Article non trouvé" }, { status: 404 });
    }

    return NextResponse.json({
      ...article,
      topicId: article.topicId,
      tags: article.tags?.map((t) => t.name),
    });
  } catch (err) {
    console.error("Erreur GET /api/articles/[slug]:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, context: { params: Promise<{ slug: string }> }) {
  const { slug } = (await context.params);

  try {
    const article = await prisma.article.findUnique({
      where: { slug },
    });

    if (!article) {
      return NextResponse.json({ error: "Article non trouvé" }, { status: 404 });
    }

    await prisma.articleImage.deleteMany({ where: { articleId: article.id } });
    await prisma.article.delete({ where: { slug } });

    return NextResponse.json({ message: "Article supprimé avec succès" });
  } catch (error: unknown) {
    console.error("Erreur suppression article :", error);

    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code?: string }).code === "P2003"
    ) {
      return NextResponse.json(
        { error: "Impossible de supprimer l’article car il est référencé ailleurs." },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: "Erreur lors de la suppression" }, { status: 500 });
  }

}

export async function PATCH(req: NextRequest, context: { params: Promise<{ slug: string }> }) {
  const { slug } = (await context.params);

  try {
    const json = await req.json();

    const parsed = articleBodySchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Données invalides", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { title, description, topicId, readTime, date } = parsed.data;

    const article = await prisma.article.update({
      where: { slug },
      data: {
        title,
        description,
        readTime,
        date: date ? new Date(date) : undefined,
        topic: {
          connect: { id: Number(topicId) },
        },
      },
    });

    return NextResponse.json(article);
  } catch (error) {
    console.error("Erreur PATCH article:", error);
    return NextResponse.json({ error: "Erreur lors de la mise à jour" }, { status: 500 });
  }
}
