import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";

const socialPlatformSchema = z.object({
  name: z.string().min(1),
  icon: z.string().min(1),
  color: z.string().min(1),
  url: z.string().url(),
});

// GET all
export async function GET() {
  try {
    const platforms = await prisma.socialPlatform.findMany();
    return NextResponse.json(platforms);
  } catch {
    return NextResponse.json({ error: "Erreur lors du chargement" }, { status: 500 });
  }
}

// POST create
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = socialPlatformSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.format() }, { status: 400 });
    }

    const newPlatform = await prisma.socialPlatform.create({
      data: parsed.data,
    });

    return NextResponse.json(newPlatform, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Erreur lors de la création" }, { status: 500 });
  }
}
