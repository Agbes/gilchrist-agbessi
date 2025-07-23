"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";

const schema = z.object({
  title: z.string().min(1, "Titre requis"),
  description: z.string().min(1, "Description requise"),
  icon: z.string().min(1, "Icône requise"),
  color: z.string().min(1, "Couleur requise"),
  tagColor: z.string().min(1, "Couleur des tags requise"),
  tags: z.string().optional(),
});

type CompetenceFormData = z.infer<typeof schema>;

export default function EditCompetence() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CompetenceFormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const fetchCompetence = async () => {
      const res = await fetch(`/api/competences/${id}`);
      if (!res.ok) return alert("Erreur chargement compétence");
      const data = await res.json();

      reset({
        title: data.title,
        description: data.description,
        icon: data.icon,
        color: data.color,
        tagColor: data.tagColor,
        tags: data.tags.map((t: { name: string }) => t.name).join(", "),
      });

      setLoading(false);
    };

    fetchCompetence();
  }, [id, reset]);

  const onSubmit = async (formData: CompetenceFormData) => {
    const res = await fetch(`/api/competences/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        tags: formData.tags?.split(",").map((tag) => tag.trim()) || [],
      }),
    });

    if (res.ok) {
      router.push("/admin/competences");
    } else {
      alert("Erreur lors de la mise à jour.");
    }
  };

  if (loading) return <p>Chargement...</p>;

  return (
    <div className="max-w-xl mx-auto mt-8 bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4 text-blue-600">Modifier la compétence</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("title")}
          placeholder="Titre"
          className="w-full border px-4 py-2 rounded"
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}

        <input
          {...register("icon")}
          placeholder="Icône"
          className="w-full border px-4 py-2 rounded"
        />
        {errors.icon && <p className="text-red-500 text-sm">{errors.icon.message}</p>}

        <input
          {...register("color")}
          placeholder="Couleur"
          className="w-full border px-4 py-2 rounded"
        />
        {errors.color && <p className="text-red-500 text-sm">{errors.color.message}</p>}

        <input
          {...register("tagColor")}
          placeholder="Couleur des tags"
          className="w-full border px-4 py-2 rounded"
        />
        {errors.tagColor && <p className="text-red-500 text-sm">{errors.tagColor.message}</p>}

        <textarea
          {...register("description")}
          placeholder="Description"
          className="w-full border px-4 py-2 rounded"
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}

        <input
          {...register("tags")}
          placeholder="Tags (séparés par des virgules)"
          className="w-full border px-4 py-2 rounded"
        />

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Mettre à jour
        </button>
      </form>
    </div>
  );
}
