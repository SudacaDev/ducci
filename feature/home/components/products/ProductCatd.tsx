"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { PRODUCTS } from ".";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
 

gsap.registerPlugin(ScrollTrigger);

import "../../style/products.css";
import SimpleCarousel from "./SimpleCarousel";

const ProductCard = ({
  product,
  index,
}: {
  product: (typeof PRODUCTS)[0];
  index: number;
}) => {
  const refItems = useRef<HTMLAnchorElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gsap = (window as any).gsap;
    const ScrollTrigger = (window as any).ScrollTrigger;

    if (!gsap || !ScrollTrigger || !refItems.current) {
      return;
    }

    const speedFactor = 1.2 + index * 0.2;

    let ctx = gsap.context(() => {
      
      if (imageRef.current && !product.hasCarousel) {
        gsap.to(imageRef.current, {
          y: -50 * speedFactor,
          ease: "none",
          scrollTrigger: {
            trigger: refItems.current,
            start: "top bottom",
            end: "bottom top",
            scrub: speedFactor,
          },
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
        },
      });
    }, refItems);

    return () => {
      ctx.revert();
    };
  }, [index, product.hasCarousel]);

  if (product.hasCarousel && product.images) {
    return (
      <Link
        href={product.slug}
        ref={refItems}
        className="product-home-list__grid__item"
        data-speed={1.2 + index * 0.2}
        style={{ opacity: 0 }}
      >
        <div className="product-home-list__grid__item_image">
          <SimpleCarousel 
            images={product.images}
            alt={product.title}
            autoplayDelay={5000}
          />
        </div>

        <div className="product-home-list__grid__cta">
          <div className="product-home-list__grid__cta__content">
            <h3>{product.title}</h3>
          </div>
        </div>
      </Link>
    );
  }

 
  return (
    <Link
      href={product.slug}
      ref={refItems}
      className="product-home-list__grid__item"
      data-speed={1.2 + index * 0.2}
      style={{ opacity: 0 }}
    >
      <div ref={imageRef} className="product-home-list__grid__item_image">
        <figure>
          <Image
            src={product.image || product.images?.[0] || ""}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 25vw"
            alt={product.title}
            priority={index < 2}
            objectFit="cover"
          />
        </figure>
      </div>

      <div className="product-home-list__grid__cta">
        <div className="product-home-list__grid__cta__content">
          <h3>{product.title}</h3>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;