// components/Blog/BlogList.tsx
import prisma from "@/lib/prisma";
import BlogCard from "./BlogCard";

export default async function BlogList() {
  const articles = await prisma.article.findMany({
    include: { topic: true, images: true },
    orderBy: { createdAt: "desc" },
  });

  // Formater les dates en chaîne ISO pour correspondre au type attendu
  const articlesFormatted = articles.map((post) => ({
    ...post,
    date: post.date.toISOString(),
  }));

  return (
    <section className="flex-1">
      <h2 className="text-2xl font-semibold mb-6 border-l-4 border-blue-500 pl-4">
        Derniers articles de blog
      </h2>

      {articlesFormatted.length === 0 ? (
        <p>Aucun article pour le moment.</p>
      ) : (
        articlesFormatted.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))
      )}
    </section>
  );
}
