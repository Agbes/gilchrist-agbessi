// components/Blog/BlogList.tsx
import prisma from "@/lib/prisma";
import BlogCard from "./BlogCard";

export default async function BlogList() {
  const articles = await prisma.article.findMany({
    include: { topic: true,images: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <section className="flex-1">
      <h2 className="text-2xl font-semibold mb-6 border-l-4 border-blue-500 pl-4">
        Derniers articles de blog
      </h2>

      {articles.length === 0 ? (
        <p>Aucun article pour le moment.</p>
      ) : (
        articles.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))
      )}
    </section>
  );
}
