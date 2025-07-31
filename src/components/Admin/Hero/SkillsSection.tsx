"use client";

import React from "react";
import InputField from "./InputField";
import type { UseFormRegister, FieldErrors, FieldArrayWithId } from "react-hook-form";
import type { FormSchema } from "./EditProfilForm";

interface Skill {
  title: string;
  description: string;
  color: string;
  svgPath: string;
}

interface SkillsSectionProps {
  fields: FieldArrayWithId<FormSchema, "skills", "id">[];
  register: UseFormRegister<FormSchema>;
  append: (value: Skill) => void;
  remove: (index: number) => void;
  errors: FieldErrors<FormSchema>;
}

export default function SkillsSection({ fields, register, append, remove, errors }: SkillsSectionProps) {
 
  return (
    <section className="mt-6 border-t pt-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Compétences</h3>
      {fields.map((field, index) => (
        <div key={field.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 items-center">
          <InputField
            label="Titre"
            placeholder="Titre"
            {...register(`skills.${index}.title`)}
            error={errors.skills?.[index]?.title?.message}
          />
          <InputField
            label="Description"
            placeholder="Description"
            {...register(`skills.${index}.description`)}
            error={errors.skills?.[index]?.description?.message}
          />
          <InputField
            label="Couleur (#hex)"
            placeholder="Couleur (#hex)"
            {...register(`skills.${index}.color`)}
            error={errors.skills?.[index]?.color?.message}
          />
          <InputField
            label="Chemin SVG"
            placeholder="Chemin SVG"
            {...register(`skills.${index}.svgPath`)}
            error={errors.skills?.[index]?.svgPath?.message}
          />
          <button
            type="button"
            onClick={() => remove(index)}
            className="text-red-600 hover:text-red-800 font-bold self-center"
            title="Supprimer compétence"
          >
            ×
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => append({ title: "", description: "", color: "#000000", svgPath: "" })}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        + Ajouter une compétence
      </button>
    </section>
  );
}
