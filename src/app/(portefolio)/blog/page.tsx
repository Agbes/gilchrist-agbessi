// app/blog/page.tsx
import BlogList from "@/components/Blog/BlogList";
import Sidebar from "@/components/Blog/Sidebar";

export default function BlogPage() {
  return (
    <main className="py-30 max-w-7xl mx-auto px-4 py-12 flex flex-col lg:flex-row gap-10">
      <BlogList />
      <Sidebar />
    </main>
  );
}
