'use client';
import { useEffect, useRef } from 'react';

export default function Particles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const count = 30;

    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const posX = Math.random() * 100;
      const posY = Math.random() * 100 + 100;
      const size = Math.random() * 10 + 1;
      const duration = Math.random() * 20 + 0.5;
      const delay = Math.random() * 5;

      Object.assign(p.style, {
        left: `${posX}%`,
        top: `${posY}%`,
        width: `${size}px`,
        height: `${size}px`,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`
      });

      container.appendChild(p);
    }
  }, []);

  return <div ref={containerRef} className="particles absolute inset-0 z-0 overflow-hidden" />;
}
