import Footer from "@/components/footer";

const FooterDefault = () => {
  return (
    <Footer>
      <div className="flex w-full justify-center md:justify-start md:mt-1">
        <Footer.Logo />
      </div>

      <div className="flex w-full justify-center md:justify-start">
        <Footer.Nav />
      </div>

      <div className="flex w-full flex-col items-center md:items-start gap-8 md:gap-14 justify-center md:justify-start">
        <Footer.Address />
        <Footer.Social />
      </div>

      <div className="flex w-full justify-center md:justify-start">
        <Footer.Phones />
      </div>
    </Footer>
  );
};

export default FooterDefault;
