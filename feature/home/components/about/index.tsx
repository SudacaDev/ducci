"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import Block from "@/components/content-block";
import CTAButton from "@/components/cta-button";
import CenterContainer from "@/components/container/center";
import useIntersectionObserver from "@/hooks/intersection-observer";

import "../../style/about.css";

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
    <section className="about-home__wrapper">
      <CenterContainer center>
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
                    <Block>
                      <Block.Content>
                        <Block.Subtitle> ¿Quiénes Somos? </Block.Subtitle>
                        <Block.Title>
                          Nuestros valores, <span>nuestra cultura</span>
                        </Block.Title>
                      </Block.Content>
                      <Block.Body>
                        <div className="about-home__wrappe--info__content__body">
                          <p>
                            En Ducci creemos en lo simple, en lo cuidado y en lo
                            compartido.
                          </p>
                          <p>
                            Desde quien atiende, hasta quien limpia. Todos
                            hacemos cultura.
                          </p>
                        </div>
                      </Block.Body>
                      <Block.Footer>
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
