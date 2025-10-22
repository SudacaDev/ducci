"use client";

import { ArrowRight } from "lucide-react";

import CTAButton from "@/components/cta-button";

import { Input } from "@/components/ui/input";


import "../../style/newsletter.css";
import Block from "@/components/content-block";
import Image from "next/image";
import useIntersectionObserver from "@/hooks/intersection-observer";

const observerOptions = {
  root: null,
  rootMargin: "20px",
  threshold: 0.3,
};


const NewsletterHomeSection = () => {

  const { ref, isIntersecting: isFilosofiaVisible } =
    useIntersectionObserver<HTMLDivElement>(observerOptions);

  const newsletterClasses = `newsletter-home-content  aos-animate ${isFilosofiaVisible ? "show " : ""
    }`;

  return (
    <section className="newsletter-home-wrapper">
      <div ref={ref}  className={newsletterClasses} >
        <div  className='newsletter-home-content__form'>
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
              <Block.Subtitle>
                Newsletter
              </Block.Subtitle>
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
