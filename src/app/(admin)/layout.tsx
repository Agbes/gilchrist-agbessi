import type { Metadata } from "next";
import Sidebar from "@/components/Admin/Sidebar";
import Header from "@/components/Admin/Header";
import StatsCards from "@/components/Admin/StatsCards";

export const metadata: Metadata = {
  title: "Tableau de bord",
  description: "Espace d'administration du portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar fixe */}
      <Sidebar />

      {/* Contenu principal avec marge à gauche */}
      <main className="ml-64 p-8">
        <Header />
        <StatsCards />
        {children}
      </main>
    </div>
  );
}
