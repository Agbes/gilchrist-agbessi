import type { Metadata } from "next";

const baseUrl = "https://gilchrist-agbessi.onrender.com";
const defaultImage = "/og-gilchrist.png";

type MetadataParams = {
  title: string;
  description: string;
  slug?: string;
  image?: string;
  keywords?: string[];
  other?: Record<string, string>; // ✅ Ajout ici
};

export function generateMetadata({
  title,
  description,
  slug = "",
  image = defaultImage,
  keywords = [],
  other,
}: MetadataParams): Metadata {
  const fullUrl = `${baseUrl}${slug.startsWith("/") ? slug : `/${slug}`}`;

  return {
    title,
    description,
    keywords: [
      "Gilchrist",
      "AGBESSI",
      "Gilchrist AGBESSI",
      "développeur web",
      ...keywords,
    ],
    metadataBase: new URL(baseUrl),
    authors: [{ name: "Gilchrist AGBESSI", url: baseUrl }],
    creator: "Gilchrist AGBESSI",
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title,
      description,
      url: fullUrl,
      siteName: "Portfolio Gilchrist AGBESSI",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: "Image de couverture du portfolio de Gilchrist",
          type: "image/png",
        },
      ],
      locale: "fr_FR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@gilosnell",
    },
    other, // ✅ Ajout ici
  };
}
