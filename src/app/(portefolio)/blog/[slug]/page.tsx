import ArticleContent from "@/components/Blog/ViewArticle/ArticleContent";
import SidebarMoreArticles from "@/components/Blog/ViewArticle/SidebarMoreArticles";
import SidebarTopics from "@/components/Blog/ViewArticle/SidebarTopics";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { metadataBase } from "@/lib/constants";



// Indique que la route est dynamique (params est une promesse)
export const dynamicParams = true;

interface ArticlePageProps {
    params: Promise<{ slug: string }>;
}

// Génère les métadonnées SEO avec URLs absolues
export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;

    const article = await prisma.article.findUnique({
        where: { slug },
        include: { images: true },
    });

    if (!article) return {};

    const imageUrl =
        article.images?.[0]?.url?.startsWith("http")
            ? article.images[0].url
            : `${metadataBase}${article.images?.[0]?.url || "/default-image.jpg"}`;

    return {
        title: article.title,
        description: article.description || article.description?.slice(0, 150),
        openGraph: {
            title: article.title,
            description: article.description || article.description?.slice(0, 150),
            type: "article",
            images: [
                {
                    url: imageUrl,
                    alt: article.title,
                },
            ],
        },
    };
}

// Génère les routes statiques pour SSG
export async function generateStaticParams() {
    const articles = await prisma.article.findMany({
        select: { slug: true },
    });

    return articles.map((article) => ({
        slug: article.slug,
    }));
}

// Composant principal de la page article
export default async function ArticlePage({ params }: ArticlePageProps) {
    const { slug } = await params;

    const article = await prisma.article.findUnique({
        where: { slug },
        include: {
            images: true,
            topic: true, // 👈 ajouter ça
        },
    });


    if (!article) return notFound();

    const moreArticles = await prisma.article.findMany({
        where: { slug: { not: slug } },
        take: 3,
        orderBy: { createdAt: "desc" },
        include: { images: true },
    });

    // JSON-LD pour SEO Schema.org
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
            name: "Ton Nom ou Auteur",
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
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <ArticleContent
                        article={{
                            title: article.title,
                            description: article.description,
                            topic: article.topic.name, // 👈 on extrait le nom
                            date: article.date.toISOString(),
                            readTime: article.readTime,
                            images: article.images.map((img) => ({ url: img.url })),
                        }}
                    />
                    <aside className="space-y-8 bg-sky-950">
                        <SidebarTopics />
                        <SidebarMoreArticles articles={moreArticles} />
                    </aside>
                </div>
            </div>
        </>
    );
}
