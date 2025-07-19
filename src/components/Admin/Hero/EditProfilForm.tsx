"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const skillSchema = z.object({
  title: z.string().min(1, "Titre requis"),
  description: z.string().min(1, "Description requise"),
  color: z.string().regex(/^#?([0-9a-f]{3}){1,2}$/i, "Couleur invalide"),
  svgPath: z.string().min(1, "Chemin SVG requis"),
});

const formSchema = z.object({
  name: z.string().min(1),
  title: z.string().min(1),
  subtitle: z.string().min(1),
  description: z.string().min(1),
  experience: z.coerce.number().min(0),
  profileDescription: z.string().min(1),
  image: z.any().optional(),
  skills: z.array(skillSchema).min(1, "Ajoutez au moins une compétence"),
});

type FormSchema = z.infer<typeof formSchema>;

export default function EditProfilForm() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [newImage, setNewImage] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      title: "",
      subtitle: "",
      description: "",
      experience: 0,
      profileDescription: "",
      skills: [],
    },
  });

  const { fields, append, replace } = useFieldArray({
    control,
    name: "skills",
  });

  // Charger les données existantes
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/profils/${id}`);
      const data = await res.json();
      reset({
        name: data.name,
        title: data.title,
        subtitle: data.subtitle,
        description: data.description,
        experience: data.profile.experience,
        profileDescription: data.profile.description,
        skills: data.skills,
      });
      replace(data.skills);
    };
    fetchData();
  }, [id, reset, replace]);

  const onSubmit = async (data: FormSchema) => {
    try {
      let imagePath = "";

      if (newImage) {
        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: (() => {
            const fd = new FormData();
            fd.append("file", newImage);
            return fd;
          })(),
        });
        const { imagePath: uploadedPath } = await uploadRes.json();
        imagePath = uploadedPath;
      }

      const updatedData = {
        name: data.name,
        title: data.title,
        subtitle: data.subtitle,
        description: data.description,
        profile: {
          imagePath: imagePath || undefined, // garder l'ancien si pas de nouveau
          experience: data.experience,
          description: data.profileDescription,
        },
        skills: data.skills,
      };

      const res = await fetch(`/api/profils/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (res.ok) {
        alert("Profil mis à jour avec succès !");
        router.push("/admin/profil");
      } else {
        alert("Erreur lors de la mise à jour");
      }
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la requête");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 mt-10 bg-white rounded-3xl shadow-2xl">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">Modifier le Hero</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* HERO INFOS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input {...register("name")} placeholder="Nom" className="input" />
          <input {...register("title")} placeholder="Titre" className="input" />
          <input {...register("subtitle")} placeholder="Sous-titre" className="input" />
          <input {...register("description")} placeholder="Description" className="input" />
        </div>

        {/* PROFILE */}
        <div className="mt-6 border-t pt-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Profil</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setNewImage(e.target.files?.[0] || null)}
              className="input file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
            />
            <input type="number" {...register("experience")} placeholder="Années d'expérience" className="input" />
            <input {...register("profileDescription")} placeholder="Description du profil" className="input" />
          </div>
        </div>

        {/* SKILLS */}
        <div className="mt-6 border-t pt-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Compétences</h3>
          {fields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <input {...register(`skills.${index}.title`)} placeholder="Titre" className="input" />
              <input {...register(`skills.${index}.description`)} placeholder="Description" className="input" />
              <input {...register(`skills.${index}.color`)} placeholder="Couleur (#hex)" className="input" />
              <input {...register(`skills.${index}.svgPath`)} placeholder="Chemin SVG" className="input" />
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              append({ title: "", description: "", color: "", svgPath: "" })
            }
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            + Ajouter une compétence
          </button>
        </div>

        {/* SUBMIT */}
        <div className="text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 px-8 py-3 bg-green-600 text-white font-bold rounded-full hover:bg-green-700 transition"
          >
            {isSubmitting ? "Mise à jour..." : "Mettre à jour"}
          </button>
        </div>
      </form>
    </div>
  );
}
