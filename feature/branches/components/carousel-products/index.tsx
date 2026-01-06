"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import "../../styles/home_carousel.css";
 

const carouselItems = Array(12).fill(
  <div className="home_carousel--item">imagen local</div>,
);

const CarouselProducts = () => {
  const carouselBandRef = useRef<HTMLDivElement>(null);

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
    requestAnimationFrame(animate);
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
            <div className="home_carousel--inner-wrapper">{carouselItems}</div>
            <div className="home_carousel--inner-wrapper">{carouselItems}</div>
          </div>
        </section>
      </div>
    </div>
  );
};

export { CarouselProducts };
