import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function HeroContent() {
  const hero = await prisma.hero.findFirst();

  if (!hero) return null;

  return (
    <div className="relative z-10 container mx-auto px-6 text-center max-w-3xl bg-black/70 p-8 rounded-[50px]">
      <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
        Bonjour, je suis{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
          Gilchrist AGBESSI
        </span>
      </h1>
      <h2 className="text-2xl md:text-3xl mb-6 text-blue-100">
        {hero.title}
      </h2>
      <p className="text-lg mb-10 text-blue-50">
        {hero.description}
      </p>
      <div className="flex justify-center gap-4">
        <Link href="/projects" className="btn btn-soft btn-primary">
          Voir mes projets
        </Link>
        <Link href="/contact" className="btn btn-info">
          Me contacter
        </Link>
        <Link
          href="/cv/cv-gilchrist-agbessi.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-info flex items-center gap-2"
        >
          <span>Mon CV</span>
          <svg className="btn btn-success" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </Link>

      </div>
    </div>
  );
}
