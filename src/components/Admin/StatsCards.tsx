"use client";

import { useEffect, useState } from "react";

type Stat = {
  title: string;
  value: number | string;
};

export default function StatsCards() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        setLoading(true);
        const res = await fetch("/api/stats");
        if (!res.ok) throw new Error("Erreur de chargement");
        const data = await res.json();
        setStats([
          { title: "Articles", value: data.articlesCount },
          { title: "Messages reçus", value: data.messagesCount },
        ]);
        setError(null);
      } catch (e) {
        setError("Impossible de charger les statistiques");
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-xl shadow animate-pulse"
          >
            <div className="h-4 w-24 bg-gray-200 rounded mb-4"></div>
            <div className="h-8 w-32 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 w-20 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-6 text-red-600 font-semibold">{error}</div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-xl shadow hover:-translate-y-1 transition-transform"
        >
          <h3 className="text-sm text-gray-500 font-medium mb-2">{stat.title}</h3>
          <div className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</div>
        </div>
      ))}
    </div>
  );
}
