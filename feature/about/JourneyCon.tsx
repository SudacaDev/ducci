"use client";
import CTAButton from "@/components/cta-button";
import useIntersectionObserver from "@/hooks/intersection-observer";
import useGoToPage from "@/libs/goToPage";
import { MENU } from "@/types/nav.type";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
};

const JourneyCon = () => {
  const { ref: refHistoria, isIntersecting: isFilosofiaVisible } =
    useIntersectionObserver<HTMLDivElement>(observerOptions);

  const filosofiaClasses = `journey-con grid-image_right aos-animate ${
    isFilosofiaVisible ? "show" : ""
  }`;

  const goToPage = useGoToPage();


  return (
    <div className="container">
      <div className="journey-con">
        <div className="journey-image grid-image_left relative ">
          <Image
            src="/images/guilt-image.jpg"
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, 50vw"
            alt="Nuestra Historia"
          />
        </div>
        <div className="journey_content grid-content_right">
          <div className="body_content">
            <h2 className="about-section__title">Nuestra Historia</h2>
            <div className="flex flex-col about-section__text">
              <p>
                Ducci Gelatería nació en 2015 en el corazón de Rosario, con la
                pasión de crear helados artesanales que rescatan el auténtico
                sabor del gelato italiano. Nuestra familia, con raíces
                italo-argentinas, trajo consigo recetas tradicionales que
                perfeccionamos con ingredientes locales de primera calidad.
              </p>
              <p>
                Desde nuestros inicios, nos comprometimos a elaborar cada sabor
                con dedicación y amor, sin aditivos artificiales ni
                conservantes. Hoy, somos el punto de encuentro favorito de
                familias y amigos que buscan un momento dulce y auténtico.
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

      <div ref={refHistoria} className={filosofiaClasses}>
        <div className="journey_content grid-content_left">
          <div className="body_content">
            <h2 className="about-section__title">Visión y Propósito</h2>
            <div className="flex flex-col about-section__text">
              <p>
                Queremos ser la excusa perfecta para pasear. Para salir con tus hijos, con
amigas, con tus padres.
              </p>
              <p>
                 Queremos que cada visita a Ducci sea un recreo en
medio del pueblo: un momento que corte la rutina, habilite una charla, o
simplemente genere un recuerdo.
              </p>
            </div>
          </div>
          <div className="about-section__content">
           <CTAButton  className="button__cta--secondary" onClick={() => goToPage(String(MENU.PRODUCTS))}>
              Conoce nuestros sabores <span> <ArrowRight size={16} /></span>
            </CTAButton>
          </div>
        </div>
        <div className="journey-image grid-image_right relative ">
          <Image
            src="/images/guilt-image.jpg"
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
