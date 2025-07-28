import type { Metadata } from "next";
import {metadataBase} from "@/lib/constants";
const defaultImage = "/og-gilchrist.png";

type MetadataParams = {
  title: string;
  description: string;
  slug?: string;
  image?: string;
  keywords?: string[];
  other?: Record<string, string>;
};

export function generateMetadata({
  title,
  description,
  slug = "",
  image = defaultImage,
  keywords = [],
  other,
}: MetadataParams): Metadata {
  const fullUrl = `${metadataBase}${slug.startsWith("/") ? slug : `/${slug}`}`;

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
    metadataBase: new URL(metadataBase),
    authors: [{ name: "Gilchrist AGBESSI", url: metadataBase }],
    creator: "Gilchrist AGBESSI",
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: fullUrl,
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
    other,
  };
}


// ✅ Variante spécifique pour les articles
export function generateArticleMetadata({
  title,
  description,
  slug = "",
  image = defaultImage,
  keywords = [],
  author = "Gilchrist AGBESSI",
  other,
}: MetadataParams & { author?: string }): Metadata {
  const fullUrl = `${metadataBase}${slug.startsWith("/") ? slug : `/${slug}`}`;

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
    metadataBase: new URL(metadataBase),
    authors: [{ name: author, url: metadataBase }],
    creator: author,
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: fullUrl,
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
          alt: `Image de l'article: ${title}`,
          type: "image/png",
        },
      ],
      locale: "fr_FR",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@gilosnell",
    },
    other,
  };
}
