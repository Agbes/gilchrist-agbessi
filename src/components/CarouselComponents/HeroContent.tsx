import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function HeroContent() {
  const hero = await prisma.hero.findFirst();

  if (!hero) return null;

  return (
    <div className="relative z-20 container mx-auto px-4 md:px-6 text-center max-w-3xl bg-black/70 backdrop-blur-md rounded-3xl py-10 md:py-14 animate-fade-in-up transition-all duration-1000">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white">
        Bonjour, je suis{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
          Gilchrist AGBESSI
        </span>
      </h1>

      <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-600 mx-auto mb-6 rounded-full" />

      <h2 className="text-xl sm:text-2xl md:text-3xl mb-4 text-blue-200">
        {hero.title}
      </h2>
      <p className="text-base sm:text-lg text-blue-100 mb-8">
        {hero.description}
      </p>

      <div className="flex flex-wrap justify-center gap-4">
        <Link
          href="/projects"
          className="px-5 py-3 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition"
        >
          Voir mes projets
        </Link>
        <Link
          href="/contact"
          className="px-5 py-3 rounded-xl bg-cyan-500 text-white hover:bg-cyan-600 transition"
        >
          Me contacter
        </Link>
        <Link
          href="/cv/cv-gilchrist-agbessi.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-3 rounded-xl bg-green-500 text-white hover:bg-green-600 flex items-center gap-2 transition"
        >
          <span>Mon CV</span>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
