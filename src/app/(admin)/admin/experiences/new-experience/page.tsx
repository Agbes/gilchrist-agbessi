"use client";

import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImagePlus } from "lucide-react";

// Schéma de validation avec Zod
const experienceSchema = z.object({
  name: z.string().min(1, "Nom requis"),
  periode: z.string().min(1, "Période requise"),
  description: z.string().min(1, "Description requise"),
  lieu: z.string().min(1, "Lieu requis"),
  services: z.string().optional(),
  image: z
    .any()
    .refine((files) => files?.length === 1, "Image requise"),
});

type ExperienceForm = z.infer<typeof experienceSchema>;

export default function AddExperience() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ExperienceForm>({
    resolver: zodResolver(experienceSchema),
  });

  const onSubmit = async (data: ExperienceForm) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("periode", data.periode);
      formData.append("description", data.description);
      formData.append("lieu", data.lieu);
      if (data.services) formData.append("services", data.services);
      formData.append("image", data.image[0]);

      const res = await fetch("/api/experiences", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        router.push("/admin/experiences");
      } else {
        const json = await res.json();
        alert(json.error || "Erreur lors de la création");
      }
    } catch (err) {
      alert("Erreur lors de l'envoi");
      console.error(err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow-xl space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">🧳 Ajouter une expérience</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
          <input
            {...register("name")}
            type="text"
            placeholder="Nom de l'expérience"
            className={`w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Période</label>
          <input
            {...register("periode")}
            type="text"
            placeholder="Ex: 2022 - 2023"
            className={`w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.periode ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.periode && <p className="text-red-600 text-sm mt-1">{errors.periode.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Lieu</label>
          <input
            {...register("lieu")}
            type="text"
            placeholder="Ex: Paris, France"
            className={`w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.lieu ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.lieu && <p className="text-red-600 text-sm mt-1">{errors.lieu.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            {...register("description")}
            rows={4}
            placeholder="Décris l'expérience brièvement..."
            className={`w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
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
            placeholder="Ex: Développement, Design (séparés par virgule)"
            className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>

          <Controller
            control={control}
            name="image"
            render={({ field }) => (
              <label className="flex items-center gap-2 border border-dashed border-gray-400 p-4 rounded-xl cursor-pointer hover:bg-gray-50">
                <ImagePlus className="text-gray-500" />
                <span className="text-gray-600">
                  {field.value && field.value[0]?.name
                    ? field.value[0].name
                    : "Clique pour sélectionner une image"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => field.onChange(e.target.files)}
                  className="hidden"
                  required
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
            {isSubmitting ? "Enregistrement..." : "✅ Enregistrer l'expérience"}
          </button>
        </div>
      </form>
    </div>
  );
}
