"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
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

export default function EditSocialForm() {
  const router = useRouter();
  const { id } = useParams();
  const [placeholder, setPlaceholder] = useState("");
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", icon: "", color: "", url: "" },
  });


  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/social-platform/${id}`);
        const data = await res.json();

        const preset = predefinedPlatforms.find((p) => p.name === data.name);
        setPlaceholder(preset?.placeholder || "");

        reset({
          name: data.name,
          icon: data.icon,
          color: data.color,
          url: data.url,
        });
      } catch (error: unknown) {
        if (error instanceof Error) {
          alert(`Erreur lors du chargement : ${error.message}`);
        } else {
          alert("Erreur lors du chargement");
        }
      } finally {
        setLoading(false);
      }

    }

    fetchData();
  }, [id, reset]);

  const handlePlatformChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = predefinedPlatforms.find((p) => p.name === e.target.value);
    if (selected) {
      setValue("name", selected.name);
      setValue("icon", selected.icon);
      setValue("color", selected.color);
      setValue("url", "");
      setPlaceholder(selected.placeholder);
    }
  };

  const onSubmit = async (data: FormValues) => {
    const res = await fetch(`/api/social-platform/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      alert("Plateforme sociale mise à jour !");
      router.push("/admin/info");
    } else {
      const { error } = await res.json();
      alert(`Erreur : ${error || "Échec de la mise à jour."}`);
    }
  };

  if (loading) return <p>Chargement...</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 shadow-2xl rounded-3xl mt-10">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
        Modifier la plateforme sociale
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
        </div>

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
          Enregistrer les modifications
        </button>
      </form>
    </div>
  );
}
