export type IceCreamSize = "1/4" | "1/2" | "1";

export interface IceCreamOrder {
  id: string; // ID único del pedido
  size: IceCreamSize;
  maxFlavors: number;
  pricePerKg: number;
  selectedFlavors: string[]; // array de slugs de sabores
}

export const SIZE_CONFIG = {
  "1/4": { maxFlavors: 3, label: "1/4 Kilo", weight: 0.25 },
  "1/2": { maxFlavors: 3, label: "1/2 Kilo", weight: 0.25 },
  "1": { maxFlavors: 4, label: "1 Kilo", weight: 1 },
} as const;