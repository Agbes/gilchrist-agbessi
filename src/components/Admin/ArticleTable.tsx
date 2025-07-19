"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Article {
  id: number;
  slug: string;
  title: string;
  description: string;
}

export default function ArticleTable() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch("/api/articles");
        if (!res.ok) throw new Error("Erreur lors du chargement");
        const data = await res.json();
        setArticles(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const handleDelete = async (slug: string) => {
    if (!confirm("Supprimer cet article ?")) return;

    try {
      const res = await fetch(`/api/articles/${slug}`, { method: "DELETE" });
      if (res.ok) {
        setArticles((prev) => prev.filter((a) => a.slug !== slug));
      } else {
        alert("Échec de la suppression.");
      }
    } catch (error) {
      console.error("Erreur suppression :", error);
      alert("Erreur lors de la suppression.");
    }
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="flex justify-between items-center mb-4 animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4" />
          <div className="flex gap-2">
            <div className="h-8 w-32 bg-gray-200 rounded" />
            <div className="h-8 w-36 bg-gray-200 rounded" />
          </div>
        </div>

        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex justify-between items-center animate-pulse border-b py-3">
              <div className="w-1/4 h-4 bg-gray-200 rounded" />
              <div className="w-1/3 h-4 bg-gray-200 rounded" />
              <div className="flex gap-2">
                <div className="w-20 h-6 bg-gray-300 rounded" />
                <div className="w-20 h-6 bg-gray-300 rounded" />
                <div className="w-20 h-6 bg-gray-300 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) return <p className="text-red-600">Erreur : {error}</p>;

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Liste des articles</h2>
        <div className="flex gap-2">
          <Link
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 text-sm"
            href="/admin/topics/new"
          >
            Ajouter un topic
          </Link>
          <Link
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 text-sm"
            href="/admin/articles/new-article"
          >
            Ajouter un article
          </Link>
        </div>
      </div>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-100 text-gray-600 text-sm">
            <th className="py-3 px-4">Titre</th>
            <th className="py-3 px-4">Description</th>
            <th className="py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article.slug} className="hover:bg-gray-50 border-b">
              <td className="py-3 px-4">{article.title}</td>
              <td className="py-3 px-4">
                {article.description.split(" ").slice(0, 10).join(" ")}
                {article.description.split(" ").length > 10 && "..."}
              </td>
              <td className="py-3 px-4">
                <div className="flex space-x-2">
                  <Link
                    className="px-2 py-1 rounded bg-green-600 text-white hover:bg-green-700 text-sm"
                    href={`/admin/articles/${article.slug}/edit-article`}
                  >
                    Modifier
                  </Link>
                  <Link
                    className="px-2 py-1 rounded bg-yellow-500 text-white hover:bg-yellow-600 text-sm"
                    href={`/admin/articles/${article.slug}`}
                  >
                    Voir
                  </Link>
                  <button
                    className="px-2 py-1 rounded bg-red-600 text-white hover:bg-red-700 text-sm"
                    onClick={() => handleDelete(article.slug)}
                  >
                    Supprimer
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
