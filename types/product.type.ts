export type ProductType =
  | "flavor-selection"
  | "quantity-selection"
  | "single-item"
  | "box";

export interface Product {
  id: number;
  name: string;
  price: number;
  category:
    | "clasicos"
    | "frutales"
    | "premium"
    | "veganos"
    | "especiales"
    | "individuales"
    | "cajas"
    | "postres";
  description: string;
  image?: string;

  // CAMBIO: De branch (objeto) a branches (array)
  branches: {
    id: number;
    name: string;
    address: string;
  }[];

  type: ProductType;

  config?: {
    maxFlavors?: number;
    weight?: number;
    maxQuantity?: number;
    boxQuantity?: number;
    isAvailable?: boolean;
  };
}

export interface Category {
  id: string;
  label: string;
}
