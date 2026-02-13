"use client";
import Block from "@/components/content-block";
import CTAButton from "@/components/cta-button";
import useIntersectionObserver from "@/hooks/intersection-observer";
import useGoToPage from "@/libs/goToPage";
import { MENU } from "@/types/nav.type";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
 
import { useRef } from "react";
import { useHeroAnimation } from "../home/components/hero/hooks/useHeroAnimation";

const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.2,
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
            <Block.Title ref={refTitle}>No solo servimos helado,<br /> Creamos momentos.</Block.Title>
            <Block.Body ref={refBodyCopy}>
              <div className="flex flex-col about-section__text">
                <p> Nuestra propuesta combina tradición, técnica y creatividad para ofrecer sabores de calidad en cada cucharada.
Trabajamos con procesos cuidados, elaboración diaria y una selección rigurosa de ingredientes. Eso nos permite mantener un estilo propio y garantizar un producto estable, noble y siempre fresco.
</p>
                <p> En Ducci entendemos el helado como una experiencia. Por eso buscamos mejorar constantemente, crear nuevas combinaciones y ofrecer un servicio cercano. Cada pote, cada bocha y cada presentación reflejan lo que nos define: calidad, dedicación y amor por lo que hacemos.</p>
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
                <p> Momentos Ducci es nuestra forma de celebrar esos instantes que se vuelven especiales cuando el helado acompaña.
Copas únicas, sabores distintivos y combinaciones pensadas para compartir, sorprender y disfrutar.</p>
                <p> Porque en Ducci el helado no es solo un producto: es parte de encuentros, pausas y momentos para darse un gusto.
Creamos propuestas para que cada ocasión tenga su sabor inolvidable.</p>
                
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
