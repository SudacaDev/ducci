import CenterContainer from "@/components/container/center";
import InnerLayout from "@/components/inner-layout";
import JourneyCon from "./JourneyCon";
import OurPhilosophy from "./OurPhilosophy";

import "./style/about.css";

const AboutUsContentPage = () => {
  return (
    <InnerLayout id="about" bannerTitle="Quienes Somos">
      <CenterContainer center>
        <JourneyCon />
      </CenterContainer>
      <CenterContainer className="bg-[#b2cee4]">
        <div className="container mx-auto">
          <OurPhilosophy />
        </div>
      </CenterContainer>
    </InnerLayout>
  );
};
export default AboutUsContentPage;
