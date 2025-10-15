import CenterContainer from "@/components/container/center";
import SectionHeader from "@/components/section-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const NewsletterHomeSection = () => {
    return (
        <section className="newsletter-home-wrapper">
            <CenterContainer center className="newsletter-home-content flex">
                <div className="flex">

                    <div className="newsletter-home-content__form">
                        <div className="ss">
                            <SectionHeader align="center" >
                                <h2 className="section-header__title">
                                    <span>Beneficios especiales </span> te esperan
                                </h2>
                                <p className="section-header__subtitle">
                                    Promociones especiales, lanzamientos de sabores únicos y
                                    descuentos exclusivos para suscriptores
                                </p>
                            </SectionHeader>
                        </div>
                        <form className="flex">
                            <Input type="text" placeholder="ingresa tu email para subscribirte al newsletter" /> <Button className="button__cta"> Subscibite</Button>
                        </form>
                    </div>
                    <div>
                        imagen
                    </div>
                </div>
            </CenterContainer>
        </section>
    );
};
export default NewsletterHomeSection;
