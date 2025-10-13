import CenterContainer from "@/components/container/center";
import InnerLayout from "@/components/inner-layout";

const OrdersPageContent = () => {
  return <InnerLayout bannerTitle="Pedidos">
    <CenterContainer center>
     <div className="py-8"> pedidos</div>
    </CenterContainer>
  </InnerLayout>;
};

export default OrdersPageContent;
