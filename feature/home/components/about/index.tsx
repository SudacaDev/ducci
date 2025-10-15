"use client";
import CenterContainer from "@/components/container/center";
import { Button } from "@/components/ui/button";
import useIntersectionObserver from "@/hooks/intersection-observer";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const observerOptions = {
  root: null,
  rootMargin: "20px",
  threshold: 0.3,
};

const AboutHomeSection = () => {
  const { ref: refHistoria, isIntersecting: isFilosofiaVisible } =
    useIntersectionObserver<HTMLDivElement>(observerOptions);

  const aboutClasses = `about-home aos-animate ${
    isFilosofiaVisible ? "show " : ""
  }`;
  return (
    <CenterContainer center className="about-home__wrapper">
      <section ref={refHistoria} className={aboutClasses}>
        <div id="about_wrapper" className="flex">
          <div className="about_wrapper__content">
            <div className="about-home__wrappe--image-wrapper overflow-hidden">
              <div className="about-home__wrappe--image-wrapper__content">
                <Image
                  src="/images/guilt-image.jpg"
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
                  <div className="about-home__wrappe--info__content__title">
                    <h3>Helados Como los de Antes</h3>
                  </div>

                  <div className="about-home__wrappe--info__content__body">
                    <p>
                      En Ducci rescatamos el auténtico sabor del gelato italiano
                      con recetas artesanales que pasan de generación en
                      generación.
                    </p>
                    <p>
                      Elaboramos cada sabor con ingredientes naturales y mucho
                      amor, sin conservantes ni aditivos artificiales.
                    </p>
                  </div>

                  <div className="about-home__wrappe--info__content__button">
                    <Link href="/nosotros">
                      <Button className="button__cta">
                        Conocé nuestra historia
                        <ArrowRight size={20} />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </CenterContainer>
  );
};

export default AboutHomeSection;
