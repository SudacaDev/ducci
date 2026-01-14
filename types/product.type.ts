export type ProductType =
  | "flavor-selection"
  | "quantity-selection"
  | "single-item"
  | "box";

type Slug =  "postres" | "potes"

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
    | "postres"
    | "potes";
  description: string;
  image?: string;
  slug: Slug

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
