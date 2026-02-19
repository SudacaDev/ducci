export type IceCreamSize =
  | "1/4"
  | "1/2"
  | "1"
  | "1-bocha"
  | "2-bochas"
  | "3-bochas";

type BaseOrder = {
  id: string;
  productId: number;
  productName: string;
  price: number;
};

export type FlavorOrder = BaseOrder & {
  type: "flavor-selection";
  size: IceCreamSize;
  maxFlavors: number;
  selectedFlavors: string[];
  quantity: number;
};

export type QuantityOrder = BaseOrder & {
  type: "quantity-selection";
  quantity: number;
};

export type SingleItemOrder = BaseOrder & {
  type: "single-item";
  quantity: number;
};

export type BoxOrder = BaseOrder & {
  type: "box";
  boxQuantity: number;
  quantity: number;
};

export type Order = FlavorOrder | QuantityOrder | SingleItemOrder | BoxOrder;

export type OrderWithFlavors = Extract<Order, { selectedFlavors: string[] }>;

export type OrderWithoutQuantity = Exclude<Order, QuantityOrder>;

export type OrderSummary = Pick<Order, "id" | "productName" | "price">;

type SizeConfig = {
  maxFlavors: number;
  label: string;
  weight: number;
};

export const SIZE_CONFIG: Record<IceCreamSize, SizeConfig> = {
  "1/4": { maxFlavors: 3, label: "1/4 Kilo", weight: 0.25 },
  "1/2": { maxFlavors: 3, label: "1/2 Kilo", weight: 0.5 },
  "1": { maxFlavors: 4, label: "1 Kilo", weight: 1 },
  "1-bocha": { maxFlavors: 1, label: "1 Bocha", weight: 0.15 },
  "2-bochas": { maxFlavors: 2, label: "2 Bochas", weight: 0.3 },
  "3-bochas": { maxFlavors: 3, label: "3 Bochas", weight: 0.45 },
} as const;
