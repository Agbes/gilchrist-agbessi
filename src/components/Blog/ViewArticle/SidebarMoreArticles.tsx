import Image from "next/image";
import Link from "next/link";

interface SidebarMoreArticlesProps {
  articles: {
    slug: string;
    title: string;
    readTime: string;
    images: { url: string }[];
  }[];
}

export default function SidebarMoreArticles({ articles }: SidebarMoreArticlesProps) {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h3 className="font-bold text-lg mb-3">More Articles</h3>
      <ul className="space-y-3">
        {articles.slice(0, 3).map((a) => (
          <li key={a.slug} className="flex gap-3 items-start">
            {a.images[0] && (
              <Image
                src={a.images[0].url}
                alt={a.title}
                width={600}
                height={300}
                className="w-16 h-16 object-cover rounded-lg"
              />
            )}
            <div>
              <Link href={`/blog/${a.slug}`} className="text-sm font-medium hover:underline">
                {a.title}
              </Link>
              <div className="text-xs text-gray-500">{a.readTime}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
