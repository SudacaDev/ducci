"use client";
import { ArrowRight } from "lucide-react";

import CTAButton from "@/components/cta-button";
import SectionHeader from "@/components/section-header";
import CenterContainer from "@/components/container/center";

import { Input } from "@/components/ui/input";

import "../../style/newsletter.css";
import Block from "@/components/content-block";
import Image from "next/image";

const NewsletterHomeSection = () => {
  return (
    <section className="newsletter-home-wrapper">
      <div className="newsletter-home-content">
        <div className="newsletter-home-content__form">
          <Block>
            <Block.Title>
              <span>Beneficios especiales </span> te esperan
            </Block.Title>
            <Block.Body>
              <p className="section-header__subtitle">
                Promociones especiales, lanzamientos de sabores únicos y
                descuentos exclusivos para suscriptores
              </p>
              <form className="flex flex-col gap-4">
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

        <div className="newsletter-home-content__image">
          <div className="newsletter-home-content__image--content">
            <Image
              src="/images/special-image.png"
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 80vw, 50vw"
              alt="Helados artesanales Ducci"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
export default NewsletterHomeSection;
