import InnerLayout from "@/components/inner-layout";
import DucciBranchesMap from "./DucciBranchesMap";

import "./styles/branches-sidebar.css";
import "./styles/branches-grid.css";
import ProductsHomeSection from "../home/components/products";
// import { CarouselProducts } from "./components/carousel-products";
import { BranchesItemsMap } from "./BranchesItemsMap";

const BranchesContentPage = () => {
  return (
    <InnerLayout id="branches" bannerTitle="Sucursales">
      <BranchesItemsMap />
      <DucciBranchesMap />
      
      <ProductsHomeSection />
    </InnerLayout>
  );
};
export default BranchesContentPage;
