// app/blog/page.tsx
import BlogList from "@/components/Blog/BlogList";
import Sidebar from "@/components/Blog/Sidebar";

import { generateMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = generateMetadata({
  title: "Blog | Gilchrist - Développeur Web & Mathématicien",
  description:
    "Articles, tutoriels et réflexions sur le développement web, Next.js, React et les mathématiques appliquées.",
  slug: "blog",
  keywords: [
    "blog",
    "articles",
    "développement web",
    "Next.js",
    "React",
    "programmation",
    "mathématiques",
  ],
});


export default function BlogPage() {
  return (
    <main className="py-30 max-w-7xl mx-auto px-4 py-12 flex flex-col lg:flex-row gap-10">
      <BlogList />
      <Sidebar />
    </main>
  );
}
