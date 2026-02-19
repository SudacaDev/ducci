"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface SimpleCarouselProps {
  images: string[];
  alt: string;
  autoplayDelay?: number;
}

export default function SimpleCarousel({
  images,
  alt,
  autoplayDelay = 5000,
}: SimpleCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isPaused && autoplayDelay > 0) {
      intervalRef.current = setInterval(() => {
        setCurrent((prev) => (prev + 1) % images.length);
      }, autoplayDelay);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused, images.length, autoplayDelay]);

  const goToSlide = (index: number) => {
    setCurrent(index);
  };

  const goToPrevious = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  return (
    <div
      className="relative w-full h-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {images.map((img, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            idx === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image
            src={img}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 25vw"
            alt={`${alt} ${idx + 1}`}
            className="object-cover"
          />
        </div>
      ))}
      <div className="absolute bottom-24 left-0 right-0 z-20 flex justify-center gap-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={(e) => {
              e.preventDefault();
              goToSlide(idx);
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              idx === current ? "bg-white w-6" : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Ir a imagen ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
