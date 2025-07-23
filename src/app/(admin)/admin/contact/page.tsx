"use client";

import { useEffect, useState } from "react";

interface ContactMessage {
    id: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    createdAt: string;
}

export default function ContactPage() {
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await fetch("/api/messages");
                if (!res.ok) throw new Error("Erreur lors du chargement");
                const data = await res.json();
                setMessages(data);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Erreur inconnue");
                }
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
                setMessages((prev) => prev.filter((msg) => msg.id !== id));
            } else {
                alert("Échec de la suppression");
            }
        } catch (err) {
            console.error(err);
            alert("Erreur lors de la suppression");
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white shadow rounded-xl">
            <h1 className="text-2xl font-bold mb-6">📬 Messages reçus</h1>

            {loading && <p>Chargement...</p>}
            {error && <p className="text-red-600">{error}</p>}
            {!loading && messages.length === 0 && (
                <p className="text-gray-500 text-center">Aucun message trouvé.</p>
            )}

            {messages.length > 0 && (
                <div className="space-y-4">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className="border border-gray-200 rounded-lg p-4 shadow-sm bg-gray-50"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h2 className="font-semibold text-lg">{msg.subject}</h2>
                                    <p className="text-sm text-gray-600">
                                        {msg.name} • {msg.email}
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleDelete(msg.id)}
                                    className="text-red-600 hover:text-red-800 text-sm"
                                >
                                    Supprimer
                                </button>
                            </div>
                            <p className="text-gray-800 whitespace-pre-line">{msg.message}</p>
                            <p className="text-right text-xs text-gray-500 mt-2">
                                Reçu le {new Date(msg.createdAt).toLocaleString()}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
