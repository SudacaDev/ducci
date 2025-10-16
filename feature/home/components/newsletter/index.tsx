"use client";
import CenterContainer from "@/components/container/center";
import CTAButton from "@/components/cta-button";
import SectionHeader from "@/components/section-header";

import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";

const NewsletterHomeSection = () => {
  return (
    <section className="newsletter-home-wrapper">
      <CenterContainer center className="newsletter-home-content flex">
        <div className="flex">
          <div className="newsletter-home-content__form">
            <div className="ss">
              <SectionHeader align="center">
                <h2 className="section-header__title">
                  <span>Beneficios especiales </span> te esperan
                </h2>
                <p className="section-header__subtitle">
                  Promociones especiales, lanzamientos de sabores únicos y
                  descuentos exclusivos para suscriptores
                </p>
              </SectionHeader>
            </div>
            <form className="flex">
              <Input
                type="text"
                placeholder="ingresa tu email para subscribirte al newsletter"
              />
              <CTAButton
                className="button__cta flex"
                type="secondary"
                onClick={() => console.log("click")}
              >
                <p> Suscribite al newsletter </p>
                <span>
                  <ArrowRight size={20} />
                </span>
              </CTAButton>
            </form>
          </div>
          <div>imagen</div>
        </div>
      </CenterContainer>
    </section>
  );
};
export default NewsletterHomeSection;
