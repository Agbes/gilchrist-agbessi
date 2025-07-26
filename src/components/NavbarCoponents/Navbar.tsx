"use client";

import { useState, useEffect } from "react";
import NavbarLinks from "./NavbarLinks";
import Link from "next/link";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Bloquer/débloquer le scroll du body selon isMenuOpen
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isMenuOpen]);

    // Fermer menu mobile si on passe en desktop (>= md)
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMenuOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        // Vérification au montage
        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const toggleMenu = () => setIsMenuOpen((prev) => !prev);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <nav
            id="navbar"
            className="fixed w-full z-50 transition-all duration-300 py-4"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
        >
            <div className="container mx-auto px-3">
                <div className="flex justify-between items-center">
                    <Link
                        href="/"
                        className="whitespace-nowrap text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600"
                    >
                        AGBESSI Gilchrist
                    </Link>

                    {/* Menu desktop */}
                    <div className="hidden md:flex space-x-8 px-4">
                        <NavbarLinks />
                    </div>

                    {/* Bouton mobile */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden text-white focus:outline-none
              border-2 border-white rounded-md p-2
              hover:border-blue-400 hover:bg-white hover:text-black
              transition-colors duration-300"
                        aria-label="Toggle mobile menu"
                    >
                        {isMenuOpen ? (
                            // Icône croix
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
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            // Icône hamburger
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
                                />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Overlay gris transparent à 30% */}
            {isMenuOpen && (
                <div
                    onClick={closeMenu}
                    className="fixed inset-0 z-40"
                    aria-hidden="true"
                />
            )}

            {/* Menu mobile */}
            {isMenuOpen && (
                <div
                    className="fixed top-[60px] left-0 right-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-700 py-4 rounded-b-lg shadow-lg z-50"
                    style={{ maxHeight: "calc(100vh - 60px)", overflowY: "auto" }}
                >
                    <div className="container mx-auto px-6 flex flex-col space-y-4 text-white">
                        <NavbarLinks onLinkClick={closeMenu} />
                    </div>
                </div>
            )}
        </nav>
    );
}
