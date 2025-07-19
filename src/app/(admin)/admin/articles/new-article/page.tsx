// app/admin/articles/new/page.tsx

import AddArticleClient from "@/components/Admin/Articles/AddArticleClient";
import prisma from "@/lib/prisma";

export default async function Page() {
  const topics = await prisma.topic.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Créer un article</h1>
      <AddArticleClient topics={topics} />
    </div>
  );
}
