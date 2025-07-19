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

export default function NavbarLinks() {
  return (
    <>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="nav-link hover:text-blue-400 transition-colors whitespace-nowrap"
        >
          {link.label}
        </Link>
      ))}
    </>
  );
}
