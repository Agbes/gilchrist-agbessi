"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { calculateReadTime } from "@/lib/utils";
import { useEffect, useState } from "react";
import { articleSchema } from "@/lib/validation/articleSchema";
import Image from "next/image";

type Topic = { id: number; name: string };
type Props = {
  initialData?: Partial<z.infer<typeof articleSchema>>;
  topics: Topic[];
  onSubmit: (formData: FormData) => Promise<void>;
  loading?: boolean;
  buttonLabel?: string;
};

type ArticleFormType = z.infer<typeof articleSchema>;

export default function ArticleForm({
  initialData,
  topics,
  onSubmit,
  loading = false,
  buttonLabel = "Enregistrer",
}: Props) {
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [tagList, setTagList] = useState<string[]>(initialData?.tags?.split(",").map(t => t.trim()) || []);
  const [readTime, setReadTime] = useState("0 min");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ArticleFormType>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      topicId: initialData?.topicId || topics?.[0]?.id.toString(),
      date: initialData?.date || "",
      tags: "",
    },
  });

  const description = watch("description");

  useEffect(() => {
    setReadTime(calculateReadTime(description));
  }, [description]);

  // Gérer les images
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setImages(files);
    setPreviews(files.map(file => URL.createObjectURL(file)));
  };

  const addTag = () => {
    if (tagInput.trim() && !tagList.includes(tagInput.trim())) {
      const updated = [...tagList, tagInput.trim()];
      setTagList(updated);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setTagList((tags) => tags.filter((t) => t !== tag));
  };

  const onFormSubmit = async (data: ArticleFormType) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("topicId", data.topicId);
    if (data.date) formData.append("date", data.date);
    formData.append("readTime", readTime);
    formData.append("tags", tagList.join(","));
    images.forEach((file) => formData.append("images", file));
    await onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="space-y-6 bg-white shadow-md rounded-xl p-8 border border-gray-100"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4">📝 Formulaire de l’article</h2>
   

      {/* Titre */}
      <div>
        <label className="font-semibold text-gray-700">Titre</label>
        <input {...register("title")} className="input" />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
      </div>

      {/* Description */}
      <div>
        <label className="font-semibold text-gray-700">Description</label>
        <textarea {...register("description")} className="input" rows={4} />
        <p className="text-sm text-gray-500 mt-1">⏱ Temps estimé : {readTime}</p>
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
      </div>

      {/* Topic */}
      <div>
        <label className="font-semibold text-gray-700">Thème</label>
        <select {...register("topicId")} className="input">
          {topics.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
        {errors.topicId && <p className="text-red-500 text-sm">{errors.topicId.message}</p>}
      </div>

      {/* Date */}
      <div>
        <label className="font-semibold text-gray-700">Date</label>
        <input type="date" {...register("date")} className="input" />
      </div>

      {/* Tags dynamiques */}
      <div>
        <label className="font-semibold text-gray-700">Tags</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            placeholder="ex: javascript"
            className="input"
          />
          <button type="button" onClick={addTag} className="bg-indigo-600 text-white px-4 rounded-lg">
            Ajouter
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {tagList.map((tag) => (
            <span
              key={tag}
              className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm flex items-center"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="ml-2 text-red-500 hover:text-red-700 font-bold"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Images avec prévisualisation */}
      <div>
        <label className="font-semibold text-gray-700">Images</label>
        <input type="file" multiple accept="image/*" onChange={handleImageChange} />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {previews.map((src, i) => (
            <Image
              key={i}
              src={src}
              alt={`preview-${i}`}
              className="w-full h-32 object-cover rounded-md border"
              width={200}
              height={200}
            />
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
      >
        {loading ? "Chargement..." : buttonLabel}
      </button>
    </form>
  );
}
