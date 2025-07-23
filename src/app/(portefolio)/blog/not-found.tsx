import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-xl text-center">
        <h1 className="text-5xl font-bold text-sky-700 mb-4">404</h1>
        <p className="text-xl text-gray-700 mb-6">
          Oups ! L&apos;article que vous cherchez n&apos;existe pas ou a été supprimé.
        </p>

        <Link
          href="/blog"
          className="inline-block bg-sky-700 hover:bg-sky-800 text-white px-6 py-3 rounded-lg transition"
        >
          Retour au blog
        </Link>
      </div>
    </div>
  );
}
