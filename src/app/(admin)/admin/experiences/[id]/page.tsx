// app/admin/experiences/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface Experience {
  id: number;
  name: string;
  periode: string;
  lieu: string;
  description: string;
  imageUrl: string;
  services: { id: number; name: string }[];
}

export default function ViewExperience() {
  const { id } = useParams();
  const [experience, setExperience] = useState<Experience | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const res = await fetch(`/api/experiences/${id}`);
        if (!res.ok) throw new Error("Erreur lors du chargement");
        const data = await res.json();
        setExperience(data);
      } catch (err) {
        setError("Impossible de charger cette expérience.");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchExperience();
  }, [id]);

  if (loading) return <p className="text-center py-6">Chargement...</p>;
  if (error) return <p className="text-center text-red-600 py-6">{error}</p>;
  if (!experience) return null;

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow-xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">🧳 Détail de l'expérience</h1>
      <img
        src={experience.imageUrl}
        alt={experience.name}
        className="w-full h-64 object-cover rounded-xl mb-6"
      />

      <div className="space-y-4">
        <div>
          <h2 className="font-semibold text-gray-700">Nom :</h2>
          <p>{experience.name}</p>
        </div>
        <div>
          <h2 className="font-semibold text-gray-700">Période :</h2>
          <p>{experience.periode}</p>
        </div>
        <div>
          <h2 className="font-semibold text-gray-700">Lieu :</h2>
          <p>{experience.lieu}</p>
        </div>
        <div>
          <h2 className="font-semibold text-gray-700">Description :</h2>
          <p>{experience.description}</p>
        </div>
        <div>
          <h2 className="font-semibold text-gray-700">Services :</h2>
          <p>{experience.services.map((s) => s.name).join(", ")}</p>
        </div>
      </div>

      <div className="mt-6">
        <Link
          href={`/admin/experiences/${experience.id}/edit-experience`}
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Modifier cette expérience
        </Link>
      </div>
    </div>
  );
}
