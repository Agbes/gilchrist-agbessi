// app/admin/articles/[slug]/page.tsx

import EditArticleClient from "@/components/Admin/Articles/EditArticleClient";
import prisma from "@/lib/prisma";
export default async function Page({ params }: { params: { slug: string } }) {
  const topics = await prisma.topic.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Modifier un article</h1>
      <EditArticleClient slug={params.slug} topics={topics} />
    </div>
  );
}
