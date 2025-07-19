"use client";

import { useEffect } from "react";
import NavbarLinks from "./NavbarLinks";
import Link from "next/link";

export default function Navbar() {
  useEffect(() => {
    const mobileMenuButton = document.getElementById("mobile-menu-button");
    const mobileMenu = document.getElementById("mobile-menu");

    const toggleMenu = () => {
      mobileMenu?.classList.toggle("hidden");
    };

    mobileMenuButton?.addEventListener("click", toggleMenu);

    return () => {
      mobileMenuButton?.removeEventListener("click", toggleMenu);
    };
  }, []);

  return (
    <nav
      id="navbar"
      className="fixed w-full z-50 transition-all duration-300 py-4"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="whitespace-nowrap text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600"
          >
            AGBESSI Gilchrist
          </Link>

          <div className="hidden md:flex space-x-8">
            <NavbarLinks />
          </div>

          <button
            id="mobile-menu-button"
            className="md:hidden text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className="hidden md:hidden bg-slate-800 mt-2 py-2"
      >
        <div className="container mx-auto px-6 flex flex-col space-y-3">
          <NavbarLinks />
        </div>
      </div>
    </nav>
  );
}
