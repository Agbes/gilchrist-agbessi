import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";

const contactInfoSchema = z.object({
  type: z.string().min(1),
  label: z.string().min(1),
  value: z.string().min(1),
  icon: z.string().min(1),
  color: z.string().min(1),
});

export async function GET() {
  try {
    const infos = await prisma.contactInfo.findMany();
    return NextResponse.json(infos);
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = contactInfoSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.format() }, { status: 400 });
    }

    const newInfo = await prisma.contactInfo.create({
      data: parsed.data,
    });

    return NextResponse.json(newInfo, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
