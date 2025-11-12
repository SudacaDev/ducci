"use client";

import InnerLayout from "@/components/inner-layout";
import Product from "@/components/products/Product";
import Aside from "@/feature/products/Aside";
import ViewToggle from "@/feature/products/ViewToggle";
import ProductsList from "@/feature/products/ProductsList";
import CartWidget from "@/feature/products/CartWidget";
import OrderSelector from "@/feature/products/OrderSelector"; // NUEVO

import "./styles/products.css";

const ProductsPageContent = () => {
  return (
    <div id="product-wrapper" className="h-full  ">
      <InnerLayout bannerTitle="Nuestros Productos">
        <Product>
          <Aside />
          <div className="flex flex-col relatve">
            
            <OrderSelector /> 
            <ProductsList />
          </div>
          <CartWidget />
        </Product>
      </InnerLayout>
    </div>
  );
};

export default ProductsPageContent;