import Link from "next/link";

// app/not-found.tsx
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4 text-center">
      <h1 className="text-5xl font-bold text-red-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page introuvable</h2>
      <p className="text-gray-600 mb-6">
        Désolé, la page que vous cherchez n&apos;existe pas ou a été supprimée.
      </p>
      <Link
        href="/"
        className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
      >
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}
