import ArticleContent from "@/components/Blog/ViewArticle/ArticleContent";
import MoreArticlesSection from "@/components/Blog/ViewArticle/MoreArticlesSection";
import SidebarTopics from "@/components/Blog/ViewArticle/SidebarTopics";
import SidebarKeywords from "@/components/Blog/ViewArticle/SidebarKeywords";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { generateArticleMetadata } from "@/lib/metadata";
import { metadataBase } from "@/lib/constants";
import { Prisma } from "@prisma/client";

export const dynamicParams = true;

// ✅ Typage complet pour l'article avec les relations
type FullArticleWithAll = Prisma.ArticleGetPayload<{
  include: {
    images: true;
    topic: true;
    keywords: {
      include: {
        keyword: true;
      };
    };
  };
}>;

// ✅ Métadonnées SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const article = (await prisma.article.findUnique({
    where: { slug },
    include: {
      images: true,
      topic: true,
      keywords: {
        include: {
          keyword: true,
        },
      },
    },
  })) as FullArticleWithAll | null;

  if (!article) return {};

  const imageUrl =
    article.images?.[0]?.url?.startsWith("http")
      ? article.images[0].url
      : `${metadataBase}${article.images?.[0]?.url || "/default-image.jpg"}`;

  return generateArticleMetadata({
    title: article.title,
    description: article.description || article.description?.slice(0, 150),
    slug: `/blog/${slug}`,
    image: imageUrl,
    author: "Gilchrist AGBESSI",
    keywords: article.keywords?.map((k) => k.keyword.name) || [],
  });
}

// ✅ SSG : génération des routes
export async function generateStaticParams() {
  const articles = await prisma.article.findMany({
    select: { slug: true },
  });

  return articles.map((article) => ({
    slug: article.slug,
  }));
}

// ✅ Page principale
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const article = (await prisma.article.findUnique({
    where: { slug },
    include: {
      images: true,
      topic: true,
      keywords: {
        include: {
          keyword: true,
        },
      },
    },
  })) as FullArticleWithAll | null;

  if (!article) return notFound();

  const moreArticles = await prisma.article.findMany({
    where: { slug: { not: slug } },
    take: 3,
    orderBy: { createdAt: "desc" },
    include: { images: true },
  });

  const keywordNames = article.keywords?.map((k) => k.keyword.name) || [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description || article.description?.slice(0, 150),
    image:
      article.images?.[0]?.url?.startsWith("http")
        ? article.images[0].url
        : `${metadataBase}${article.images?.[0]?.url || "/default-image.jpg"}`,
    author: {
      "@type": "Person",
      name: "Gilchrist AGBESSI",
      url: "https://gilchrist-agbessi.onrender.com",
    },
    datePublished: article.createdAt.toISOString(),
    dateModified: article.updatedAt.toISOString(),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${metadataBase}/blog/${slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen py-30 bg-gray-50 text-gray-800 p-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">
          {/* Contenu principal */}
          <main className="flex-1 flex flex-col gap-8">
            <ArticleContent
              article={{
                title: article.title,
                description: article.description,
                topic: article.topic.name,
                date: article.createdAt.toISOString(),
                readTime: article.readTime,
                images: article.images.map((img) => ({ url: img.url })),
              }}
            />
            <div className="divider"></div>
            <MoreArticlesSection articles={moreArticles} />
          </main>

          {/* Sidebar */}
          <aside className="w-full lg:w-80 space-y-8 bg-sky-950 p-6 rounded-md flex-shrink-0">
            <SidebarTopics />
            <SidebarKeywords keywords={keywordNames} />
          </aside>
        </div>
      </div>
    </>
  );
}
