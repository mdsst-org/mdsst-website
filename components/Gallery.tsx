// components/Gallery.tsx
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const gallery = [
  "/images/initiative1.jpg",
  "/images/initiative2.jpg",
  "/images/initiative3.jpg",
  "/images/initiative1.jpg",
  "/images/initiative2.jpg",
  "/images/initiative3.jpg",
];

const SLIDE_INTERVAL = 4000;

export default function Gallery() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % gallery.length);
    }, SLIDE_INTERVAL);

    return () => clearInterval(id);
  }, []);

  return (
    <section id="gallery" className="bg-mdssBg py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center text-3xl font-display font-bold text-mdssRed">
          Our Photo Gallery
        </h2>
        <p className="mt-2 text-center text-sm text-gray-700">
          Glimpses from our health camps, education initiatives, community outreach and festive programs.
        </p>
        <div className="mt-8 overflow-hidden rounded-2xl bg-black/5">
          <div className="relative aspect-[16/9] w-full">
            {gallery.map((src, i) => (
              <Image
                key={src + i}
                src={src}
                alt={`gallery-${i}`}
                fill
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out ${
                  i === current ? "opacity-100" : "opacity-0"
                }`}
                priority={i === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
