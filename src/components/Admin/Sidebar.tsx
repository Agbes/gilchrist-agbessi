"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, User, LayoutDashboard, BadgeCheck, Code2, Briefcase, Info, Mail } from "lucide-react";
import LogoutButton from "./LogoutButton";

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/admin", label: "Articles", icon: <LayoutDashboard size={18} /> },
    { href: "/admin/profil", label: "Profil", icon: <User size={18} /> },
    { href: "/admin/competences", label: "Compétences", icon: <BadgeCheck size={18} /> },
    { href: "/admin/projects", label: "Projets", icon: <Code2 size={18} /> },
    { href: "/admin/experiences", label: "Expériences", icon: <Briefcase size={18} /> },
    { href: "/admin/contact", label: "Contact", icon: <Mail size={18} /> },
    { href: "/admin/info", label: "Informations", icon: <Info size={18} /> },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <aside className="bg-white shadow-md h-screen w-64 flex flex-col justify-between z-30 fixed">
      <div>
        <div className="p-6 border-b border-gray-200 text-center">
          <h2 className="text-2xl font-bold text-blue-600">AGBESSI Gilchrist</h2>
          <span className="text-sm text-gray-600 mt-1 block">Admin Panel</span>
        </div>
        <nav className="py-4 space-y-1">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              <div
                className={`flex items-center gap-3 px-6 py-3 cursor-pointer transition-all 
                ${isActive(link.href)
                    ? "bg-blue-100 border-l-4 border-blue-500 text-blue-700"
                    : "hover:bg-blue-50 border-l-4 border-transparent text-gray-800"
                  }`}
              >
                {link.icon}
                <span className="font-medium">{link.label}</span>
              </div>
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-6 border-t border-gray-200">
        <LogoutButton />
      </div>
    </aside>
  );
}
