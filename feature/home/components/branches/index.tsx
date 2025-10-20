"use client"
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

const BranchesHomeSection = () => {



    const goToPage = useGoToPage()


    return (
        <section className="branches-home">
            <CenterContainer center className="">
                <div className="branches-home--wrapper">
                    <div className="branches-home--content-info">
                        <Block>
                            <Block.Content>
                                <Block.Subtitle> Sucursales </Block.Subtitle>
                                <Block.Title>
                                    Espacios pensados para <span>compartir momentos</span>
                                </Block.Title>
                            </Block.Content>
                            <Block.Body>
                                <p>
                                    Cada local Ducci es un lugar de encuentro diseñado para que
                                    todas las edades puedan disfrutar. Espacios cálidos,
                                    accesibles y bien pensados donde el helado es la excusa
                                    perfecta para cortar la rutina y crear recuerdos.
                                </p>
                                <ul>
                                    <li>
                                        <p> Ambientes luminosos y acogedores con estética mediterránea </p>
                                    </li>
                                    <li><p>Atención cercana y amigable en cada visita </p> </li>
                                    <li><p>Locales cómodos para familias, amigos y parejas </p> </li>
                                    <li><p>El mismo cuidado y calidad en cada sucursal </p> </li>
                                </ul>
                                <p>
                                    No buscamos estar en todos lados: buscamos estar bien, ser
                                    sólidos y dejar huella en cada lugar donde abrimos las
                                    puertas.
                                </p>
                            </Block.Body>
                            <Block.Footer>
                                <CTAButton onClick={() => goToPage(MENU.BRANCHES)} aria-label="ir a sucursales" aria-title="Sucursales" className="button__cta--secondary">
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
                        <ParallaxFloat >
                            <div className="flex items-center gap-4">
                                <div className="icon">
                                    <FaShop size={32} />
                                </div>
                                <div className="flex flex-col item-content-info">
                                    <p className="font-bold">Descubri</p>
                                    <p>Nustros Locales</p>
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
