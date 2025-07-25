import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";

// 🔐 Schéma Zod
const contactSchema = z.object({
  name: z.string().min(2, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  subject: z.string().min(2, "Le sujet est requis"),
  message: z.string().min(10, "Le message est trop court"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 🧪 Validation des données avec Zod
    const parsed = contactSchema.parse(body); // Lève une exception si invalide

    // ✅ Insertion en base
    const newMessage = await prisma.message.create({
      data: parsed,
    });

    return NextResponse.json(newMessage, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      // 🛑 Erreurs de validation
      const message = error.issues.map((e) => e.message).join(" / ");
      return NextResponse.json({ error: message }, { status: 400 });
    }

    console.error("Erreur création message :", error);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
