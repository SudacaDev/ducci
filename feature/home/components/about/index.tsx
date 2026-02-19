"use client";
import React, { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import Block from "@/components/content-block";
import CTAButton from "@/components/cta-button";
import CenterContainer from "@/components/container/center";

import "../../style/about.css";
import { useHeroAnimation } from "../hero/hooks/useHeroAnimation";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutHomeSection = () => {
  const refTitle = useRef<HTMLHeadingElement>(null);
  const refEyebrow = useRef<HTMLHeadingElement>(null);
  const refBodyCopy = useRef<HTMLParagraphElement>(null);
  const refButtonCTA = useRef<HTMLParagraphElement>(null);

  const refAbout = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!refAbout.current) {
      return;
    }

    const cxt = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: refAbout.current,
            start: "top bottom", // Inicia cuando el elemento entra por debajo del viewport
            end: "center center", // Termina cuando el elemento llega al centro del viewport
            scrub: 1, // Suavizado de 1 segundo
            markers: false, // Desactivar marcadores para producción
          },
        })
        // Solo necesitamos UN .from para definir el estado inicial (oculto)
        // y GSAP lo animará hasta el estado final (visible, y: 0) a lo largo del scroll.
        .from(refAbout.current, {
          y: 100, // Empieza 100px abajo (para que suba)
          opacity: 0,
          ease: "power2.out", // Hace que la entrada sea más suave
        });
    }, refAbout);

    return () => cxt.revert();
  }, []);

  useHeroAnimation(refTitle, refEyebrow, refBodyCopy, refButtonCTA);
  return (
    <section className="about-home__wrapper">
      <CenterContainer center>
        <section ref={refAbout} className="about-home">
          <div id="about_wrapper" className="flex">
            <div className="about_wrapper__content">
              <div className="about-home__wrappe--image-wrapper overflow-hidden">
                <div className="about-home__wrappe--image-wrapper__content">
                  <Image
                    src="/images/la-magia-de-ducci.png"
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    alt="Helados artesanales Ducci"
                  />
                </div>
              </div>

              <div className="about-home__wrappe--info">
                <div className="about-home__wrappe--info__wrapper">
                  <div className="about-home__wrappe--info__content">
                    <Block>
                      <Block.Content>
                        <Block.Subtitle ref={refEyebrow}>
                          La Magia Ducci
                        </Block.Subtitle>
                        <Block.Title ref={refTitle}>
                          <span>El camino que elegimos </span>
                        </Block.Title>
                      </Block.Content>
                      <Block.Body ref={refBodyCopy}>
                        <div className="about-home__wrappe--info__content__body">
                          <p>No solo servimos helado. Creamos momentos.</p>
                          <p>
                            Ducci nace para ser la salida familiar en pueblos
                            grandes y ciudades chicas donde no hay tantas
                            opciones para disfrutar con niños o preadolescentes.
                          </p>
                          <p>Somos un lugar de encuentro, alegría y juego.</p>
                        </div>
                      </Block.Body>
                      <Block.Footer ref={refButtonCTA}>
                        <Link href="/nosotros">
                          <CTAButton className="button__cta--secondary">
                            Conocé nuestra historia
                            <span>
                              <ArrowRight size={20} />
                            </span>
                          </CTAButton>
                        </Link>
                      </Block.Footer>
                    </Block>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </CenterContainer>
    </section>
  );
};

export default AboutHomeSection;
