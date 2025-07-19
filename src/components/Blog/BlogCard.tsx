// components/Blog/BlogCard.tsx
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

type BlogCardProps = {
  post: {
    title: string;
    description: string;
    topic: { name: string };
    date: string;
    readTime: string;
    images: { url: string }[];
    slug?: string;
  };
};

const BlogCard: FC<BlogCardProps> = ({ post }) => {
  const mainImage = post.images?.[0]?.url || "/placeholder.jpg"; // Fallback image au cas où

  return (
    <div className="flex flex-col sm:flex-row bg-white rounded-xl shadow-md overflow-hidden mb-6">
      <Image
        width={200}
        height={300}
        src={mainImage}
        alt={post.title}
        className="object-cover h-48 sm:h-auto"
      />
      <div className="p-4 flex-1">
        <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-1 rounded-full inline-block mb-2">
          {post.topic.name}
        </span>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.description}</p>
        <div className="flex items-center gap-2 mb-3">
          <p className="text-xs text-gray-400">
            {new Date(post.date).toLocaleDateString("fr-FR", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}{" "}
            • {post.readTime}
          </p>
        </div>
        <Link
          href={`/blog/${post.slug}`}
          className="btn btn-dash btn-primary"
        >
          Lire plus →
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
