"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";



export default function LogoutButton() {


  return (
    <button
      onClick={() => signOut({ callbackUrl: "/sign-in" })}
      className="flex items-center gap-2 px-4 py-2 w-full text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition"
    >
      <LogOut size={18} />
      Déconnexion
    </button>
  );
}
