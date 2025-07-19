"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Competence {
  id: number;
  title: string;
  description: string;
  tags: { name: string }[];
}

export default function CompetenceTable() {
  const [competences, setCompetences] = useState<Competence[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/competences")
      .then((res) => res.json())
      .then(setCompetences)
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Supprimer cette compétence ?")) return;

    const res = await fetch(`/api/competences/${id}`, { method: "DELETE" });
    if (res.ok) setCompetences((prev) => prev.filter((c) => c.id !== id));
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-xl shadow space-y-4 animate-pulse">
        <div className="flex justify-between items-center mb-4">
          <div className="h-6 w-1/3 bg-gray-200 rounded" />
          <div className="h-8 w-40 bg-gray-300 rounded" />
        </div>

        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="grid grid-cols-4 gap-4 border-b py-3 items-center"
            >
              <div className="h-4 bg-gray-200 rounded w-3/4 col-span-1" />
              <div className="h-4 bg-gray-200 rounded w-full col-span-1" />
              <div className="h-4 bg-gray-200 rounded w-1/2 col-span-1" />
              <div className="flex gap-2 col-span-1">
                <div className="h-8 w-16 bg-gray-300 rounded" />
                <div className="h-8 w-16 bg-gray-300 rounded" />
                <div className="h-8 w-20 bg-gray-300 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Liste des compétences
        </h2>
        <Link
          className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 text-sm"
          href="/admin/competences/new-competence"
        >
          Ajouter une compétence
        </Link>
      </div>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-100 text-gray-600 text-sm">
            <th className="py-3 px-4">Titre</th>
            <th className="py-3 px-4">Description</th>
            <th className="py-3 px-4">Tags</th>
            <th className="py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {competences.map((comp) => (
            <tr key={comp.id} className="hover:bg-gray-50 border-b">
              <td className="py-3 px-4">{comp.title}</td>
              <td className="py-3 px-4">
                {comp.description.slice(0, 50)}...
              </td>
              <td className="py-3 px-4">
                {comp.tags.map((t) => (
                  <span
                    key={t.name}
                    className="inline-block text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded mr-1"
                  >
                    {t.name}
                  </span>
                ))}
              </td>
              <td className="py-3 px-4">
                <div className="flex space-x-2">
                  <Link
                    className="px-2 py-1 rounded bg-yellow-500 text-white hover:bg-yellow-600 text-sm"
                    href={`/admin/competences/${comp.id}`}
                  >
                    Voir
                  </Link>
                  <Link
                    href={`/admin/competences/${comp.id}/edit-competence`}
                    className="px-2 py-1 rounded bg-green-600 text-white text-sm hover:bg-green-700"
                  >
                    Modifier
                  </Link>
                  <button
                    onClick={() => handleDelete(comp.id)}
                    className="px-2 py-1 rounded bg-red-600 text-white text-sm hover:bg-red-700"
                  >
                    Supprimer
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
