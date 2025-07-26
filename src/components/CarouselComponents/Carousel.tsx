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
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const getAltText = (imagePath: string) => {
    const fileName = imagePath.split("/").pop() || "";
    return fileName
      .replace(/\.[^/.]+$/, "") // remove extension
      .replace(/[-_]/g, " ") // replace dashes/underscores with spaces
      .replace(/^AGBESSI/i, "AGBESSI"); // capitalize if needed
  };

  return (
    <div className="carousel w-full h-screen relative overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          id={`slide${index + 1}`}
          className={`carousel-item w-full h-full transition-opacity duration-1000 ${
            index === current
              ? "opacity-100 relative"
              : "opacity-0 absolute top-0 left-0"
          }`}
        >
          <Image
            src={image}
            alt={getAltText(image)}
            fill
            sizes="100vw 100vh"
            style={{ objectFit: "cover" }}
            priority={index === 0}
            className="opacity-50"
          />
        </div>
      ))}
    </div>
  );
}
