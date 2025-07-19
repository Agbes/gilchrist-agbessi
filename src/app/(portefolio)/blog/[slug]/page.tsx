import ArticleContent from "@/components/Blog/ViewArticle/ArticleContent";
import SidebarMoreArticles from "@/components/Blog/ViewArticle/SidebarMoreArticles";
import SidebarTopics from "@/components/Blog/ViewArticle/SidebarTopics";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await prisma.article.findUnique({
    where: { slug: params.slug },
    include: { images: true },
  });

  if (!article) return notFound();

  const moreArticles = await prisma.article.findMany({
    where: { slug: { not: article.slug } },
    take: 3,
    orderBy: { createdAt: "desc" },
    include: { images: true },
  });

  return (
    <div className="min-h-screen py-30 bg-gray-50 text-gray-800 p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        <ArticleContent article={article} />
        <aside className="space-y-8 bg-sky-950">
          <SidebarTopics />
          <SidebarMoreArticles articles={moreArticles} />
        </aside>
      </div>
    </div>
  );
}
