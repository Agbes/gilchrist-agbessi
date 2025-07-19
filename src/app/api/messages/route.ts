import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const messages = await prisma.message.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(messages);
  } catch {
    return NextResponse.json({ error: "Erreur chargement messages" }, { status: 500 });
  }
}
