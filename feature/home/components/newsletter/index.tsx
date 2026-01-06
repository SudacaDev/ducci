"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight, Loader2, CheckCircle, XCircle } from "lucide-react";

import CTAButton from "@/components/cta-button";
import { Input } from "@/components/ui/input";
import Block from "@/components/content-block";



import "../../style/newsletter.css";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNewsletter } from "@/hooks/useNewsletter";

gsap.registerPlugin(ScrollTrigger);

const NewsletterHomeSection = () => {
  const refContentNewsletter = useRef(null);
  const { form, onSubmit, isLoading, isSuccess, isError, errorMessage } = useNewsletter();
  const { register, formState: { errors } } = form;

  useEffect(() => {
    if (!refContentNewsletter.current) return;
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
          <div className="newsletter-home-content__image--content">
            <Image
              src="/images/MILSHAKE.png"
              style={{ objectFit: "cover" }}
              width={600}
              height={600}
              alt="Helados artesanales Ducci"
            />
          </div>
          <Block>
            <Block.Content>
              <Block.Subtitle>Redes sociales</Block.Subtitle>
              <Block.Title>
                <span>¡Seguinos, ofertas</span> te esperan!
              </Block.Title>
            </Block.Content>
            <Block.Body>
              <p className="section-header__subtitle">
                Promociones especiales, lanzamientos de sabores únicos y
                descuentos exclusivos para suscriptores
              </p>
              <form onSubmit={onSubmit} className="newsletter-home-content__form--content">
                <div>
                  <Input
                    type="email"
                    placeholder="Ingresá tu email para suscribirte"
                    {...register("email")}
                    disabled={isLoading}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                  )}
                </div>

                {isSuccess && (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle size={16} />
                    <span>¡Gracias por suscribirte!</span>
                  </div>
                )}

                {isError && (
                  <div className="flex items-center gap-2 text-red-600">
                    <XCircle size={16} />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="flex">
                  <CTAButton
                    className="button__cta flex"

                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        Suscribiendo...
                      </>
                    ) : (
                      <>
                        Suscribite al newsletter
                        <span>
                          <ArrowRight size={20} />
                        </span>
                      </>
                    )}
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