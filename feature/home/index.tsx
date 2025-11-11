"use client"
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import HeroBanner from "./components/hero";
import AboutHomeSection from "./components/about";
import ProductsHomeSection from "./components/products";
import BranchesHomeSection from "./components/branches";
import NewsletterHomeSection from "./components/newsletter";
import { CarouselProducts } from "./components/carousel-products";

import "./style/home.css";


const HomePageContent = () => {
 

  return (
    <div  id="smooth-wrapper">
      <div className="smooth-content">
        <HeroBanner />
        <CarouselProducts />
        <ProductsHomeSection /> 
        <AboutHomeSection />
        <BranchesHomeSection />
        <NewsletterHomeSection />
      </div>
    </div>
  );
};

export default HomePageContent;