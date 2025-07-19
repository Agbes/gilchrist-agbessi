"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImagePlus } from "lucide-react";

const experienceSchema = z.object({
  name: z.string().min(1, "Nom requis"),
  periode: z.string().min(1, "Période requise"),
  description: z.string().min(1, "Description requise"),
  lieu: z.string().min(1, "Lieu requis"),
  services: z.string().optional(),
  image: z
    .any()
    .optional(), 
});

type ExperienceForm = z.infer<typeof experienceSchema>;

export default function EditExperience() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ExperienceForm>({
    resolver: zodResolver(experienceSchema),
  });

  useEffect(() => {
    if (!id) return;

    async function fetchExperience() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`/api/experiences/${id}`);
        if (!res.ok) throw new Error("Erreur de chargement");
        const data = await res.json();

        reset({
          name: data.name,
          periode: data.periode,
          description: data.description,
          lieu: data.lieu,
          services: data.services?.map((s: { name: string }) => s.name).join(", ") || "",
          image: undefined,
        });

        setCurrentImage(data.imageUrl || null);
      } catch (err) {
        setError("Erreur de chargement");
      } finally {
        setLoading(false);
      }
    }

    fetchExperience();
  }, [id, reset]);

  const onSubmit = async (data: ExperienceForm) => {
    if (!id) return;
    setError("");

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("periode", data.periode);
      formData.append("description", data.description);
      formData.append("lieu", data.lieu);
      if (data.services) formData.append("services", data.services);
      if (data.image && data.image.length > 0) {
        formData.append("image", data.image[0]);
      }

      const res = await fetch(`/api/experiences/${id}`, {
        method: "PATCH",
        body: formData,
      });

      if (res.ok) {
        router.push("/admin/experiences");
      } else {
        const json = await res.json();
        setError(json.error || "Erreur lors de la mise à jour");
      }
    } catch (err) {
      setError("Erreur lors de la mise à jour");
      console.error(err);
    }
  };

  if (loading) return <p className="text-center py-8">Chargement...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow-xl space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">✏️ Modifier une expérience</h1>

      {error && <p className="text-red-600 bg-red-100 p-2 rounded">{error}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
          <input
            {...register("name")}
            type="text"
            className={`w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Nom de l'expérience"
          />
          {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Période</label>
          <input
            {...register("periode")}
            type="text"
            className={`w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.periode ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Ex: 2022 - 2023"
          />
          {errors.periode && <p className="text-red-600 text-sm mt-1">{errors.periode.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Lieu</label>
          <input
            {...register("lieu")}
            type="text"
            className={`w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.lieu ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Ex: Paris, France"
          />
          {errors.lieu && <p className="text-red-600 text-sm mt-1">{errors.lieu.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            {...register("description")}
            rows={4}
            className={`w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Décris l'expérience brièvement..."
          />
          {errors.description && (
            <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Services</label>
          <input
            {...register("services")}
            type="text"
            className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ex: Développement, Design (séparés par virgule)"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Image actuelle</label>
          {currentImage && (
            <img
              src={currentImage}
              alt="Image actuelle"
              className="w-32 h-32 object-cover rounded mb-2"
            />
          )}

          <Controller
            control={control}
            name="image"
            render={({ field }) => (
              <label className="flex items-center gap-2 border border-dashed border-gray-400 p-4 rounded-xl cursor-pointer hover:bg-gray-50">
                <ImagePlus className="text-gray-500" />
                <span className="text-gray-600">
                  {field.value && field.value[0]?.name ? field.value[0].name : "Changer l'image"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => field.onChange(e.target.files)}
                  className="hidden"
                />
              </label>
            )}
          />
          {errors.image && <p className="text-red-600 text-sm mt-1">{errors.image.message}</p>}
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition disabled:opacity-50"
          >
            {isSubmitting ? "Mise à jour..." : "💾 Mettre à jour l'expérience"}
          </button>
        </div>
      </form>
    </div>
  );
}
