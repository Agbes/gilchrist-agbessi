"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ImagePlus } from "lucide-react";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addProjectSchema } from "@/lib/validation/articleSchema";

type AddProjectForm = {
  name: string;
  nature: string;
  description: string;
  technologies?: string;
  image: FileList;
};

export default function AddProject() {
  const router = useRouter();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<AddProjectForm>({
    resolver: zodResolver(addProjectSchema),
  });

  const onSubmit = async (data: AddProjectForm) => {
    setError("");

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("nature", data.nature);
    formData.append("description", data.description);
    if (data.technologies) formData.append("technologies", data.technologies);

    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]);
    }

    const res = await fetch("/api/projects", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      router.push("/admin/projects");
    } else {
      const resData = await res.json();
      setError(resData.error || "Erreur lors de la création");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow-xl space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">🛠️ Ajouter un nouveau projet</h1>

      {error && <p className="text-red-600 bg-red-100 p-2 rounded">{error}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6" noValidate>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nom du projet</label>
          <input
            type="text"
            {...register("name")}
            className={`w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Ex: Portfolio, Gestionnaire de tâches..."
          />
          {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nature</label>
          <input
            type="text"
            {...register("nature")}
            className={`w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.nature ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Ex: Application web, site vitrine..."
          />
          {errors.nature && <p className="text-red-600 text-sm mt-1">{errors.nature.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            {...register("description")}
            rows={4}
            className={`w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Décris le projet brièvement..."
          />
          {errors.description && (
            <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Technologies</label>
          <input
            type="text"
            {...register("technologies")}
            className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ex: React, Tailwind, Node.js (séparées par virgule)"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Image du projet</label>

          <label className="flex items-center gap-2 border border-dashed border-gray-400 p-4 rounded-xl cursor-pointer hover:bg-gray-50">
            <ImagePlus className="text-gray-500" />
            <span className="text-gray-600">
              <Controller
                name="image"
                control={control}
                render={({ field }) => (
                  <>
                    {field.value && field.value.length > 0
                      ? field.value[0].name
                      : "Clique pour sélectionner une image"}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => field.onChange(e.target.files)}
                    />
                  </>
                )}
              />
            </span>
          </label>
          {errors.image && <p className="text-red-600 text-sm mt-1">{errors.image.message}</p>}
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition disabled:opacity-50"
          >
            ✅ Enregistrer le projet
          </button>
        </div>
      </form>
    </div>
  );
}
