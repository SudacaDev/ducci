"use client";
import { useEffect } from "react";

import HeroBanner from "./components/hero";
import AboutHomeSection from "./components/about";
import ProductsHomeSection from "./components/products";
import BranchesHomeSection from "./components/branches";
import NewsletterHomeSection from "./components/newsletter";
import { CarouselProducts } from "../branches/components/carousel-products";

import "./style/home.css";
import Lenis from "lenis";

const HomePageContent = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    (window as any).lenis = lenis;

    function raf(time: any) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      delete (window as any).lenis;
    };
  }, []);
  return (
    <div id="smooth-wrapper" className="overflow-hidden">
      <div className="smooth-content">
        <HeroBanner />

        <ProductsHomeSection />
        <AboutHomeSection />
        <BranchesHomeSection />
        <NewsletterHomeSection />
      </div>
    </div>
  );
};

export default HomePageContent;
