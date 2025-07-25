import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import type { Role } from "@prisma/client";

async function main() {
  const pers: {
    email: string;
    password: string;
    role: Role;
    name: string;
  }[] = [
    {
      email: "gilchristagbessi92@gmail.com",
      password: await bcrypt.hash("AGBE1997agbe@", 10),
      role: "ADMIN",
      name: "AGBESSI",
    },
    {
      email: "agbessiofficiel@gmail.com",
      password: await bcrypt.hash("AGBE1997agbe@", 10),
      role: "USER",
      name: "Gilchrist",
    },
  ];

  for (const person of pers) {
    const admin = await prisma.user.upsert({
      where: { email: person.email },
      update: {},
      create: {
        email: person.email,
        password: person.password,
        role: person.role,
        name: person.name,
      },
    });

    console.log("✅ Admin créé :", admin);
  }
}

main().catch((e) => {
  console.error("❌ Erreur : ", e);
  process.exit(1);
});
