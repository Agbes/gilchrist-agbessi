"use client";

import { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";
import SocialLinks from "./SocialLinks";

interface ContactInfo {
  id: number;
  type: string;
  label: string;
  value: string;
  icon: string; // nom exact d'un composant dans FaIcons, ex: "FaEnvelope"
  color: string;
}

export default function ContactInfo() {
  const [infos, setInfos] = useState<ContactInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/contact-info")
      .then((res) => res.json())
      .then(setInfos)
      .catch(() => setInfos([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="lg:w-1/2 space-y-6 animate-pulse">
        {/* Titre skeleton */}
        <div className="h-8 w-48 bg-gray-300 rounded mb-6"></div>

        {/* Paragraphe skeleton */}
        <div className="h-4 w-full max-w-md bg-gray-300 rounded mb-8"></div>

        {/* Skeleton pour les infos */}
        {[1, 2, 3].map((_, i) => (
          <div key={i} className="flex items-start space-x-4">
            <div className="rounded-full h-10 w-10 bg-gray-300"></div>
            <div className="flex flex-col space-y-2">
              <div className="h-4 w-32 bg-gray-300 rounded"></div>
              <div className="h-4 w-48 bg-gray-300 rounded"></div>
            </div>
          </div>
        ))}

        {/* Skeleton section "Suivez-moi" */}
        <div className="mt-10">
          <div className="h-6 w-24 bg-gray-300 rounded mb-4"></div>
          <div className="flex space-x-4">
            {[1, 2, 3, 4].map((_, i) => (
              <div key={i} className="h-10 w-10 rounded-full bg-gray-300"></div>
            ))}
          </div>
        </div>
      </div>
    );

  return (
    <div className="lg:w-1/2">
      <h3 className="text-2xl font-semibold mb-6">Discutons de votre projet</h3>
      <p className="text-slate-400 mb-8">
        Vous avez un projet web ou mobile à réaliser ? Contactez-moi via le formulaire ou
        directement par email/téléphone.
      </p>

      <div className="space-y-6">
        {infos.map(({ id, label, value, icon, color }) => {
          const IconComponent = (FaIcons as Record<string, React.ElementType>)[icon];
          return (
            <div key={id} className="flex items-start">
              <div className="p-3 rounded-full mr-4" style={{ backgroundColor: color }}>
                {IconComponent ? <IconComponent className="text-white w-5 h-5" /> : null}
              </div>
              <div>
                <h4 className="font-medium mb-1">{label}</h4>
                <span className="text-gray-700 text-green-700">{value}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-10">
        <h4 className="font-semibold mb-4">Suivez-moi</h4>
        <SocialLinks />
      </div>
    </div>
  );
}
