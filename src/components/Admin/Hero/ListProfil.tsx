"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Profil {
  id: number;
  name: string;
  title: string;
  description: string;
}

export default function ListProfil() {
  const [profils, setProfils] = useState<Profil[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfils = async () => {
      try {
        const res = await fetch("/api/profils");
        if (!res.ok) throw new Error("Erreur lors du chargement des profils.");
        const data = await res.json();
        setProfils(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfils();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Supprimer ce profil ?")) return;

    try {
      const res = await fetch(`/api/profils/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProfils((prev) => prev.filter((p) => p.id !== id));
      } else {
        alert("Échec de la suppression.");
      }
    } catch (error) {
      console.error("Erreur suppression :", error);
      alert("Erreur lors de la suppression.");
    }
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-xl shadow animate-pulse space-y-4">
        <div className="flex justify-between items-center mb-4">
          <div className="h-6 w-1/3 bg-gray-200 rounded" />
          <div className="h-8 w-40 bg-gray-300 rounded" />
        </div>
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-4 gap-4 items-center border-b py-3"
          >
            <div className="h-4 bg-gray-200 rounded w-3/4 col-span-1" />
            <div className="h-4 bg-gray-200 rounded w-2/3 col-span-1" />
            <div className="h-4 bg-gray-200 rounded w-full col-span-1" />
            <div className="flex gap-2 col-span-1">
              <div className="h-8 w-16 bg-gray-300 rounded" />
              <div className="h-8 w-16 bg-gray-300 rounded" />
              <div className="h-8 w-20 bg-gray-300 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error)
    return <p className="text-red-600 text-sm bg-red-100 p-2 rounded">{error}</p>;

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Liste des Profils</h2>
        <Link
          className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 text-sm"
          href="/admin/profil/new-profil"
        >
          Ajouter un profil
        </Link>
      </div>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-100 text-gray-600 text-sm">
            <th className="py-3 px-4">Nom & Prénoms</th>
            <th className="py-3 px-4">Titre</th>
            <th className="py-3 px-4">Description</th>
            <th className="py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {profils.map((profil) => (
            <tr key={profil.id} className="hover:bg-gray-50 border-b">
              <td className="py-3 px-4">{profil.name}</td>
              <td className="py-3 px-4">{profil.title}</td>
              <td className="py-3 px-4">
                {profil.description.split(" ").slice(0, 10).join(" ")}
                {profil.description.split(" ").length > 10 && "..."}
              </td>
              <td className="py-3 px-4">
                <div className="flex space-x-2">
                  <Link
                    className="px-2 py-1 rounded bg-green-600 text-white hover:bg-green-700 text-sm"
                    href={`/admin/profil/${profil.id}/edit-profil`}
                  >
                    Modifier
                  </Link>
                  <Link
                    className="px-2 py-1 rounded bg-yellow-500 text-white hover:bg-yellow-600 text-sm"
                    href={`/admin/profil/${profil.id}`}
                  >
                    Voir
                  </Link>
                  <button
                    className="px-2 py-1 rounded bg-red-600 text-white hover:bg-red-700 text-sm"
                    onClick={() => handleDelete(profil.id)}
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
