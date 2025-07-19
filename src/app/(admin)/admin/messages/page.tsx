"use client";

import { useEffect, useState } from "react";

interface Message {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export default function MessageList() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch("/api/messages");
        const data = await res.json();
        setMessages(data);
      } catch (e) {
        setError("Erreur de chargement des messages");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Supprimer ce message ?")) return;
    try {
      const res = await fetch(`/api/messages/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
      } else {
        alert("Échec de la suppression.");
      }
    } catch (error) {
      alert("Erreur lors de la suppression.");
    }
  };

  if (loading) return <p className="text-center py-6">Chargement...</p>;
  if (error) return <p className="text-red-600 text-center py-6">{error}</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">📬 Messages reçus</h2>
      <div className="space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className="border p-4 rounded-md shadow-sm">
            <div className="flex justify-between">
              <div>
                <h3 className="font-semibold">{msg.subject}</h3>
                <p className="text-sm text-gray-500">{msg.email} • {new Date(msg.createdAt).toLocaleString()}</p>
              </div>
              <button
                onClick={() => handleDelete(msg.id)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Supprimer
              </button>
            </div>
            <p className="mt-2"><strong>{msg.name}</strong>: {msg.message}</p>
          </div>
        ))}
        {messages.length === 0 && (
          <p className="text-center text-gray-500">Aucun message pour l’instant.</p>
        )}
      </div>
    </div>
  );
}
