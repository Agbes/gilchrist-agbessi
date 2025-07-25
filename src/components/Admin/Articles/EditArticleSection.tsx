import prisma from "@/lib/prisma";
import EditArticleClient from "./EditArticleClient";

type EditArticleSectionProps = {
  slug: string;
};

export default async function EditArticleSection({ slug }: EditArticleSectionProps) {
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
