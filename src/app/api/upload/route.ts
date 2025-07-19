import { NextResponse } from "next/server";
import { saveUploadedFiles } from "@/lib/saveUploadedFiles";

export async function POST(req: Request) {
  try {
    const data = await req.formData();
    const file = data.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "Aucun fichier fourni" }, { status: 400 });
    }

    const [imagePath] = await saveUploadedFiles(file);

    return NextResponse.json({ imagePath });
  } catch (err) {
    console.error("Erreur upload :", err);
    return NextResponse.json({ error: "Erreur lors de l'upload" }, { status: 500 });
  }
}
