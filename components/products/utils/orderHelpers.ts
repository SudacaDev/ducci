import type { Product as ProductType } from "@/types/product.type";
import type { IceCreamSize } from "@/types/order.type";

export const getSizeFromProduct = (product: ProductType): IceCreamSize => {
  if (product.name.includes("1 Kilo") || product.name.includes("1kg")) return "1";
  if (product.name.includes("1/2 Kilo") || product.name.includes("1/2kg")) return "1/2";
  if (product.name.includes("1/4 Kilo") || product.name.includes("1/4kg")) return "1/4";
  return "1";
};

 