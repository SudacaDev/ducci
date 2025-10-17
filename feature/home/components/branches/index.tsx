import CenterContainer from "@/components/container/center";
import Block from "@/components/content-block";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { FaShop } from "react-icons/fa6";

import "../../style/branches.css";
import { MENU } from "@/types/nav.type";
import Image from "next/image";

const BranchesHomeSection = () => {
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
                                        Ambientes luminosos y acogedores con estética mediterránea
                                    </li>
                                    <li>Atención cercana y amigable en cada visita</li>
                                    <li>Locales cómodos para familias, amigos y parejas</li>
                                    <li>El mismo cuidado y calidad en cada sucursal</li>
                                </ul>
                                <p>
                                    No buscamos estar en todos lados: buscamos estar bien, ser
                                    sólidos y dejar huella en cada lugar donde abrimos las
                                    puertas.
                                </p>
                            </Block.Body>
                            <Block.Footer>
                                <Link href={MENU.BRANCHES} aria-label="ir a sucursales" title="Sucursales" className="button__cta--secondary">
                                    Conocé las sucursales
                                    <span>
                                        <ArrowRight />
                                    </span>
                                </Link>
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
                        <div className="branches-home--image__float">
                            <div className="flex items-center gap-4">
                                <div className="icon">
                                    <FaShop size={32} />
                                </div>
                                <div className="flex flex-col item-content-info">
                                    <p className="font-bold">Descubri</p>
                                    <p>Nustros Locales</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </CenterContainer>
        </section>
    );
};
export default BranchesHomeSection;
