"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import "../../styles/home_carousel.css";
import Image from "next/image";

const CarouselProducts = () => {
  const carouselBandRef = useRef<HTMLDivElement>(null);

  const totalImagenes = 11;
  const imagePaths = Array.from({ length: totalImagenes }, (_, i) => {
    const id = String(i + 1).padStart(2, "0");
    return `/images/locales/IMG_${id}.jpg`;
  });

  const renderCarouselItems = imagePaths.map((src, index) => (
    <div
      className="home_carousel--item"
      key={index}
      style={{
        position: "relative",
        width: "450px", // Ajustá este ancho a tu gusto
        height: "350px", // Ajustá este alto a tu gusto
        flexShrink: 0, // Evita que el flexbox las comprima
        marginRight: "20px",
        overflow: "hidden",
        borderRadius: "20px", // Para que tengan las puntas redondeadas como en tu diseño
      }}
    >
      <Image
        src={src}
        alt={`Sucursal ${index + 1}`}
        fill
        priority={index < 3}
        style={{ objectFit: "cover" }} // Esto hace que la imagen llene el recuadro sin deformarse
      />
    </div>
  ));
  let xPercent = 0;
  const direction = -1;
  const speed = 0.05;

  const animate = () => {
    if (carouselBandRef.current) {
      if (xPercent < -100) {
        xPercent = 0;
      }
      gsap.set(carouselBandRef.current, { xPercent });
      xPercent += speed * direction;
      requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    const animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div className="home_branches">
      <div className="home_carousel--info">
        <div className="home_carousel--info-inner">
          <h2>Visitá nuestras sucursales</h2>
          <p>Viví tu momento Ducci</p>
        </div>
      </div>
      <div className="home_carousel--wrapper">
        <section className="home_carousel">
          <div className="home_carousel--band" ref={carouselBandRef}>
            <div className="home_carousel--inner-wrapper">
              {renderCarouselItems}
            </div>
            <div className="home_carousel--inner-wrapper">
              {renderCarouselItems}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export { CarouselProducts };
