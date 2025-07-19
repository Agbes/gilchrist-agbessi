// app/api/hero/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const hero = await prisma.hero.findFirst({
      include: {
        profile: true,
        skills: true,
      },
    });

    if (!hero) {
      return NextResponse.json({ error: "Aucun hero trouvé" }, { status: 404 });
    }

    return NextResponse.json(hero);
  } catch (error) {
    console.error("Erreur API /api/hero :", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de la récupération du hero" },
      { status: 500 }
    );
  }
}
