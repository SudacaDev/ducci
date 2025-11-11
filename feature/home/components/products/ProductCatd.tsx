"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import { PRODUCTS } from ".";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

import "../../style/products.css";

const ProductCard = ({
  product,
  index,
}: {
  product: (typeof PRODUCTS)[0];
  index: number;
}) => {
  
  const refItems = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

 useEffect(() => {

    const gsap = (window as any).gsap;
    const ScrollTrigger = (window as any).ScrollTrigger;

    // Salir si GSAP no está disponible
    if (!gsap || !ScrollTrigger || !refItems.current) {
        return; 
    }

    // El cálculo de velocidad y la inicialización de ScrollSmoother FUERON REMOVIDOS
    // ScrollSmoother debe vivir en el componente padre.

    const speedFactor = 1.2 + (index * 0.2); 
    
    let ctx = gsap.context(() => {
     
      // 2. Animación de Parallax (basada en el scroll suave del padre)
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          y: -50 * speedFactor, 
          ease: "none",
          scrollTrigger: {
            trigger: refItems.current,
            start: "top bottom", 
            end: "bottom top",    
            scrub: speedFactor,  
          }
        });
      }
     
      gsap.set(refItems.current, { opacity: 0, y: 60 });
      gsap.to(refItems.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power4.ease",
        delay: index * 0.05,
        scrollTrigger: {
          trigger: refItems.current,
          start: "top 110%",
          toggleActions: "play none none reverse",
        }
      });

    }, refItems);
    
    return () => {
      ctx.revert();
    
    };
  }, [index]);

  return (
    <div
      ref={refItems}
      className="product-home-list__grid__item"
      data-speed={1.2 + (index * 0.2)} 
      style={{ 
        opacity: 0, 
       
      }}
    >
      <div 

        className="product-home-list__grid__item_image"
      >
        <figure>
          <Image
            src={product.image}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, 33vw"
            alt={product.name}
          />
        </figure>
      </div>
      <div className="product-home-list__grid__cta">
        <div className="product-home-list__grid__cta__content">
          <div>
            <span className="text-sm opacity-70">{product.category}</span>
            <h3>{product.name}</h3>
          </div>
          <div className="rounded-full">
            <Button className="product-home-list__grid__button">
              <ArrowRight size={24} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;