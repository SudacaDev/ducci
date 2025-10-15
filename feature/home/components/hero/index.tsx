"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { MENU } from "@/types/nav.type";
import { Button } from "@/components/ui/button";

import { FaIceCream } from "react-icons/fa6";

const HeroBanner = () => {
  const router = useRouter();

  const goToProducts = () => {
    router.push(MENU.PRODUCTS);
  };

  return (
    <section className="hero-banner">
      <div className="mx-auto container relative">
        <div className="bg-transparent hero--banner__wrapper ">
          <div className=" banner_content">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-4">
                <p className="hero__eyebrow flex items-center gap-2">
                  <FaIceCream size={14} />
                  Bienvenidos a
                </p>
                <h1 className="hero__title">
                  Ducci <span className="hero__title--accent">Gelatería</span>
                </h1>
              </div>

              <p className="hero__description copy">
                Disfrutá el auténtico sabor del helado artesanal, elaborado con
                ingredientes naturales y recetas que rescatan la tradición
                italiana en cada cucharada.
              </p>
            </div>

            <div className="hero__cta">
              <Button
                className="button__cta"
                onClick={goToProducts}
                type="button"
              >
                Conocé nuestros sabores
                <ArrowRight size={20} />
              </Button>
            </div>
          </div>

          <div className="xl:flex-5 md:w-full"></div>
        </div>

        <section className="banner-image relative">
          <div className="banner-image__content">
            <Image
              src="/images/banner-image.png"
              height={783}
              width={669}
              alt="home"
            />
          </div>
        </section>
      </div>
    </section>
  );
};

export default HeroBanner;
