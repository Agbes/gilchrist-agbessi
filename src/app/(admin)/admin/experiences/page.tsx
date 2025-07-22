"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Experience {
  id: number;
  name: string;
  periode: string;
  lieu: string;
  description: string;
  imageUrl: string;
  services: { id: number; name: string }[];
}

export default function ExperienceList() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const res = await fetch("/api/experiences");
        if (!res.ok) throw new Error("Erreur de chargement");
        const data = await res.json();
        setExperiences(data);
      } catch {
        setError("Impossible de charger les expériences");
      } finally {
        setLoading(false);
      }
    };
    fetchExperiences();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Supprimer cette expérience ?")) return;
    try {
      const res = await fetch(`/api/experiences/${id}`, { method: "DELETE" });
      if (res.ok) {
        setExperiences((prev) => prev.filter((e) => e.id !== id));
      } else {
        alert("Erreur lors de la suppression");
      }
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la suppression");
    }
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-xl shadow max-w-6xl mx-auto animate-pulse space-y-6">
        <div className="flex justify-between items-center">
          <div className="h-6 bg-gray-200 rounded w-1/4" />
          <div className="h-10 bg-gray-300 rounded w-40" />
        </div>
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center space-x-4 py-4 border-b">
            <div className="w-16 h-16 bg-gray-200 rounded" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-1/4" />
              <div className="h-4 bg-gray-200 rounded w-1/3" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
            <div className="space-x-2 flex">
              <div className="w-16 h-8 bg-gray-300 rounded" />
              <div className="w-16 h-8 bg-gray-300 rounded" />
              <div className="w-20 h-8 bg-gray-300 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <p className="text-red-600 text-center py-6">{error}</p>;
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">🧳 Liste des expériences</h2>
        <Link
          href="/admin/experiences/new-experience"
          className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 text-sm"
        >
          ➕ Ajouter une expérience
        </Link>
      </div>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-100 text-gray-600 text-sm">
            <th className="py-3 px-4">Image</th>
            <th className="py-3 px-4">Nom</th>
            <th className="py-3 px-4">Période</th>
            <th className="py-3 px-4">Lieu</th>
            <th className="py-3 px-4">Services</th>
            <th className="py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {experiences.map((exp) => (
            <tr key={exp.id} className="hover:bg-gray-50 border-b align-middle">
              <td className="py-3 px-4">
                <Image
                  src={exp.imageUrl}
                  alt={exp.name}
                  className="w-16 h-16 object-cover rounded"
                  width={64}
                  height={64}
                />
              </td>
              <td className="py-3 px-4 font-medium">{exp.name}</td>
              <td className="py-3 px-4">{exp.periode}</td>
              <td className="py-3 px-4">{exp.lieu}</td>
              <td className="py-3 px-4">
                {exp.services.map((s) => s.name).join(", ")}
              </td>
              <td className="py-3 px-4">
                <div className="flex space-x-2">
                  <Link
                    href={`/admin/experiences/${exp.id}/edit-experience`}
                    className="px-2 py-1 rounded bg-green-600 text-white hover:bg-green-700 text-sm"
                  >
                    Modifier
                  </Link>
                  <Link
                    href={`/admin/experiences/${exp.id}`}
                    className="px-2 py-1 rounded bg-yellow-500 text-white hover:bg-yellow-600 text-sm"
                  >
                    Voir
                  </Link>
                  <button
                    onClick={() => handleDelete(exp.id)}
                    className="px-2 py-1 rounded bg-red-600 text-white hover:bg-red-700 text-sm"
                  >
                    Supprimer
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {experiences.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center py-6 text-gray-500">
                Aucune expérience trouvée.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
