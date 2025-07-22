'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const images = [
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80',
    'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80',
    'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80',
    'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&auto=format&fit=crop&w=2080&q=80',
];

export default function DaisyCarouselAutoplay() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="carousel w-full rounded-lg relative">
            {images.map((image, index) => (
                <div
                    key={index}
                    id={`slide${index + 1}`}
                    className={`carousel-item w-full aspect-[16/9] transition-opacity duration-1000 ${index === current ? 'opacity-100 relative' : 'opacity-0 absolute top-0 left-0'
                        }`}
                >
                    <Image
                        src={image}
                        alt={`Slide ${index + 1}`}
                        width={1500}
                        height={900}
                        className="w-full h-full object-cover"
                    />
                </div>
            ))}


        </div>
    );
}
