"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import CenterContainer from "@/components/container/center";
import InnerLayout from "@/components/inner-layout";
import JourneyCon from "./JourneyCon";
//import OurPhilosophy from "./OurPhilosophy";

import "./style/about.css";

const AboutUsContentPage = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    (window as any).lenis = lenis;

    function raf(time: any) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      delete (window as any).lenis;
    };
  }, []);
  return (
    <>
    <InnerLayout id="about" bannerTitle="La magia Ducci">
      <CenterContainer center>
        <JourneyCon />
      </CenterContainer>
      {/*
      <CenterContainer className="bg-[var(--primary-color)]">
        <div className="container mx-auto">
          <OurPhilosophy />
        </div>
      </CenterContainer>
      */}
    </InnerLayout>
    <div className='bottom-section'>
      <div className='botton-section_content'>
       
      </div>
    </div>
    </>
  );
};
export default AboutUsContentPage;
