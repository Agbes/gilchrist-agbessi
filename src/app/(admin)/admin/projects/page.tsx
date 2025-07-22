"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Project {
  id: number;
  name: string;
  nature: string;
  description: string;
  imageUrl: string;
}

export default function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        if (!res.ok) throw new Error("Erreur lors du chargement des projets");
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Supprimer ce projet ?")) return;

    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
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
      <div className="bg-white p-6 rounded-xl shadow space-y-4 animate-pulse">
        <div className="flex justify-between items-center mb-4">
          <div className="h-6 bg-gray-200 rounded w-1/3" />
          <div className="h-8 bg-gray-300 rounded w-32" />
        </div>
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-4 py-3 border-b">
            <div className="w-16 h-16 bg-gray-200 rounded" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-1/4" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
              <div className="h-4 bg-gray-200 rounded w-3/4" />
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
    return <p className="text-red-600 text-sm bg-red-100 p-2 rounded">{error}</p>;
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Liste des projets</h2>
        <Link
          className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 text-sm"
          href="/admin/projects/new-project"
        >
          Ajouter un projet
        </Link>
      </div>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-100 text-gray-600 text-sm">
            <th className="py-3 px-4">Image</th>
            <th className="py-3 px-4">Nom</th>
            <th className="py-3 px-4">Nature</th>
            <th className="py-3 px-4">Description</th>
            <th className="py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id} className="hover:bg-gray-50 border-b align-middle">
              <td className="py-3 px-4">
                <Image
                  src={project.imageUrl}
                  alt={project.name}
                  className="w-16 h-16 object-cover rounded"
                  width={64}
                  height={64}
                />
              </td>
              <td className="py-3 px-4 font-medium">{project.name}</td>
              <td className="py-3 px-4">{project.nature}</td>
              <td className="py-3 px-4">
                {project.description.split(" ").slice(0, 10).join(" ")}
                {project.description.split(" ").length > 10 && "..."}
              </td>
              <td className="py-3 px-4">
                <div className="flex space-x-2">
                  <Link
                    className="px-2 py-1 rounded bg-green-600 text-white hover:bg-green-700 text-sm"
                    href={`/admin/projects/${project.id}/edit-project`}
                  >
                    Modifier
                  </Link>
                  <Link
                    className="px-2 py-1 rounded bg-yellow-500 text-white hover:bg-yellow-600 text-sm"
                    href={`/admin/projects/${project.id}`}
                  >
                    Voir
                  </Link>
                  <button
                    className="px-2 py-1 rounded bg-red-600 text-white hover:bg-red-700 text-sm"
                    onClick={() => handleDelete(project.id)}
                  >
                    Supprimer
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {projects.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center py-6 text-gray-500">
                Aucun projet trouvé.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
