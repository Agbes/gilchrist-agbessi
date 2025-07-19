import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const articlesCount = await prisma.article.count();
    const messagesCount = await prisma.message.count();

    return NextResponse.json({
      articlesCount,
      messagesCount,
    });
  } catch (error) {
    console.error("Erreur API stats:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des statistiques" },
      { status: 500 }
    );
  }
}
