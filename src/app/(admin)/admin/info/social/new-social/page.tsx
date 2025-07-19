"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { formSchema } from "@/lib/validation/articleSchema";

const predefinedPlatforms = [
  { name: "Facebook", icon: "FaFacebook", color: "#1877F2", placeholder: "https://facebook.com/..." },
  { name: "Twitter", icon: "FaTwitter", color: "#1DA1F2", placeholder: "https://twitter.com/..." },
  { name: "LinkedIn", icon: "FaLinkedin", color: "#0077B5", placeholder: "https://linkedin.com/in/..." },
  { name: "Instagram", icon: "FaInstagram", color: "#E1306C", placeholder: "https://instagram.com/..." },
  { name: "GitHub", icon: "FaGithub", color: "#333333", placeholder: "https://github.com/..." },
  { name: "YouTube", icon: "FaYoutube", color: "#FF0000", placeholder: "https://youtube.com/..." },
];



type FormValues = z.infer<typeof formSchema>;

export default function CreateSocialForm() {
  const [placeholder, setPlaceholder] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", icon: "", color: "", url: "" },
  });

  const selectedName = watch("name");
  const platformSelected = selectedName !== "";

  const handlePlatformChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = predefinedPlatforms.find((p) => p.name === e.target.value);
    if (selected) {
      setValue("name", selected.name);
      setValue("icon", selected.icon);
      setValue("color", selected.color);
      setValue("url", "");
      setPlaceholder(selected.placeholder);
    } else {
      reset();
      setPlaceholder("");
    }
  };

  const onSubmit = async (data: FormValues) => {
    const res = await fetch("/api/social-platform", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      alert("Plateforme sociale créée !");
      reset();
      setPlaceholder("");
    } else {
      const { error } = await res.json();
      alert(`Erreur : ${error || "Échec de la création."}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 shadow-2xl rounded-3xl mt-10">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
        Ajouter une plateforme sociale
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="name">Choisir une plateforme</label>
          <select
            id="name"
            {...register("name")}
            onChange={handlePlatformChange}
            className="w-full px-4 py-2 border rounded"
            required
          >
            <option value="">-- Sélectionner --</option>
            {predefinedPlatforms.map((p) => (
              <option key={p.name} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        {platformSelected && (
          <>
            <div>
              <label htmlFor="icon">Icône</label>
              <input
                id="icon"
                {...register("icon")}
                readOnly
                className="w-full px-4 py-2 bg-gray-100 border rounded"
              />
            </div>

            <div>
              <label htmlFor="color">Couleur</label>
              <input
                id="color"
                {...register("color")}
                readOnly
                className="w-full px-4 py-2 bg-gray-100 border rounded"
              />
            </div>

            <div>
              <label htmlFor="url">URL du profil</label>
              <input
                id="url"
                {...register("url")}
                placeholder={placeholder}
                className="w-full px-4 py-2 border rounded"
              />
              {errors.url && <p className="text-red-500 text-sm">{errors.url.message}</p>}
            </div>

            <button type="submit" className="w-full py-3 bg-green-600 text-white rounded-lg">
              Enregistrer la plateforme
            </button>
          </>
        )}
      </form>
    </div>
  );
}
