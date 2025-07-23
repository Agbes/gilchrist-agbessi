import EditArticleClient from "@/components/Admin/Articles/EditArticleClient";
import prisma from "@/lib/prisma";


type PageProps = {
  params: {
    slug: string;
  };
};

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const topics = await prisma.topic.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Modifier un article</h1>
      <EditArticleClient slug={slug} topics={topics} />
    </div>
  );
}
