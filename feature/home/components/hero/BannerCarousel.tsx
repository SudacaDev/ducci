"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const BANNER_IMAGES = [
  {
    src: "/images/banner-image.png",
    alt: "Banner 1",
  },
  {
    src: "/images/banner-image-2.png",
    alt: "Banner 2",
  },
  {
    src: "/images/banner-image-3.png",
    alt: "Banner 3",
  },
];

export default function BannerCarousel() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const extendedImages = [
    BANNER_IMAGES[BANNER_IMAGES.length - 1],
    ...BANNER_IMAGES,
    BANNER_IMAGES[0],
  ];

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const goToPrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index + 1);
  };

  useEffect(() => {
    const interval = setInterval(goToNext, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isTransitioning) return;

    const timeout = setTimeout(() => {
      if (currentIndex === extendedImages.length - 1) {
        setIsTransitioning(false);
        setCurrentIndex(1);
      } else if (currentIndex === 0) {
        setIsTransitioning(false);
        setCurrentIndex(BANNER_IMAGES.length);
      } else {
        setIsTransitioning(false);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [currentIndex, isTransitioning, extendedImages.length]);

  const getRealIndex = () => {
    if (currentIndex === 0) return BANNER_IMAGES.length - 1;
    if (currentIndex === extendedImages.length - 1) return 0;
    return currentIndex - 1;
  };

  return (
    <section className="banner-carousel relative">
      <div className="banner-carousel__content relative overflow-hidden">
        <div
          ref={trackRef}
          className="banner-carousel__track flex"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: isTransitioning
              ? "transform 500ms ease-in-out"
              : "none",
          }}
        >
          {extendedImages.map((image, index) => (
            <div
              key={`slide-${index}`}
              className="banner-carousel__slide min-w-full flex-shrink-0"
            >
              <Image
                src={image.src}
                height={665.96}
                width={569}
                alt={image.alt}
                className="w-full max-w-[569px] h-auto"
                priority={index === 1}
              />
            </div>
          ))}
        </div>

        <button
          onClick={goToPrevious}
          disabled={isTransitioning}
          className="banner-carousel__arrow banner-carousel__arrow--left absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all z-10 disabled:opacity-50"
          aria-label="Imagen anterior"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>

        <button
          onClick={goToNext}
          disabled={isTransitioning}
          className="banner-carousel__arrow banner-carousel__arrow--right absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all z-10 disabled:opacity-50"
          aria-label="Siguiente imagen"
        >
          <ChevronRight className="w-6 h-6 text-gray-800" />
        </button>

        <div className="banner-carousel__dots absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {BANNER_IMAGES.map((_, index) => (
            <button
              key={`dot-${index}`}
              onClick={() => goToSlide(index)}
              disabled={isTransitioning}
              className={`banner-carousel__dot w-3 h-3 rounded-full transition-all disabled:cursor-not-allowed ${
                getRealIndex() === index
                  ? "bg-white w-8"
                  : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Ir a imagen ${index + 1}`}
              aria-current={getRealIndex() === index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
