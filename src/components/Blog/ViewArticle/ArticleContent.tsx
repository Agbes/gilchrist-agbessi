import Image from "next/image";

interface ArticleContentProps {
  article: {
    title: string;
    description: string;
    topic: string;
    date: string;
    readTime: string;
    images: { url: string }[];
  };
}

export default function ArticleContent({ article }: ArticleContentProps) {
  const [mainImage, ...galleryImages] = article.images;

  return (
    <div className="lg:col-span-2 space-y-6">
      {/* Image principale */}
      {mainImage && (
        <img
          src={mainImage.url}
          alt={article.title}
          className="w-full h-80 object-cover rounded-2xl shadow"
        />
      )}

      {/* Infos article */}
      <div className="text-sm text-blue-600 font-semibold uppercase">
        {article.topic}
      </div>
      <h1 className="text-4xl font-bold">{article.title}</h1>
      <div className="flex items-center gap-4 text-sm text-gray-500">
        <span>{new Date(article.date).toLocaleDateString()}</span>
        <span>• {article.readTime}</span>
      </div>

      {/* Contenu principal */}
      <article className="prose prose-lg max-w-none mt-4">
        <p>{article.description}</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          vehicula urna non purus feugiat, in vulputate eros iaculis.
        </p>
      </article>

      {/* Galerie d'images */}
      {galleryImages.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Galerie</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((img, index) => (
              <img
                key={index}
                src={img.url}
                alt={`Image ${index + 2}`}
                className="w-full h-48 object-cover rounded-lg shadow"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
