"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";

interface SocialPlatform {
  id: number;
  name: string;
  icon: string;
  color: string;
  url: string;
}

export default function SocialLinks() {
  const [platforms, setPlatforms] = useState<SocialPlatform[] | null>(null);

  useEffect(() => {
    fetch("/api/social-platform")
      .then((res) => res.json())
      .then(setPlatforms)
      .catch(() => setPlatforms([]));
  }, []);

  // Skeleton loader pendant le chargement
  if (platforms === null)
    return (
      <div className="flex space-x-4 animate-pulse">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="w-10 h-10 rounded-full bg-gray-300"
            aria-hidden="true"
          />
        ))}
      </div>
    );

  if (platforms.length === 0) return null;

  return (
    <div className="flex space-x-4">
      {platforms.map(({ id, url, icon, color }) => {
        const IconComponent = (FaIcons as Record<string, React.ElementType>)[icon];
        return (
          <Link
            key={id}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full flex items-center justify-center transition duration-300 ease-in-out hover:brightness-90 hover:scale-110 hover:shadow-lg"
            style={{ backgroundColor: color }}
          >
            {IconComponent ? <IconComponent className="text-white text-lg" /> : null}
          </Link>
        );
      })}
    </div>
  );
}
