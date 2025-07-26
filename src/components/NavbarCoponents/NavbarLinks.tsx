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
          className="py-1 hover:border-b-2 hover:border-blue-500 focus:border-b-2 focus:border-blue-500 active:border-b-2 active:border-blue-500 transition-all duration-200 whitespace-nowrap"
          onClick={onLinkClick}
        >
          {link.label}
        </Link>
      ))}
    </>
  );
}
