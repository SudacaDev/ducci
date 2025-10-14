"use client";
import useIntersectionObserver from "@/hooks/intersection-observer";
import { MENU } from "@/types/nav.type";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
};

const OurPhilosophy = () => {
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
            <h2 className="about-section__title"> Nuestra Historia</h2>
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
            <Link href={MENU.PRODUCTS} className="button__cta">
              Conoce nuestros sabores <ArrowRight size={16} />
            </Link>
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
            <Link href={MENU.PRODUCTS} className="button__cta">
              Conoce nuestros sabores <ArrowRight size={16} />
            </Link>
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
