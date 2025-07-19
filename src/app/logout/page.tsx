// app/logout/page.tsx
"use client";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.push("/sign-in");
  };

  return (
    <button onClick={handleLogout} className="btn btn-error">
      Déconnexion
    </button>
  );
}
