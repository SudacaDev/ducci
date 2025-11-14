import InnerLayout from "@/components/inner-layout";
import DucciBranchesMap from "./DucciBranchesMap";

import "./styles/branches-sidebar.css";
import ProductsHomeSection from "../home/components/products";
import { CarouselProducts } from "./components/carousel-products";

const BranchesContentPage = () => {
  return (
    <InnerLayout id="branches" bannerTitle="Sucursales">
      <CarouselProducts />
      <DucciBranchesMap />
      <ProductsHomeSection />
    </InnerLayout>
  );
};
export default BranchesContentPage;
