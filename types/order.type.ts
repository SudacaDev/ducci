export type IceCreamSize = "1/4" | "1/2" | "1" | "1-bocha" | "2-bochas" | "3-bochas";

 
export interface FlavorOrder {
  id: string;
  type: "flavor-selection";
  productId: number; 
  productName: string;
  size: IceCreamSize;
  maxFlavors: number;
  price: number;
  selectedFlavors: string[]; 
}

 
export interface QuantityOrder {
  id: string;
  type: "quantity-selection";
  productId: number;
  productName: string;
  price: number;
  quantity: number;
}

 
export interface SingleItemOrder {
  id: string;
  type: "single-item";
  productId: number;
  productName: string;
  price: number;
}

 
export interface BoxOrder {
  id: string;
  type: "box";
  productId: number;
  productName: string;
  price: number;
  boxQuantity: number;
}

 
export type Order = FlavorOrder | QuantityOrder | SingleItemOrder | BoxOrder;

 
export const SIZE_CONFIG = {
  "1/4": { maxFlavors: 3, label: "1/4 Kilo", weight: 0.25 },
  "1/2": { maxFlavors: 3, label: "1/2 Kilo", weight: 0.5 },
  "1": { maxFlavors: 4, label: "1 Kilo", weight: 1 },
  "1-bocha": { maxFlavors: 1, label: "1 Bocha", weight: 0.15 },
  "2-bochas": { maxFlavors: 2, label: "2 Bochas", weight: 0.3 },
  "3-bochas": { maxFlavors: 3, label: "3 Bochas", weight: 0.45 },
} as const;