
import InnerLayout from "@/components/inner-layout";
import DucciBranchesMap from "./DucciBranchesMap";

import "./styles/branches-sidebar.css";
import ProductsHomeSection from "../home/components/products";


const BranchesContentPage = () => {
  return (
    <InnerLayout id="branches" bannerTitle="Sucursales">
      <div> carousel sucursales </div>
      <DucciBranchesMap />
     <ProductsHomeSection />
     
    </InnerLayout>
  );
};
export default BranchesContentPage;
