import CenterContainer from "@/components/container/center";
import InnerLayout from "@/components/inner-layout";
import DucciBranchesMap from "./DucciBranchesMap";

import "./styles/branches-sidebar.css"

const BranchesContentPage = () => {
  return (
    <InnerLayout id="branches" bannerTitle="Sucursales">
      
        
          <DucciBranchesMap />
 
   
      <CenterContainer>
        <div className="py-8">
          <p> banner </p>
        </div>
      </CenterContainer>
    </InnerLayout>
  );
};
export default BranchesContentPage;
