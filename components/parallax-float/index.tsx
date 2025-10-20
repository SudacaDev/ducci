"use client";

import { ReactNode, useEffect, useRef } from "react";


interface ParallaxFloatProps {
    children: ReactNode,
    speed?: number
}


const ParallaxFloat = ({ children, speed = 0.5 }: ParallaxFloatProps) => {
  const floatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = floatRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            window.addEventListener("scroll", handleScroll);
          } else {
            window.removeEventListener("scroll", handleScroll);
          }
        });
      },
      { threshold: 0.1 }
    );

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const scrollProgress = 1 - (rect.top + rect.height) / window.innerHeight;
      const offset = scrollProgress * 100 * speed;
      element.style.transform = `translateY(${offset}px)`;
    };

    observer.observe(element);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [speed]);

  return (
    <div 
      ref={floatRef}
      className="branches-home--image__float"
    >
      {children}
    </div>
  );
};

export default ParallaxFloat