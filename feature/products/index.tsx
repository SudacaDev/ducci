"use client";

import InnerLayout from "@/components/inner-layout";
import Product from "@/components/products/Product";
import Aside from "@/feature/products/Aside";
import ViewToggle from "@/feature/products/ViewToggle";
import ProductsList from "@/feature/products/ProductsList";
import CartWidget from "@/feature/products/CartWidget";
import SizeSelector from "@/feature/products/SizeSelector";

import "./styles/products.css";

const ProductsPageContent = () => {
  return (
    <div id="product-wrapper" className="h-full overflow-hidden ">
      <InnerLayout bannerTitle="Nuestros Productos">
        <Product>
          <Aside />
          <div className="flex flex-col gap-4">
            <ViewToggle />
            <SizeSelector />
            <ProductsList />
          </div>
          <CartWidget />
        </Product>
      </InnerLayout>
    </div>
  );
};

export default ProductsPageContent;

 
/** import InnerLayout from "@/components/inner-layout";
import { PROD } from "@/constants/prod";

import "./styles/products.css"
import { LayoutGrid, LayoutList } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProductsPageContent = () => {

  return (
    <div id="product-wrapper" className="h-full overflow-hidden ">
      <InnerLayout bannerTitle="Productos">
        <div className="grid grid-cols-[240px_1fr] gap-2   h-full container m-auto my-4">
          <div className=" "> aside </div>
          <div className=" flex flex-col">
            <div className="flex py-4 gap-2">
              <Button type="button" className=" filter-button active   hover:cursor-pointer" > 
                <LayoutGrid size={32}  />
              </Button>
              <Button className="  filter-button hover:cursor-pointer">  
                <LayoutList size={32}  />
              </Button>
            </div>
            <div className="products-list-container product-list-block  py-4">
              {PROD.map((item) => (
                <div key={item.id + 1} className="product-list_item rounded-lg  ">
                  <div className="product-list_image inset-shadow-sm rounded-md">
                    <figure>
                      <img src="https://html.designingmedia.com/icedelight/assets/images/classic-image2.png" alt="" loading="lazy" />
                    </figure>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="product-list_name">
                      <h3> {item.name}</h3>
                    </div>
                    <div className="product-list_desc"> {item.description}</div>
                    <div className="product-list_price"> {item.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </InnerLayout>
    </div>
  );
};
export default ProductsPageContent;

**/
