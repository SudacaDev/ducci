"use client";

import Image from "next/image";
import CenterContainer from "@/components/container/center";
import SectionHeader from "@/components/section-header";
import useIntersectionObserver from "@/hooks/intersection-observer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const PRODUCTS = [
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

const ProductCard = ({ 
  product, 
  index 
}: { 
  product: typeof PRODUCTS[0]; 
  index: number;
}) => {
  const { ref, isIntersecting } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.2,
    freezeOnceVisible: true,
  });

  return (
    <div
      ref={ref}
      className={`product-home-list__grid__item ${
        isIntersecting ? "fade-in-up" : "opacity-0"
      }`}
      style={{
        animationDelay: `${index * 150}ms`,
      }}
    >
      <div className="product-home-list__grid__item_image">
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
          <h3 className="text-xl font-bold">{product.name}</h3>
          </div>
          <div className="rounded-full">
            <Button className="product-home-list__grid__button"><ArrowRight size={24} /></Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductsHomeSection = () => {
  return (
    <section className="product-home-wrapper">
      <CenterContainer center className="">
        <SectionHeader align="center" >
          <h2 className="section-header__title">Explorá <span>nuestros sabores</span> </h2>
          <p className="section-header__subtitle">Helados artesanales elaborados con ingredientes naturales</p>
        </SectionHeader>
        
        <div className="product-home-list">
          {PRODUCTS.map((product, index) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              index={index}
            />
          ))}
        </div>
      </CenterContainer>
    </section>
  );
};

export default ProductsHomeSection;