"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ImagePlus } from "lucide-react";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema } from "@/lib/validation/articleSchema";
import Image from "next/image";

type ProjectForm = {
  name: string;
  nature: string;
  description: string;
  technologies?: string;
  image?: FileList; // React Hook Form gère les fichiers avec FileList
};

export default function EditProject() {
  const { id } = useParams();
  const router = useRouter();
  const [error, setError] = useState("");
  const [currentImageUrl, setCurrentImageUrl] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ProjectForm>({
    resolver: zodResolver(projectSchema),
  });

  useEffect(() => {
    const fetchProject = async () => {
      const res = await fetch(`/api/projects/${id}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erreur lors du chargement du projet.");
        return;
      }

      reset({
        name: data.name,
        nature: data.nature,
        description: data.description,
        technologies: data.technologyNames.join(", "),
      });
      setCurrentImageUrl(data.imageUrl);
    };

    if (id) fetchProject();
  }, [id, reset]);

  const onSubmit = async (data: ProjectForm) => {
    setError("");

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("nature", data.nature);
    formData.append("description", data.description);
    if (data.technologies) formData.append("technologies", data.technologies);

    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]);
    }

    const res = await fetch(`/api/projects/${id}`, {
      method: "PATCH",
      body: formData,
    });

    if (res.ok) {
      router.push("/admin/projects");
    } else {
      const { error } = await res.json();
      setError(error || "Erreur lors de la mise à jour");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow-xl space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">✏️ Modifier le projet</h1>

      {error && <p className="text-red-600 bg-red-100 p-2 rounded">{error}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6">
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
              {/* Afficher nom fichier sélectionné ou texte par défaut */}
              <Controller
                name="image"
                control={control}
                render={({ field }) => (
                  <>
                    {field.value && field.value.length > 0
                      ? field.value[0].name
                      : "Clique pour sélectionner une nouvelle image"}
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

          {!currentImageUrl && !control._formValues?.image && null}
          {currentImageUrl && !control._formValues?.image && (
            <Image
              src={currentImageUrl}
              alt="Image actuelle"
              className="mt-4 w-48 h-32 object-cover rounded border"
              width={192}
              height={128}
            />
          )}
          {errors.image && <p className="text-red-600 text-sm mt-1">{errors.image.message}</p>}
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition disabled:opacity-50"
          >
            ✅ Mettre à jour le projet
          </button>
        </div>
      </form>
    </div>
  );
}
