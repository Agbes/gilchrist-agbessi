"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm, useFieldArray, Resolver } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import InputField from "./InputField";
import ProfileSection from "./ProfileSection";
import SkillsSection from "./SkillsSection";

// Regex tailwind ou hex
const tailwindColorRegex = /^bg-[a-z]+-\d{3}$/i;

const skillSchema = z.object({
  title: z.string().min(1, "Titre requis"),
  description: z.string().min(1, "Description requise"),
  color: z
    .string()
    .refine(
      val =>
        /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(val) || tailwindColorRegex.test(val),
      "Couleur invalide (hex ou classe Tailwind attendue)"
    ),
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

export type FormSchema = z.infer<typeof formSchema>;

export default function EditProfilForm() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [newImage, setNewImage] = useState<File | null>(null);
  const [currentImagePath, setCurrentImagePath] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema) as Resolver<FormSchema>,
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

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "skills",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/profils/${id}`);
        if (!res.ok) throw new Error("Profil non trouvé");
        const data = await res.json();

        setCurrentImagePath(data.profile?.imagePath || null);

        reset({
          name: data.name || "",
          title: data.title || "",
          subtitle: data.subtitle || "",
          description: data.description || "",
          experience: data.profile?.experience ?? 0,
          profileDescription: data.profile?.description || "",
          skills: data.skills || [],
        });

        replace(data.skills || []);
      } catch (e) {
        console.error(e);
      }
    }
    fetchData();
  }, [id, reset, replace]);

  const onSubmit = async (data: FormSchema) => {
    try {
      let imagePath = currentImagePath || "";

      if (newImage) {
        const fd = new FormData();
        fd.append("file", newImage);

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: fd,
        });
        if (!uploadRes.ok) throw new Error("Erreur upload image");
        const { imagePath: uploadedPath } = await uploadRes.json();
        imagePath = uploadedPath;
      }

      const updatedData = {
        name: data.name,
        title: data.title,
        subtitle: data.subtitle,
        description: data.description,
        profile: {
          imagePath: imagePath || undefined,
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

      if (!res.ok) throw new Error("Erreur lors de la mise à jour");

      alert("Profil mis à jour avec succès !");
      router.push("/admin/profil");
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la mise à jour");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 mt-10 bg-white rounded-3xl shadow-2xl">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">Modifier le Hero</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* HERO INFOS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Nom"
            placeholder="Nom"
            {...register("name")}
            error={errors.name?.message}
          />
          <InputField
            label="Titre"
            placeholder="Titre"
            {...register("title")}
            error={errors.title?.message}
          />
          <InputField
            label="Sous-titre"
            placeholder="Sous-titre"
            {...register("subtitle")}
            error={errors.subtitle?.message}
          />
          <InputField
            label="Description"
            placeholder="Description"
            {...register("description")}
            error={errors.description?.message}
          />
        </div>

        {/* Profil */}
        <ProfileSection
          register={register}
          setNewImage={setNewImage}
          currentImagePath={currentImagePath}
          errors={errors}
        />

        {/* Skills */}
        <SkillsSection
          fields={fields}
          register={register}
          append={append}
          remove={remove}
          errors={errors}
        />

        {/* Submit */}
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
