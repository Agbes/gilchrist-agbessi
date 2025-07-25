import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type Params = { params: Promise<{ id: string }> };

export async function DELETE(_: NextRequest, props: Params) {
  const params = await props.params;
  try {
    await prisma.message.delete({
      where: { id: Number(params.id) },
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur suppression" }, { status: 500 });
  }
}
