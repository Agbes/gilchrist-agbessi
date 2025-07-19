// app/api/topics/route.ts
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: Request) {
  const { name } = await req.json();

  if (!name) {
    return NextResponse.json({ message: "Le nom est requis" }, { status: 400 });
  }

  try {
    const existing = await prisma.topic.findUnique({ where: { name } });
    if (existing) {
      return NextResponse.json({ message: "Ce topic existe déjà" }, { status: 400 });
    }

    const topic = await prisma.topic.create({
      data: { name },
    });

    return NextResponse.json(topic, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Erreur interne" }, { status: 500 });
  }
}



export async function GET(req: NextRequest) {
  try {
    const topics = await prisma.topic.findMany({
      orderBy: { name: "asc" },
    });
    return NextResponse.json(topics);
  } catch (error) {
    console.error("Erreur récupération topics:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des thèmes" },
      { status: 500 }
    );
  }
}

