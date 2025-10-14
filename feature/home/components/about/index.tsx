import CenterContainer from "@/components/container/center";
import Image from "next/image";

const AboutHomeSection = () => {
  return (
    <CenterContainer center>
      <section className="about-home">
        <div id="about_wrapper" className="flex">
          <div className="flex-1 max-w-[400px]">
            <Image
              src="/images/guilt-image.jpg"
              fill
              objectFit="cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              alt=""
              className=""
            />
          </div>
          <div className="flex-1">center</div>
        </div>
      </section>
    </CenterContainer>
  );
};
export default AboutHomeSection;
