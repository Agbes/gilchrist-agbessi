import ArticleView from "@/components/Admin/ViewArticle/ArticleView";
import prisma from "@/lib/prisma";

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ArticlePage(props: Params) {
  const params = await props.params;
  const { slug } = params;

  const articleFromDb = await prisma.article.findUnique({
    where: { slug },
    include: { topic: true,images: true },
  });

  if (!articleFromDb) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center text-red-600">
        Article non trouvé pour le slug : <strong>{slug}</strong>
      </div>
    );
  }

  const images = articleFromDb.images.map((img) => img.url);

  const article = {
    title: articleFromDb.title,
    description: articleFromDb.description,
    topic: articleFromDb.topic.name,
    date: articleFromDb.date.toISOString(),
    readTime: articleFromDb.readTime,
    images,
  };

  return <ArticleView article={article} />;
}
