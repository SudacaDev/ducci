"use client";

import SectionHeader from "@/components/section-header";
import CenterContainer from "@/components/container/center";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import "../../style/products.css";
import ProductCard from "./ProductCatd";
import { useHeroAnimation } from "../hero/hooks/useHeroAnimation";

export const PRODUCTS = [
  {
    id: 1,
    name: "Dulce de Leche",
    image: "/images/guilt-image.jpg",
    category: "Clásicos",
  },
  {
    id: 2,
    name: "Chocolate Amargo",
    image: "/images/guilt-image.jpg",
    category: "Clásicos",
  },
  {
    id: 3,
    name: "Frutilla",
    image: "/images/guilt-image.jpg",
    category: "Frutales",
  },
  {
    id: 4,
    name: "Pistacho",
    image: "/images/guilt-image.jpg",
    category: "Premium",
  },
];

const ProductsHomeSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const refTitle = useRef<HTMLDivElement>(null);
  const refBodyCopy = useRef<HTMLDivElement>(null);
  useHeroAnimation(refTitle, refBodyCopy);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".product-home-list__grid__item");

      cards.forEach((card: any, index: number) => {
        const speedFactor = 1.2 + index * 0.2;

        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 120,
            scale: 0.85,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.5 / speedFactor,
            delay: index * 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="product-home-wrapper">
      <CenterContainer center className="">
        <div className="items-center justify-center flex">
          <SectionHeader align="center" className="text-center">
            <h2 className="section-header__title" ref={refTitle}>
              Explorá <span>nuestros sabores</span>
            </h2>
            <p className="section-header__subtitle" ref={refBodyCopy}>
              Probá nuestros helados, disfrutá de una experiencia distinta!
            </p>
          </SectionHeader>
        </div>

        <div className="product-home-list">
          {PRODUCTS.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </CenterContainer>
    </section>
  );
};

export default ProductsHomeSection;
