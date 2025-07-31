"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const images = [
  "/carrocele/AGBESSI-Gilchrist-image-1.jpg",
  "/carrocele/AGBESSI-Gilchrist-image-2.jpg",
  "/carrocele/AGBESSI-Gilchrist-image-3.jpg",
  "/carrocele/AGBESSI-Gilchrist-image-4.jpg",
];

export default function DaisyCarouselAutoplay() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000); // 5 sec d'intervalle
    return () => clearInterval(interval);
  }, []);

  const getAltText = (imagePath: string) => {
    const fileName = imagePath.split("/").pop() || "";
    return fileName
      .replace(/\.[^/.]+$/, "")
      .replace(/[-_]/g, " ")
      .replace(/^AGBESSI/i, "AGBESSI");
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-opacity duration-[1500ms] ease-in-out ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image
            src={image}
            alt={getAltText(image)}
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
            priority={index === 0}
            className="transition-opacity duration-1000"
          />
        </div>
      ))}

      {/* Optional: overlay gradient to darken bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-20 pointer-events-none" />
    </div>
  );
}
