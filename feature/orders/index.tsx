import CenterContainer from "@/components/container/center";
import InnerLayout from "@/components/inner-layout";

import "./style/order.css";

const OrdersPageContent = () => {
  return (
    <InnerLayout id="orders" bannerTitle="Pedidos">
      <CenterContainer center>
        <div className="py-8">
          <p> Próximamente </p>
        </div>
      </CenterContainer>
    </InnerLayout>
  );
};

export default OrdersPageContent;
