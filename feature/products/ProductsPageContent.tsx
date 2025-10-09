"use client";

import InnerLayout from "@/components/inner-layout";
import Product from "@/components/products/Product";
import Aside from "./Aside";
import ViewToggle from "./ViewToggle";
import ProductsList from "./ProductsList";
 

const ProductsPageContent = () => {
  return (
    <InnerLayout bannerTitle="Productos">
      <Product>
        <Aside />
        
        <div className="flex flex-col">
          <ViewToggle />
          <ProductsList />
        </div>
      </Product>
    </InnerLayout>
  );
};

export default ProductsPageContent;