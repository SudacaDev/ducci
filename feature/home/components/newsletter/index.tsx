"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import CTAButton from "@/components/cta-button";

import { Input } from "@/components/ui/input";

import "../../style/newsletter.css";
import Block from "@/components/content-block";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NewsletterHomeSection = () => {
  const refContentNewsletter = useRef(null);
  // Solo agregá esto al newsletter
  useEffect(() => {
    if (!refContentNewsletter.current) return;

    // Solo dale mayor z-index y ya
    gsap.set(refContentNewsletter.current, {
      zIndex: 100,
      position: "relative",
      background: "white",
    });
  }, []);

  return (
    <section ref={refContentNewsletter} className="newsletter-home-wrapper">
      <div className="newsletter-home-content">
        <div className="newsletter-home-content__form">
          <div className=" newsletter-home-content__image--content">
            <Image
              src="/images/special-image.png"
              style={{ objectFit: "cover" }}
              width={600}
              height={600}
              alt="Helados artesanales Ducci"
            />
          </div>
          <Block>
            <Block.Content>
              <Block.Subtitle>Newsletter</Block.Subtitle>
              <Block.Title>
                <span>Beneficios especiales </span> te esperan
              </Block.Title>
            </Block.Content>
            <Block.Body>
              <p className="section-header__subtitle">
                Promociones especiales, lanzamientos de sabores únicos y
                descuentos exclusivos para suscriptores
              </p>
              <form className="newsletter-home-content__form--content">
                <Input
                  type="text"
                  placeholder="ingresa tu email para subscribirte al newsletter"
                />
                <div className="flex">
                  <CTAButton
                    className="button__cta flex"
                    type="secondary"
                    onClick={() => console.log("click")}
                  >
                    Suscribite al newsletter
                    <span>
                      <ArrowRight size={20} />
                    </span>
                  </CTAButton>
                </div>
              </form>
            </Block.Body>
          </Block>
        </div>
      </div>
    </section>
  );
};
export default NewsletterHomeSection;
