"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Resolver } from "react-hook-form";

const skillSchema = z.object({
  title: z.string().min(1, "Titre requis"),
  description: z.string().min(1, "Description requise"),
  color: z.string().regex(/^#([0-9a-f]{3}){1,2}$/i, "Code couleur invalide"),
  svgPath: z.string().min(1, "Chemin SVG requis"),
});

const formSchema = z.object({
  name: z.string().min(1, "Nom requis"),
  title: z.string().min(1, "Titre requis"),
  subtitle: z.string().min(1, "Sous-titre requis"),
  description: z.string().min(1, "Description requise"),
  experience: z.coerce.number().min(0, "Expérience requise"),
  profileDescription: z.string().min(1, "Description de profil requise"),
  image: z
    .any()
    .refine((file) => file?.[0], "Image requise"),
  skills: z.array(skillSchema).min(1, "Ajoutez au moins une compétence"),
});

type FormSchema = z.infer<typeof formSchema>;

export default function CreateProfilForm() {
  const {
    register,
    handleSubmit,
    control,
    reset,
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
      skills: [
        { title: "", description: "", color: "#000000", svgPath: "" },
      ],
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: "skills",
  });

  const onSubmit = async (data: FormSchema) => {
    try {
      const file = data.image[0];

      // Préparer FormData pour upload image
      const fd = new FormData();
      fd.append("file", file);

      // Upload image (adapter URL et logique selon ton API)
      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: fd,
      });

      if (!uploadRes.ok) {
        alert("Erreur lors de l'upload de l'image");
        return;
      }

      const { imagePath } = await uploadRes.json();

      // Construire l'objet profil à envoyer
      const profil = {
        name: data.name,
        title: data.title,
        subtitle: data.subtitle,
        description: data.description,
        profile: {
          imagePath,
          experience: data.experience,
          description: data.profileDescription,
        },
        skills: data.skills,
      };

      // Envoyer le profil à ton API
      const res = await fetch("/api/profils", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profil),
      });

      if (res.ok) {
        alert("Héros créé avec succès !");
        reset(); // ✅ fonctionne ici
      } else {
        alert("Erreur lors de la création");
      }
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'envoi");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 mt-10 bg-white rounded-3xl shadow-2xl">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">Créer un Hero</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* HERO INFOS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <input {...register("name")} placeholder="Nom" className="input" />
            <p className="text-red-500 text-sm">{errors.name?.message}</p>
          </div>
          <div>
            <input {...register("title")} placeholder="Titre" className="input" />
            <p className="text-red-500 text-sm">{errors.title?.message}</p>
          </div>
          <div>
            <input {...register("subtitle")} placeholder="Sous-titre" className="input" />
            <p className="text-red-500 text-sm">{errors.subtitle?.message}</p>
          </div>
          <div>
            <input {...register("description")} placeholder="Description" className="input" />
            <p className="text-red-500 text-sm">{errors.description?.message}</p>
          </div>
        </div>

        {/* PROFILE */}
        <div className="mt-6 border-t pt-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Profil</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <input
                type="file"
                {...register("image")}
                accept="image/*"
                className="input file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
              />
              <p className="text-red-500 text-sm">
                {typeof errors.image?.message === "string" ? errors.image.message : null}
              </p>
            </div>
            <div>
              <input
                type="number"
                {...register("experience")}
                placeholder="Années d'expérience"
                className="input"
              />
              <p className="text-red-500 text-sm">{errors.experience?.message}</p>
            </div>
            <div>
              <input
                {...register("profileDescription")}
                placeholder="Description du profil"
                className="input"
              />
              <p className="text-red-500 text-sm">{errors.profileDescription?.message}</p>
            </div>
          </div>
        </div>

        {/* SKILLS */}
        <div className="mt-6 border-t pt-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Compétences</h3>
          {fields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-2">
              <div>
                <input
                  {...register(`skills.${index}.title`)}
                  placeholder="Titre"
                  className="input"
                />
                <p className="text-red-500 text-sm">
                  {errors.skills?.[index]?.title?.message}
                </p>
              </div>
              <div>
                <input
                  {...register(`skills.${index}.description`)}
                  placeholder="Description"
                  className="input"
                />
                <p className="text-red-500 text-sm">
                  {errors.skills?.[index]?.description?.message}
                </p>
              </div>
              <div>
                <input
                  {...register(`skills.${index}.color`)}
                  placeholder="Couleur (#hex)"
                  className="input"
                />
                <p className="text-red-500 text-sm">
                  {errors.skills?.[index]?.color?.message}
                </p>
              </div>
              <div>
                <input
                  {...register(`skills.${index}.svgPath`)}
                  placeholder="Chemin SVG"
                  className="input"
                />
                <p className="text-red-500 text-sm">
                  {errors.skills?.[index]?.svgPath?.message}
                </p>
              </div>
            </div>
          ))}

          <p className="text-red-500 text-sm">{errors.skills?.message}</p>

          <button
            type="button"
            onClick={() => append({ title: "", description: "", color: "", svgPath: "" })}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
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
            {isSubmitting ? "Enregistrement..." : "Enregistrer"}
          </button>
        </div>
      </form>
    </div>
  );
}
