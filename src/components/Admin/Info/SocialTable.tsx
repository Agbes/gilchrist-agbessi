"use client";
import { FaLinkedinIn, FaTwitter, FaGithub, FaDribbble } from "react-icons/fa";
import { useEffect, useState } from "react";
import Link from "next/link";

interface SocialPlatform {
  id: number;
  name: string;
  icon: string;
  color: string;
  url: string;  // un seul URL par plateforme
}

export default function SocialPlatformTable() {
  const [platforms, setPlatforms] = useState<SocialPlatform[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPlatforms() {
      try {
        const res = await fetch("/api/social-platform");
        if (!res.ok) throw new Error("Erreur lors du chargement");
        const data = await res.json();
        setPlatforms(data);
      } catch (e) {
        setError((e as Error).message);
      } finally {
        setLoading(false);
      }
    }
    fetchPlatforms();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Supprimer cette plateforme ?")) return;
    try {
      const res = await fetch(`/api/social-platform/${id}`, { method: "DELETE" });
      if (res.ok) {
        setPlatforms((prev) => prev.filter((p) => p.id !== id));
      } else {
        alert("Échec de la suppression.");
      }
    } catch {
      alert("Erreur lors de la suppression.");
    }
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-xl shadow">
        {/* Skeleton loading ici (comme avant) */}
        Chargement...
      </div>
    );
  }

  if (error) return <p className="text-red-600">Erreur : {error}</p>;

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Réseaux sociaux</h2>
        <Link
          href="/admin/info/social/new-social"
          className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 text-sm"
        >
          Ajouter une plateforme
        </Link>
      </div>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-100 text-gray-600 text-sm">
            <th className="py-3 px-4">Nom</th>
            <th className="py-3 px-4">Icône</th>
            <th className="py-3 px-4">Couleur</th>
            <th className="py-3 px-4">URL du profil</th>
            <th className="py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {platforms.map((p) => (
            <tr key={p.id} className="hover:bg-gray-50 border-b">
              <td className="py-3 px-4 font-medium">{p.name}</td>
              <td className="py-3 px-4">{p.icon}</td>
              <td className="py-3 px-4">
                <div
                  className="w-6 h-6 rounded-full border"
                  style={{ backgroundColor: p.color }}
                />
              </td>
              <td className="py-3 px-4 max-w-xs break-words">{p.url}</td>
              <td className="py-3 px-4 space-x-2">
                <Link
                  href={`/admin/info/social/${p.id}/edit-social`}
                  className="px-2 py-1 rounded bg-green-600 text-white hover:bg-green-700 text-sm"
                >
                  Modifier
                </Link>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="px-2 py-1 rounded bg-red-600 text-white hover:bg-red-700 text-sm"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
