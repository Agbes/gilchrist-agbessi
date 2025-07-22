import prisma from "@/lib/prisma";

async function main() {
  await prisma.account.deleteMany(); // d'abord supprimer les relations
  await prisma.session.deleteMany(); // idem
  await prisma.user.deleteMany(); // ensuite supprimer les utilisateurs
  console.log("✅ Tous les utilisateurs ont été supprimés.");
}

main().catch((e) => {
  console.error("Erreur :", e);
  process.exit(1);
});
