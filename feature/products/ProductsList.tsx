"use client";

import { useProducts } from "@/components/products/Product";

 

const ProductsList = () => {
  const { filteredProducts, viewMode } = useProducts();

  return (
     <div className="products-list-container product-list-block  py-4">
      <div
        className={`products-list-container py-4 ${
          viewMode === "grid"
            ? "product-list-block"
            : "product-list-inline flex flex-col gap-4"
        }`}
      >
        {filteredProducts.length === 0 ? (
          <p className="text-center py-8 text-gray-500">
            No hay productos en esta categoría
          </p>
        ) : (
          filteredProducts.map((item) => (
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
          ))
        )}
      </div>
    </div>
  );
};

export default ProductsList;