import Link from "next/link";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/about", label: "À propos" },
  { href: "/skills", label: "Compétences" },
  { href: "/projects", label: "Projets" },
  { href: "/experience", label: "Expérience" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function NavbarLinks({ onLinkClick }: { onLinkClick?: () => void }) {
  return (
    <>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={onLinkClick}
          className="px-2 py-1 text-sm font-medium text-white hover:text-blue-400 transition-colors duration-200 border-b-2 border-transparent hover:border-blue-400"
        >
          {link.label}
        </Link>
      ))}
    </>
  );
}
