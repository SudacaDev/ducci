import AboutHomeSection from "./components/about";
import HeroBanner from "./components/hero";
import NewsletterHomeSection from "./components/newsletter";
import ProductsHomeSection from "./components/products";

import "./style/home.css";

const HomePageContent = () => {
  return (
    <div className="flex flex-col">
      <HeroBanner />
      <ProductsHomeSection />
      <AboutHomeSection />
      <NewsletterHomeSection />
    </div>
  );
};

export default HomePageContent;
