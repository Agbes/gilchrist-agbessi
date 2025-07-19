import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export async function saveUploadedFiles(files: File | File[]): Promise<string[]> {
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadDir, { recursive: true });

  const fileArray = Array.isArray(files) ? files : [files];
  const savedPaths: string[] = [];

  for (const file of fileArray) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const ext = file.name.split(".").pop();
    const filename = `${Date.now()}-${uuidv4()}.${ext}`;
    const filePath = path.join(uploadDir, filename);
    await writeFile(filePath, buffer);
    savedPaths.push(`/uploads/${filename}`);
  }

  return savedPaths;
}
