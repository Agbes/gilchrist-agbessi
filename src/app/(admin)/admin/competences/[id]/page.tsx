"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Tag {
  id: number;
  name: string;
}

interface Competence {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  tagColor: string;
  tags: Tag[];
}

export default function ViewCompetence() {
  const { id } = useParams();
  const [competence, setCompetence] = useState<Competence | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompetence = async () => {
      try {
        const res = await fetch(`/api/competences/${id}`);
        if (!res.ok) throw new Error("Erreur de chargement");
        const data = await res.json();
        setCompetence(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompetence();
  }, [id]);

  if (loading) return <p className="text-center mt-8">Chargement...</p>;
  if (!competence) return <p className="text-center mt-8 text-red-600">Compétence introuvable.</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-blue-700">{competence.title}</h2>
        <p className="text-gray-600 mt-1">#{competence.id}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-sm text-gray-500 mb-1">Icône</p>
          <div className="text-3xl">{competence.icon}</div>
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-1">Description</p>
          <p className="text-gray-800">{competence.description}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-1">Couleur de fond</p>
          <div className="w-full h-10 rounded" style={{ backgroundColor: competence.color }} />
          <span className="text-xs text-gray-600">{competence.color}</span>
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-1">Couleur des tags</p>
          <div className="w-full h-10 rounded" style={{ backgroundColor: competence.tagColor }} />
          <span className="text-xs text-gray-600">{competence.tagColor}</span>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-sm text-gray-500 mb-2">Tags associés</p>
        <div className="flex flex-wrap gap-2">
          {competence.tags.map((tag) => (
            <span
              key={tag.id}
              className="px-3 py-1 text-sm rounded-full text-white"
              style={{ backgroundColor: competence.tagColor }}
            >
              {tag.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
