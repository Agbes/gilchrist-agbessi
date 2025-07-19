"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ArticleForm from "./ArticleForm";

type Topic = { id: number; name: string };
type Article = {
  title: string;
  description: string;
  topicId: number;
  date: string;
  tags?: string[];
};

export default function EditArticleClient({ slug, topics }: { slug: string; topics: Topic[] }) {
  const router = useRouter();
  const [initialData, setInitialData] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`/api/articles/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.date) data.date = data.date.slice(0, 10);
        data.tags = data.tags?.join(", ") ?? "";
        setInitialData(data);
      })
      .catch((err) => console.error("Erreur chargement article :", err))
      .finally(() => setLoading(false));
  }, [slug]);

  const handleSubmit = async (formData: FormData) => {
    setSaving(true);
    try {
      const body = Object.fromEntries(formData.entries());
      const res = await fetch(`/api/articles/${slug}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Erreur lors de la mise à jour");
      router.push("/admin");
    } catch (err) {
      console.error("Erreur mise à jour article :", err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (!initialData) return <p>Article introuvable</p>;

  return (
    <ArticleForm
      initialData={initialData}
      onSubmit={handleSubmit}
      loading={saving}
      buttonLabel="Mettre à jour"
      topics={topics}
    />
  );
}
