import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Déconnecté avec succès" });

  // Supprimer le cookie "token"
  response.cookies.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(0),
    path: "/",
  });

  return response;
}
