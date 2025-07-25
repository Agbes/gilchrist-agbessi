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

type Params = {
params: Promise<{ id: string }>
};

export async function GET(req: NextRequest, { params }: Params) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const idInt = parseInt(id);
  if (isNaN(idInt)) return NextResponse.json({ error: "ID invalide" }, { status: 400 });

  try {
    const info = await prisma.contactInfo.findUnique({ where: { id : idInt } });
    if (!info) return NextResponse.json({ error: "Non trouvé" }, { status: 404 });

    return NextResponse.json(info);
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: Params) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const idInt = parseInt(id);

  if (isNaN(idInt)) return NextResponse.json({ error: "ID invalide" }, { status: 400 });

  try {
    const body = await req.json();
    const parsed = contactInfoSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const updated = await prisma.contactInfo.update({
      where: { id : idInt },
      data: parsed.data,
    });

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Erreur lors de la mise à jour" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const idInt = parseInt(id);

  if (isNaN(idInt)) return NextResponse.json({ error: "ID invalide" }, { status: 400 });

  try {
    await prisma.contactInfo.delete({ where: { id : idInt } });
    return new NextResponse(null, { status: 204 });
  } catch {
    return NextResponse.json({ error: "Erreur lors de la suppression" }, { status: 500 });
  }
}
