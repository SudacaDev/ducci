import { useEffect, RefObject } from "react";
import gsap from "gsap"; 
import { SplitText } from "gsap/SplitText"; 
import { ScrollTrigger } from "gsap/ScrollTrigger";


/**
 * Hook personalizado para aplicar animaciones GSAP al componente HeroBanner.
 *
 * @param {RefObject<HTMLHeadingElement | null>} refTitle - Referencia al título principal (para SplitText).
 * @param {RefObject<HTMLParagraphElement | null>} refEyebrow - Referencia al texto superior.
 * @param {RefObject<HTMLParagraphElement | null>} refBodyCopy - Referencia a la descripción.
 * @param {RefObject<HTMLDivElement | null>} refButtonCTA - Referencia al contenedor del botón CTA.
 */
export const useHeroAnimation = (
  refTitle?: RefObject<HTMLHeadingElement | null>,
  refEyebrow?: RefObject<HTMLParagraphElement | null>,
  refBodyCopy?: RefObject<HTMLParagraphElement | null>,
  refButtonCTA?: RefObject<HTMLDivElement | null>
) => {

    useEffect(() => {
        // Registramos los plugins - GSAP maneja automáticamente las registraciones duplicadas
        gsap.registerPlugin(SplitText, ScrollTrigger);

        let ctx = gsap.context(() => {
            
            
            const getSplitTextInstance = (target: any) => {
               
                return new SplitText(target, { 
                    type: "chars, words, lines", 
                    linesClass: "clip-text",
                    
                });
            };

  
            if (refEyebrow?.current) {
                gsap.fromTo(refEyebrow.current, {
                    opacity: 0,
                    x: -20,
                  
                    scrollTrigger: {
                        trigger: refEyebrow.current,
                        start: "top top",
                        toggleActions: "play none none reverse",
                    }
                }, {
                     
                    scale: 1,
                    opacity: 1,
                    x: 0,
                    duration: 1.4, 
                    ease: "power4.inOut",
                    scrollTrigger: {
                            trigger: refTitle?.current,
                            start: "top 70%",
                            toggleActions: "play none none reverse", 
                        }
                });
            }
            
           
            if (refTitle?.current) {
                const splitText = getSplitTextInstance(refTitle?.current);
                if (splitText.chars.length > 0) { 
                    gsap.from(splitText.chars, {
                        opacity: 0,
                        y: 20,
                        stagger: 0.02,
                        duration: 0.5,
                        ease: "power4.inOut",
                        scrollTrigger: {
                            trigger: refTitle.current,
                            start: "top 70%",
                            toggleActions: "play none none reverse", 
                        }
                    });
                }
            }

           
            if (refBodyCopy?.current) {
                gsap.fromTo(refBodyCopy.current, {
                    opacity: 0,
                    x: 20,
                }, {
                    opacity: 1,
                    x: 0,
                    duration: 1.2,
                    ease: "power4.inOut",
                    scrollTrigger: {
                        trigger: refBodyCopy.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    }
                });
            }

            // 5. Animación del Botón CTA
            if (refButtonCTA?.current) {
                gsap.fromTo(refButtonCTA.current, {
                    opacity: 0,
                    x: -20,
                }, {
                    opacity: 1,
                    x: 0,
                    duration: 1.4,
                    ease: "power4.inOut",
                    scrollTrigger: {
                        trigger: refButtonCTA.current,
                        start: "top 90%",
                        toggleActions: "play none none reverse",
                    }
                });
            }
        }, [refTitle, refEyebrow, refBodyCopy, refButtonCTA]); 

      
        return () => ctx.revert();
   
    }, [refTitle, refEyebrow, refBodyCopy, refButtonCTA]); 
};