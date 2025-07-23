import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";

const socialPlatformSchema = z.object({
  name: z.string().min(1),
  icon: z.string().min(1),
  color: z.string().min(1),
  url: z.string().url(),
});

interface Params {
  params: { id: string };
}

// GET by ID
export async function GET(_: NextRequest, { params }: Params) {
  const id = parseInt(params.id);
  if (isNaN(id)) return NextResponse.json({ error: "ID invalide" }, { status: 400 });

  try {
    const platform = await prisma.socialPlatform.findUnique({ where: { id } });
    if (!platform) return NextResponse.json({ error: "Non trouvé" }, { status: 404 });
    return NextResponse.json(platform);
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}


export async function PUT(request: NextRequest, context: Params) {
  // Await sur params
  const params = await context.params;
  const id = parseInt(params?.id ?? "");

  if (isNaN(id)) {
    return NextResponse.json({ error: "ID invalide" }, { status: 400 });
  }

  try {
    const body = await request.json();

    const parsed = socialPlatformSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.format() }, { status: 400 });
    }

    const updated = await prisma.socialPlatform.update({
      where: { id },
      data: parsed.data,
    });

    return NextResponse.json(updated);
  } catch{
    return NextResponse.json({ error: "Erreur lors de la mise à jour" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);

  if (isNaN(id)) {
    return NextResponse.json({ error: "ID invalide" }, { status: 400 });
  }

  try {
    await prisma.socialPlatform.delete({ where: { id } });
    return new NextResponse(null, { status: 204 });
  } catch {
    return NextResponse.json({ error: "Erreur lors de la suppression" }, { status: 500 });
  }
}