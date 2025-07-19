"use client";

import ArticleForm from "./ArticleForm";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Topic = { id: number; name: string };

export default function AddArticleClient({ topics }: { topics: Topic[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    try {
      const res = await fetch("/api/articles", {
        method: "POST",
        body: formData,
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Erreur lors de la création");
      router.push("/admin");
    } catch (err) {
      console.error("Erreur création article :", err);
    } finally {
      setLoading(false);
    }
  };

  return <ArticleForm onSubmit={handleSubmit} topics={topics} loading={loading} />;
}
