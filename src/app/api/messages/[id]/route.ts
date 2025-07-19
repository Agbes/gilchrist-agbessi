import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type Params = { params: { id: string } };

export async function DELETE(_: NextRequest, { params }: Params) {
  try {
    await prisma.message.delete({
      where: { id: Number(params.id) },
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur suppression" }, { status: 500 });
  }
}
