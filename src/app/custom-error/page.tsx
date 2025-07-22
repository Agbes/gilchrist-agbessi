// app/custom-error/page.tsx
"use client"
import { useRouter } from "next/navigation"

export default function OAuthErrorPage() {
  const router = useRouter();

  return (
    
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Connexion expirée</h1>
      <p className="mb-6">Le délai pour terminer la connexion a été dépassé. Veuillez réessayer.</p>
      <button
        onClick={() => router.push("/sign-in")}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Revenir à la page de connexion
      </button>
    </div>
  );
}
