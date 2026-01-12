import { createContext, useContext } from "react";
import type { Product as ProductType } from "@/types/product.type";
import type { Order, IceCreamSize } from "@/types/order.type";

export interface ProductsContextType {
  // Data
  products: ProductType[];
  filteredProducts: ProductType[];
  allFlavors: ProductType[];

  // Filters
  selectedCategory: string;
  viewMode: "grid" | "list";
  sortOrder: "asc" | "desc" | "none";
  openFilter: boolean;
  selectedBranchId: number | null;

  // Orders
  confirmedOrders: Order[];
  currentDraft: Order | null;

  // Loading & Error
  loading: boolean;
  error: string | null;

  // Filter actions
  setSelectedCategory: (category: string) => void;
  setViewMode: (mode: "grid" | "list") => void;
  setSortOrder: (order: "asc" | "desc" | "none") => void;
  openFilterToggle: () => void;
  setBranchId: (branchId: number | null) => void;

  // Flavor orders
  startFlavorOrder: (product: ProductType) => void;
  addFlavorToDraft: (flavorSlug: string) => void;
  removeFlavorFromDraft: (flavorSlug: string) => void;
  addMultipleFlavorOrders: (
    product: ProductType,
    selectedFlavors: string[],
    quantity: number,
  ) => void;

  // Quantity orders
  startQuantityOrder: (product: ProductType, quantity: number) => void;
  updateQuantityOrder: (quantity: number) => void;

  // Other orders
  addSingleItemOrder: (product: ProductType, quantity: number) => void;
  addBoxOrder: (product: ProductType, quantity: number) => void;

  // Order management
  confirmCurrentOrder: () => void;
  cancelCurrentOrder: () => void;
  removeConfirmedOrder: (orderId: string) => void;
  clearCart: () => void;
}

export const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined,
);

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts must be used within <Product>");
  }
  return context;
};