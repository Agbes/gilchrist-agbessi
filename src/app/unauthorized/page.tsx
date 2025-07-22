import Link from "next/link";

// app/unauthorized/page.tsx
export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-red-600">Accès refusé</h1>
        <p className="text-lg">Vous n'avez pas l'autorisation pour accéder à cette page.</p>
        <Link
          href="/"
          className="text-blue-600 underline hover:text-blue-800 transition"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  )
}
