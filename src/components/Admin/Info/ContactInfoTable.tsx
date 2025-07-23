"use client";
import * as FaIcons from "react-icons/fa";
import { useEffect, useState } from "react";
import Link from "next/link";

interface ContactInfo {
  id: number;
  type: string;
  label: string;
  value: string;
  icon: string;
  color: string;
}

export default function ContactInfoTable() {
  const [infos, setInfos] = useState<ContactInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchInfos() {
      try {
        const res = await fetch("/api/contact-info");
        if (!res.ok) throw new Error("Erreur lors du chargement");
        const data = await res.json();
        setInfos(data);
      } catch (e) {
        setError((e as Error).message);
      } finally {
        setLoading(false);
      }
    }
    fetchInfos();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Supprimer cette info de contact ?")) return;
    try {
      const res = await fetch(`/api/contact-info/${id}`, { method: "DELETE" });
      if (res.ok) {
        setInfos((prev) => prev.filter((i) => i.id !== id));
      } else {
        alert("Échec de la suppression.");
      }
    } catch {
      alert("Erreur lors de la suppression.");
    }
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-xl shadow mt-10">
        <div className="flex justify-between items-center mb-4 animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/5" />
          <div className="h-6 bg-gray-200 rounded w-1/4" />
          <div className="h-6 bg-gray-200 rounded w-1/3" />
          <div className="h-6 bg-gray-200 rounded w-1/6" />
          <div className="h-6 bg-gray-200 rounded w-1/6" />
          <div className="h-6 bg-gray-200 rounded w-1/5" />
        </div>
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex animate-pulse border-b py-3 gap-4">
            <div className="w-1/5 h-5 bg-gray-200 rounded" />
            <div className="w-1/4 h-5 bg-gray-200 rounded" />
            <div className="w-1/3 h-5 bg-gray-200 rounded" />
            <div className="w-1/6 h-5 bg-gray-200 rounded" />
            <div className="w-1/6 h-5 bg-gray-200 rounded" />
            <div className="w-1/5 h-5 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (error) return <p className="text-red-600 mt-10">Erreur : {error}</p>;

  return (
    <div className="bg-white p-6 rounded-xl shadow mt-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Informations de contact</h2>
        <Link
          href="/admin/info/informations/new-information"
          className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 text-sm"
        >
          Ajouter une info
        </Link>
      </div>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-100 text-gray-600 text-sm">
            <th className="py-3 px-4">Type</th>
            <th className="py-3 px-4">Label</th>
            <th className="py-3 px-4">Valeur</th>
            <th className="py-3 px-4">Icône</th>
            <th className="py-3 px-4">Couleur</th>
            <th className="py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {infos.map((info) => (
            <tr key={info.id} className="hover:bg-gray-50 border-b">
              <td className="py-3 px-4">{info.type}</td>
              <td className="py-3 px-4">{info.label}</td>
              <td className="py-3 px-4 max-w-xs break-words">{info.value}</td>
              <td className="py-3 px-4">
                {
                  (() => {
                    const Icon = FaIcons[info.icon as keyof typeof FaIcons];
                    return Icon ? (
                      <Icon className="text-xl" style={{ color: info.color }} />
                    ) : (
                      <span>{info.icon}</span>
                    );
                  })()
                }
              </td>

              <td className="py-3 px-4">
                <div
                  className="w-6 h-6 rounded-full border"
                  style={{ backgroundColor: info.color }}
                />
              </td>
              <td className="py-3 px-4 space-x-2">

                <Link
                  href={`/admin/info/informations/${info.id}/edit-information`}
                  className="px-2 py-1 rounded bg-green-600 text-white hover:bg-green-700 text-sm"
                >
                  Modifier
                </Link>
                <button
                  onClick={() => handleDelete(info.id)}
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
