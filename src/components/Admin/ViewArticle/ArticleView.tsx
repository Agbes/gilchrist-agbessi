import Image from "next/image";
import React from "react";

type Article = {
  title: string;
  description: string;
  topic: string;
  date: string;
  readTime: string;
  images: string[];
};

type Props = {
  article: Article;
};

export default function ArticleView({ article }: Props) {
  const { title, description, topic, date, readTime, images } = article;

  const formattedDate = new Date(date).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="max-w-4xl mx-auto p-6 space-y-6">
      <header className="border-b border-gray-300 pb-4">
        <h1 className="text-4xl font-extrabold text-gray-900">{title}</h1>
        <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-600">
          <span>Publié le {formattedDate}</span>
          <span>• {topic}</span>
          <span>• {readTime}</span>
        </div>
      </header>

      <section className="prose max-w-none text-gray-800">
        <p>{description}</p>
      </section>

      {images.length > 0 && (
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((src, i) => (
            <Image
              key={i}
              src={src}
              alt={`Image ${i + 1} de l'article`}
              className="rounded-lg object-cover w-full h-48"
              loading="lazy"
              width={600}
              height={300}
            />
          ))}
        </section>
      )}
    </article>
  );
}
