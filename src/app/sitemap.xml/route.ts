import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const articles = await prisma.article.findMany({
    select: { slug: true, updatedAt: true },
  });

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://monsite.com";

  const sitemapEntries = articles
    .map(({ slug, updatedAt }) => {
      return `
      <url>
        <loc>${baseUrl}/blog/${slug}</loc>
        <lastmod>${updatedAt.toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>`;
    })
    .join("");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>${baseUrl}/</loc>
      <changefreq>daily</changefreq>
      <priority>1.0</priority>
    </url>
    ${sitemapEntries}
  </urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
