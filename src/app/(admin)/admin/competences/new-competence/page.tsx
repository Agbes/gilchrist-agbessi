"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";

const schema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  description: z.string().min(1, "La description est requise"),
  icon: z.string().min(1, "L’icône est requise"),
  color: z.string().min(1, "La couleur est requise"),
  tagColor: z.string().min(1, "La couleur de tag est requise"),
  tags: z.string().optional(),
});

type CompetenceFormData = z.infer<typeof schema>;

export default function NewCompetenceForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CompetenceFormData>({
    resolver: zodResolver(schema),
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: CompetenceFormData) => {
    setLoading(true);
    const res = await fetch("/api/competences", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        tags: data.tags?.split(",").map((tag) => tag.trim()) || [],
      }),
    });

    setLoading(false);

    if (res.ok) {
      router.push("/admin/competences");
    } else {
      alert("Erreur lors de la création.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">
        Ajouter une nouvelle compétence
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Titre</label>
            <input
              type="text"
              {...register("title")}
              className="mt-1 block w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Ex: Développement Web"
            />
            {errors.title && <p className="text-red-600 text-sm">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Icône</label>
            <input
              type="text"
              {...register("icon")}
              className="mt-1 block w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Ex: react, code, server, etc."
            />
            {errors.icon && <p className="text-red-600 text-sm">{errors.icon.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            rows={4}
            {...register("description")}
            className="mt-1 block w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Décris brièvement cette compétence..."
          />
          {errors.description && <p className="text-red-600 text-sm">{errors.description.message}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Couleur (fond)</label>
            <input
              type="text"
              {...register("color")}
              className="mt-1 block w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="#e0f2fe"
            />
            {errors.color && <p className="text-red-600 text-sm">{errors.color.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Couleur (étiquette)</label>
            <input
              type="text"
              {...register("tagColor")}
              className="mt-1 block w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="#0ea5e9"
            />
            {errors.tagColor && <p className="text-red-600 text-sm">{errors.tagColor.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Tags</label>
          <input
            type="text"
            {...register("tags")}
            className="mt-1 block w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="HTML, CSS, JavaScript"
          />
          <p className="text-xs text-gray-500 mt-1">Séparez les tags par des virgules</p>
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "Enregistrement..." : "Enregistrer la compétence"}
          </button>
        </div>
      </form>
    </div>
  );
}
