"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { MENU } from "@/types/nav.type";
import { useHeroAnimation } from "./hooks/useHeroAnimation";



const HeroBanner = () => {

  const refTitle = useRef<HTMLDivElement>(null);
  const refBodyCopy = useRef<HTMLDivElement>(null);
  const refEyebrow = useRef<HTMLDivElement>(null);
  const refButtonCTA = useRef<HTMLDivElement>(null);

  useHeroAnimation(refTitle, refEyebrow, refBodyCopy, refButtonCTA);

  return (
    <div className="hero__wrapper">
      <section className="hero-banner">
      <div className="mx-auto container relative">
        <div className="bg-transparent hero--banner__wrapper ">
          <div className=" banner_content">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-4">
                <p className="hero__eyebrow flex items-center gap-2" ref={refEyebrow}>
                  Es mucho más que una heladería.
                </p>
                <h1 className="hero__title" ref={refTitle}>
                  Ducci <span className="hero__title--accent">Gelatería</span>
                </h1>
              </div>

              <p className="hero__description copy" ref={refBodyCopy}>
                Es el punto de encuentro. <br />
                En Ducci cada sabor tiene su historia y cada visita se
                transforma en un recreo.
              </p>
            </div>

            <div ref={refButtonCTA}  className="hero__cta">
              <Link className="button__cta" href={MENU.PRODUCTS}>
                Conocé nuestros sabores
                <span>
                  <ArrowRight size={20} />
                </span>
              </Link>
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
    </div>
  );
};

export default HeroBanner;
