"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import NavbarLinks from "./NavbarLinks";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav
      className={`fixed top-0 w-full z-50 backdrop-blur-sm transition-all duration-300 bg-black/60 shadow-md`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent"
        >
          AGBESSI Gilchrist
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8">
          <NavbarLinks />
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white p-2 rounded-md border border-white hover:bg-white hover:text-black transition-all duration-300"
          aria-label="Toggle mobile menu"
        >
          {isMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          onClick={closeMenu}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-[64px] left-0 right-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-700 text-white transition-all duration-300 z-50 rounded-b-xl shadow-xl transform ${
          isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0 pointer-events-none"
        }`}
        style={{ maxHeight: "calc(100vh - 64px)" }}
      >
        <div className="px-6 py-4 space-y-4 flex flex-col">
          <NavbarLinks onLinkClick={closeMenu} />
        </div>
      </div>
    </nav>
  );
}
