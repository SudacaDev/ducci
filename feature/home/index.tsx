import AboutHomeSection from "./components/about";
import HeroBanner from "./components/hero";
import ProductsHomeSection from "./components/products";

const HomePageContent = () => {
  return (
    <div className="flex flex-col">
      <HeroBanner />
      <AboutHomeSection />
      <ProductsHomeSection />
    </div>
  );
};

export default HomePageContent;
