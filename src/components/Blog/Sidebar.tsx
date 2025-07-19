// components/Blog/Sidebar.tsx

import prisma from "@/lib/prisma";

export default async function Sidebar() {
  const topics = await prisma.topic.findMany({
    orderBy: { name: "asc" },
  });

  const tags = await prisma.tagArticle.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <aside className="w-full lg:w-1/3 mt-10 lg:mt-0">
      {/* Topics */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h2 className="text-xl font-semibold mb-4 text-black">Thèmes</h2>
        <div className="space-y-2">
          {topics.map((topic) => (
            <button
              key={topic.id}
              className="flex items-center justify-between w-full px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 text-black"
            >
              {topic.name}
            </button>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4 text-black">Tags</h2>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag.id}
              className="text-sm px-2 py-1 bg-gray-100 rounded hover:bg-gray-200 text-black"
            >
              #{tag.name}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
}
