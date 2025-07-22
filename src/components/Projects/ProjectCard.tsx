import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  name: string;
  nature: string;
  description: string;
  language: string[];
  imageUrl: string; // ✅ Nouvelle prop
}

export default function ProjectCard({
  name,
  nature,
  description,
  language,
  imageUrl,
}: ProjectCardProps) {
  return (
    <div className="bg-slate-900 rounded-xl overflow-hidden shadow-md card-hover">
      {/* ✅ Image en haut de la carte */}
      <div className="h-48 w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={name}
          width={600}
          height={300}
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Contenu de la carte */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold">{name}</h3>
          <span className="px-2 py-1 bg-blue-900 text-blue-300 rounded-full text-xs whitespace-nowrap">
            {nature}
          </span>

        </div>
        <p className="text-slate-400 mb-4">{description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {language.map((lang, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-slate-800 text-slate-300 rounded-full text-xs"
            >
              {lang}
            </span>
          ))}
        </div>

        <div className="flex space-x-3">
          <Link href="#" className="text-blue-400 hover:text-blue-300">
            <i className="fas fa-external-link-alt"></i>
          </Link>
          <Link href="#" className="text-blue-400 hover:text-blue-300">
            <i className="fab fa-github"></i>
          </Link>
        </div>
      </div>
    </div>
  );
}
