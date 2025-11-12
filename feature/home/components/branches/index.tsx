"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { FaShop } from "react-icons/fa6";

import useGoToPage from "@/libs/goToPage";

import Block from "@/components/content-block";
import CTAButton from "@/components/cta-button";
import CenterContainer from "@/components/container/center";

import { MENU } from "@/types/nav.type";

import "../../style/branches.css";
import ParallaxFloat from "@/components/parallax-float";
import { useHeroAnimation } from "../hero/hooks/useHeroAnimation";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BranchesHomeSection = () => {
  const goToPage = useGoToPage();

  const refTitle = useRef<HTMLDivElement>(null);
  const refBodyCopy = useRef<HTMLDivElement>(null);
  const refEyebrow = useRef<HTMLDivElement>(null);
  const refButtonCTA = useRef<HTMLDivElement>(null);
  const refContentBranchesPin = useRef<HTMLDivElement>(null);

  useHeroAnimation(refTitle, refEyebrow, refBodyCopy, refButtonCTA);

  useEffect(() => {
    if (!refContentBranchesPin.current) return;

    const ctx = gsap.context(() => {
      gsap.set(refContentBranchesPin.current, { background: "white" });
      ScrollTrigger.create({
        trigger: refContentBranchesPin.current,
        start: "top top",
        end: "+=200%",
        pin: true,
        pinSpacing: true,
        scrub: 1,

        onUpdate: (self) => {
          if (self.progress > 0.8) {
            gsap.set(refContentBranchesPin.current, { zIndex: 1 });
          }
        },
      });
    }, refContentBranchesPin);

    return () => ctx.revert();
  }, []);

  return (
    <section className="branches-home" ref={refContentBranchesPin}>
      <CenterContainer center className="">
        <div className="branches-home--wrapper">
          <div className="branches-home--content-info">
            <Block>
              <Block.Content>
                <Block.Subtitle ref={refEyebrow}> Sucursales </Block.Subtitle>
                <Block.Title ref={refTitle}>
                  Espacios pensados para <span>compartir momentos</span>
                </Block.Title>
              </Block.Content>
              <Block.Body ref={refBodyCopy}>
                <p>
                  Cada local Ducci es un lugar de encuentro diseñado para que
                  todas las edades puedan disfrutar. Espacios cálidos,
                  accesibles y bien pensados donde el helado es la excusa
                  perfecta para cortar la rutina y crear recuerdos.
                </p>
                <ul>
                  <li>
                    <p>
                      Ambientes luminosos y acogedores con estética mediterránea{" "}
                    </p>
                  </li>
                  <li>
                    <p>Atención cercana y amigable en cada visita </p>{" "}
                  </li>
                  <li>
                    <p>Locales cómodos para familias, amigos y parejas </p>{" "}
                  </li>
                  <li>
                    <p>El mismo cuidado y calidad en cada sucursal </p>{" "}
                  </li>
                </ul>
                <p>
                  No buscamos estar en todos lados: buscamos estar bien, ser
                  sólidos y dejar huella en cada lugar donde abrimos las
                  puertas.
                </p>
              </Block.Body>
              <Block.Footer ref={refButtonCTA}>
                <CTAButton
                  onClick={() => goToPage(MENU.BRANCHES)}
                  aria-label="ir a sucursales"
                  aria-title="Sucursales"
                  className="button__cta--secondary"
                >
                  Conocé las sucursales
                  <span>
                    <ArrowRight />
                  </span>
                </CTAButton>
              </Block.Footer>
            </Block>
          </div>
          <div className="branches-home--image-container">
            <div className="branches-home--image__content item-content-first">
              <Image
                src="/images/guilt-image.jpg"
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, 50vw"
                alt="Helados artesanales Ducci"
              />
            </div>
            <div className="branches-home--image__content item-content-second">
              <Image
                src="/images/guilt-image.jpg"
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, 50vw"
                alt="Helados artesanales Ducci"
              />
            </div>
            <ParallaxFloat>
              <div className="flex items-center gap-4">
                <div className="icon">
                  <FaShop size={32} />
                </div>
                <div className="flex flex-col item-content-info">
                  <p className="font-bold">Descubri</p>
                  <p className="branches-home--image__float--paragraph">
                    Nustros Locales
                  </p>
                </div>
              </div>
            </ParallaxFloat>
          </div>
        </div>
      </CenterContainer>
    </section>
  );
};
export default BranchesHomeSection;
