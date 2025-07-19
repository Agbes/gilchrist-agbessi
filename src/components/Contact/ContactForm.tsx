"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

// 🧩 Schéma Zod pour validation
const schema = z.object({
  name: z.string().min(2, "Nom requis"),
  email: z.string().email("Email invalide"),
  subject: z.string().min(2, "Sujet requis"),
  message: z.string().min(10, "Message trop court"),
});

type ContactFormData = z.infer<typeof schema>;

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(schema),
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (data: ContactFormData) => {
    setSuccess("");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.error || "Une erreur est survenue");
      }

      setSuccess("✅ Message envoyé avec succès !");
      reset();
    } catch (err: any) {
      setError(err.message || "Erreur inconnue");
    }
  };

  return (
    <div className="lg:w-1/2">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {success && <p className="text-green-500 bg-green-100 p-2 rounded">{success}</p>}
        {error && <p className="text-red-500 bg-red-100 p-2 rounded">{error}</p>}

        {/* Champ : name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">Nom complet</label>
          <input
            type="text"
            id="name"
            placeholder="Votre nom"
            {...register("name")}
            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        {/* Champ : email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            id="email"
            placeholder="votre@email.com"
            {...register("email")}
            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        {/* Champ : subject */}
        <div>
          <label htmlFor="subject" className="block text-sm font-medium mb-2">Sujet</label>
          <input
            type="text"
            id="subject"
            placeholder="Sujet du message"
            {...register("subject")}
            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>}
        </div>

        {/* Champ : message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
          <textarea
            id="message"
            rows={4}
            placeholder="Décrivez votre projet ou votre demande..."
            {...register("message")}
            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
        </div>

        {/* Bouton submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg transition-opacity ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
          }`}
        >
          {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
        </button>
      </form>
    </div>
  );
}
