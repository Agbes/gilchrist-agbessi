import Image from "next/image";
import Link from "next/link";

interface MoreArticlesSectionProps {
  articles: {
    slug: string;
    title: string;
    readTime: string;
    images: { url: string }[];
  }[];
}

export default function MoreArticlesSection({ articles }: MoreArticlesSectionProps) {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Plus d&apos;articles</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.slice(0, 6).map(({ slug, title, readTime, images }) => (
          <Link
            key={slug}
            href={`/blog/${slug}`}
            className="group block bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
          >
            {images[0]?.url && (
              <div className="relative h-40 w-full overflow-hidden">
                <Image
                  src={images[0].url}
                  alt={title}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  priority={false}
                />
              </div>
            )}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 mb-2 line-clamp-2">
                {title}
              </h3>
              <p className="text-sm text-gray-500">{readTime}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
