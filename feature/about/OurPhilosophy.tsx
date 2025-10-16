"use client";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

import { MENU } from "@/types/nav.type";
import useGoToPage from "@/libs/goToPage";
import useIntersectionObserver from "@/hooks/intersection-observer";
import CTAButton from "@/components/cta-button";

const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
};

const OurPhilosophy = () => {
  const goToPage = useGoToPage();
  const { ref: refHistoria, isIntersecting: isHistoriaVisible } =
    useIntersectionObserver<HTMLDivElement>(observerOptions);
  const { ref: refFilosofia, isIntersecting: isFilosofiaVisible } =
    useIntersectionObserver<HTMLDivElement>(observerOptions);

  const historiaClasses = `journey-con grid-content_left aos-animate ${isHistoriaVisible ? "show" : ""}`;
  const filosofiaClasses = `journey-con fr3_fr2 aos-animate ${isFilosofiaVisible ? "show" : ""}`;



  return (
    <div id="our-philosophy" className="container">
      <div ref={refHistoria} className={historiaClasses}>
        <div className="journey-image grid-image_left">
          <Image
            src="/images/guilt-image.jpg"
            fill
            objectFit="cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            alt=""
            className=" "
          />
        </div>
        <div className="journey_content grid-content_right ">
          <div className="body_content">
            <h2 className="about-section__title"> Misión</h2>
            <div className="flex flex-col about-section__text">
              <p>
               Crear espacios accesibles, cálidos y bien pensados donde todas las edades
puedan disfrutar. Servir helado con calidad, atención con cariño y experiencias
que valgan la pena. Acompañar de cerca a nuestros franquiciados y a sus
equipos, dándoles herramientas claras para que crezcan con su comercio y
también en su vida.
              </p>
              <p>
               No buscamos estar en todos lados: buscamos estar bien, ser sólidos y dejar
huella en cada lugar donde abrimos las puertas.
              </p>
            </div>
          </div>
          <div className="about-section__content">
            <CTAButton  className="button__cta--secondary" onClick={() => goToPage(String(MENU.PRODUCTS))}>
              Conoce nuestros sabores <span> <ArrowRight size={16} /></span>
            </CTAButton>
          </div>
        </div>
      </div>

      <div ref={refFilosofia} className={filosofiaClasses}>
        <div className="journey_content grid-content_left">
          <div className="body_content">
            <h2 className="about-section__title"> Nuestra Filosofía</h2>
            <div className="flex flex-col about-section__text">
              <p>
                Creemos que un helado excepcional comienza con ingredientes
                excepcionales. Por eso trabajamos con productores locales,
                seleccionando frutas de estación, chocolate belga premium y
                dulce de leche artesanal argentino. Cada cucharada cuenta una
                historia de calidad y compromiso.
              </p>
              <p>
                Nuestra heladería es más que un negocio: es un espacio donde las
                tradiciones se encuentran con la innovación. Respetamos las
                recetas clásicas mientras experimentamos con nuevos sabores que
                sorprenden a nuestros clientes. Porque para nosotros, hacer
                helado es un arte que se disfruta mejor cuando se comparte.
              </p>
            </div>
          </div>
          <div className="about-section__content">
            <CTAButton  className="button__cta--secondary" onClick={() => goToPage(String(MENU.PRODUCTS))}>
              Conoce nuestros sabores <span> <ArrowRight size={16} /></span>
            </CTAButton>
          </div>
        </div>
        <div className="journey-image grid-content_right">
          <Image
            src="/images/guilt-image.jpg"
            fill
            objectFit="cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            alt=""
            className=" "
          />
        </div>
      </div>
    </div>
  );
};
export default OurPhilosophy;
