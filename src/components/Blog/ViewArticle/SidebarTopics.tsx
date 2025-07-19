"use client";

import { useEffect, useState } from "react";

type Topic = {
  id: number;
  name: string;
};

export default function SidebarTopics() {
  const [topics, setTopics] = useState<Topic[]>([]);

  useEffect(() => {
    async function fetchTopics() {
      try {
        const res = await fetch("/api/topics");

        const data = await res.json();
        setTopics(data);
      } catch (error) {
        console.error("Erreur chargement des topics :", error);
      }
    }

    fetchTopics();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow p-4 text-black">
      <h3 className="font-bold mb-3">Autres Thèmes</h3>
      <ul className="space-y-2 text-sm">
        {topics.map((topic) => (
          <li
            key={topic.id}
            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded cursor-pointer"
          >
            {topic.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
