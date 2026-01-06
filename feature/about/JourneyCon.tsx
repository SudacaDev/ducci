"use client";
import Block from "@/components/content-block";
import CTAButton from "@/components/cta-button";
import useIntersectionObserver from "@/hooks/intersection-observer";
import useGoToPage from "@/libs/goToPage";
import { MENU } from "@/types/nav.type";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
//import Link from "next/link";
import { useRef } from "react";
import { useHeroAnimation } from "../home/components/hero/hooks/useHeroAnimation";

const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
};

const JourneyCon = () => {
  const refTitle = useRef<HTMLDivElement>(null);
  const refBodyCopy = useRef<HTMLDivElement>(null);
  const refEyebrow = useRef<HTMLDivElement>(null);
  const refButtonCTA = useRef<HTMLDivElement>(null);

  useHeroAnimation(refTitle, refEyebrow, refBodyCopy, refButtonCTA);

  const { ref: refHistoria, isIntersecting: isFilosofiaVisible } =
    useIntersectionObserver<HTMLDivElement>(observerOptions);

  const filosofiaClasses = `journey-con grid-image_right aos-animate ${isFilosofiaVisible ? "show" : ""
    }`;

  const goToPage = useGoToPage();

  return (
    <div className="container">
      <div className="journey-con">
        <div className="journey-image grid-image_left relative ">
          <Image
            src="/images/el-camino.jpeg"
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, 50vw"
            alt="Nuestra Historia"
          />
        </div>
        <div className="journey_content grid-content_right">
          <Block>
            <Block.Title ref={refTitle}>El camino que elegimos</Block.Title>
            <Block.Body ref={refBodyCopy}>
              <div className="flex flex-col about-section__text">
                <p>
                  Nuestra propuesta combina tradición, técnica y creatividad para
                  ofrecer sabores que transmiten calidad en cada cucharada.
                </p>
                <p>
                  Hemos consolidado un estilo propio: procesos cuidados, elaboración
                  diaria y una selección rigurosa de ingredientes. Este compromiso nos
                  permite garantizar un producto noble, estable y de alta calidad.
                </p>
                <p> En Ducci Gelateria entendemos el helado como una experiencia. Por eso
                  trabajamos en mejorar permanentemente nuestras formulaciones,
                  incorporar nuevas combinaciones y mantener un servicio cercano y
                  atento. Cada pote, cada bocha y cada presentación reflejan nuestra
                  identidad: calidad y dedicación.</p>
              </div>
            </Block.Body>
            <Block.Footer ref={refButtonCTA}>
              <CTAButton
                className="button__cta--secondary"
                onClick={() => goToPage(String(MENU.PRODUCTS))}
              >
                Pedí Ducci
                <span>
                  <ArrowRight size={16} />
                </span>
              </CTAButton>
            </Block.Footer>
          </Block>
        </div>
      </div>

      <div ref={refHistoria} className={filosofiaClasses}>
        <div className="journey_content grid-content_left">
          <Block>
            <Block.Title ref={refTitle}>Momentos Ducci</Block.Title>
            <Block.Body ref={refBodyCopy}>
              <div className="flex flex-col about-section__text">
                <p>
                  Momentos Ducci es nuestra manera de celebrar esos instantes que se
                  vuelven especiales cuando el helado acompaña. Pequeños rituales cotidianos,
                  encuentros inesperados o celebraciones que merecen un
                  sabor a la altura: cada uno de ellos encuentra en Ducci un aliado para
                  convertirse en un recuerdo.
                </p>
                <p>
                  Creemos que el helado no es solo un producto, sino una experiencia que
                  conecta. Por eso elaboramos cada sabor con dedicación, para que esté
                  presente donde realmente importa: en una sobremesa larga, en un
                  brindis improvisado, en una tarde en familia o en ese descanso que necesitabas.
                </p>
                <p>En Momentos Ducci invitamos a detenernos, disfrutar y compartir.
                  Porque cuando la calidad se nota y el sabor emociona, cada instante
                  puede transformarse en un momento que vale la pena guardar.</p>
              </div>
            </Block.Body>
            <Block.Footer ref={refButtonCTA}>
              <CTAButton
                className="button__cta--secondary"
                onClick={() => goToPage(String(MENU.PRODUCTS))}
              >
                Pedí Ducci
                <span>
                  <ArrowRight size={16} />
                </span>
              </CTAButton>
            </Block.Footer>
          </Block>
        </div>
        <div className="journey-image grid-image_right relative ">
          <Image
            src="/images/momentos.jpg"
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, 50vw"
            alt="Nuestra Filosofía"
          />
        </div>
      </div>
    </div>
  );
};

export default JourneyCon;
