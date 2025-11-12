"use client";

import { createContext, useContext, ReactNode, Suspense, useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { PROD } from "@/constants/prod";
import type { Product as ProductType } from "@/types/product.type";
import type { IceCreamOrder, IceCreamSize } from "@/types/order.type";
import { SIZE_CONFIG } from "@/types/order.type";

export interface ProductsContextType {
  products: ProductType[];
  filteredProducts: ProductType[];
  selectedCategory: string;
  viewMode: "grid" | "list";
  sortOrder: "asc" | "desc" | "none";
  openFilter: boolean;
  selectedBranchId: number | null;
  confirmedOrders: IceCreamOrder[]; // Pedidos confirmados en el carrito
  currentDraft: IceCreamOrder | null; // Borrador del pedido actual

  setSelectedCategory: (category: string) => void;
  setViewMode: (mode: "grid" | "list") => void;
  setSortOrder: (order: "asc" | "desc" | "none") => void;
  openFilterToggle: () => void;
  startNewOrder: (size: IceCreamSize, pricePerKg: number) => void;
  addFlavorToDraft: (flavorSlug: string) => void;
  removeFlavorFromDraft: (flavorSlug: string) => void;
  confirmCurrentOrder: () => void;
  cancelCurrentOrder: () => void;
  removeConfirmedOrder: (orderId: string) => void;
  setBranchId: (branchId: number | null) => void;
  clearCart: () => void;
}

export const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined,
);

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error(
      "Los componentes Product.* deben usarse dentro de <Product>",
    );
  }
  return context;
};

interface ProductProps {
  children: ReactNode;
}

const ProductProvider = ({ children }: ProductProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedCategory = searchParams.get("category") || "todos";
  const viewMode = (searchParams.get("view") as "grid" | "list") || "grid";
  const sortOrder =
    (searchParams.get("sort") as "asc" | "desc" | "none") || "none";
  const openFilter = searchParams.get("filter") === "open";
  const branchIdParam = searchParams.get("branch-id");
  const ordersParam = searchParams.get("orders");

  // Parsear órdenes de la URL
  const parseOrdersFromURL = (ordersString: string | null): IceCreamOrder[] => {
    if (!ordersString) return [];
    
    try {
      return ordersString.split("|").map((orderStr, index) => {
        const [sizeStr, priceStr, flavorsStr] = orderStr.split(":");
        const size = sizeStr as IceCreamSize;
        const flavors = flavorsStr ? flavorsStr.split(",").filter(f => f) : [];
        
        return {
          id: `order-${Date.now()}-${index}`,
          size,
          maxFlavors: SIZE_CONFIG[size].maxFlavors,
          pricePerKg: parseFloat(priceStr),
          selectedFlavors: flavors,
        };
      });
    } catch (error) {
      console.error("Error parsing orders from URL:", error);
      return [];
    }
  };

  // Convertir órdenes a string para URL
  const ordersToURLString = (orders: IceCreamOrder[]): string => {
    return orders
      .map(order => 
        `${order.size}:${order.pricePerKg}:${order.selectedFlavors.join(",")}`
      )
      .join("|");
  };

  const [selectedBranchId, setSelectedBranchIdState] = useState<number | null>(
    branchIdParam ? Number.parseInt(branchIdParam) : null
  );

  const [confirmedOrders, setConfirmedOrdersState] = useState<IceCreamOrder[]>(
    parseOrdersFromURL(ordersParam)
  );

  // Borrador del pedido actual (no se guarda en URL hasta confirmar)
  const [currentDraft, setCurrentDraft] = useState<IceCreamOrder | null>(null);

  useEffect(() => {
    const newBranchId = branchIdParam ? Number.parseInt(branchIdParam) : null;
    const newOrders = parseOrdersFromURL(ordersParam);

    setSelectedBranchIdState(newBranchId);
    setConfirmedOrdersState(newOrders);
  }, [branchIdParam, ordersParam]);

  const updateURL = (params: Record<string, string | null>) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    Object.entries(params).forEach(([key, value]) => {
      if (
        value === null ||
        value === "todos" ||
        value === "grid" ||
        value === "none" ||
        value === "closed" ||
        value === ""
      ) {
        current.delete(key);
      } else {
        current.set(key, value);
      }
    });

    const search = current.toString();
    const query = search ? `?${search}` : "";

    window.history.replaceState({}, '', `${pathname}${query}`);
  };

  const setSelectedCategory = (category: string) => {
    updateURL({ category });
  };

  const setViewMode = (mode: "grid" | "list") => {
    updateURL({ view: mode });
  };

  const setSortOrder = (order: "asc" | "desc" | "none") => {
    updateURL({ sort: order });
  };

  const openFilterToggle = () => {
    updateURL({ filter: openFilter ? "closed" : "open" });
  };

  const setBranchId = (branchId: number | null) => {
    setSelectedBranchIdState(branchId);
    updateURL({ "branch-id": branchId ? branchId.toString() : null });
  };

  const clearCart = () => {
    setSelectedBranchIdState(null);
    setConfirmedOrdersState([]);
    setCurrentDraft(null);
    updateURL({
      "branch-id": null,
      orders: null,
    });
  };

  const startNewOrder = (size: IceCreamSize, pricePerKg: number) => {
    const newDraft: IceCreamOrder = {
      id: `draft-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      size,
      maxFlavors: SIZE_CONFIG[size].maxFlavors,
      pricePerKg,
      selectedFlavors: [],
    };

    setCurrentDraft(newDraft);
  };

  const addFlavorToDraft = (flavorSlug: string) => {
    if (!currentDraft) return;

    // No agregar si ya existe
    if (currentDraft.selectedFlavors.includes(flavorSlug)) {
      return;
    }

    // No agregar si alcanzó el máximo
    if (currentDraft.selectedFlavors.length >= currentDraft.maxFlavors) {
      return;
    }

    setCurrentDraft({
      ...currentDraft,
      selectedFlavors: [...currentDraft.selectedFlavors, flavorSlug],
    });
  };

  const removeFlavorFromDraft = (flavorSlug: string) => {
    if (!currentDraft) return;

    setCurrentDraft({
      ...currentDraft,
      selectedFlavors: currentDraft.selectedFlavors.filter(f => f !== flavorSlug),
    });
  };

  const confirmCurrentOrder = () => {
  if (!currentDraft) return;

  // Validar que tenga al menos un sabor
  if (currentDraft.selectedFlavors.length === 0) {
    return;
  }

  // Agregar a pedidos confirmados
  const newConfirmedOrders = [...confirmedOrders, currentDraft];
  setConfirmedOrdersState(newConfirmedOrders);

  // Limpiar borrador - ESTO RESETEA EL SELECT
  setCurrentDraft(null);

  // Actualizar URL
  updateURL({
    "branch-id": selectedBranchId ? selectedBranchId.toString() : null,
    orders: ordersToURLString(newConfirmedOrders),
  });
};
  const cancelCurrentOrder = () => {
    setCurrentDraft(null);
  };

  const removeConfirmedOrder = (orderId: string) => {
    const newOrders = confirmedOrders.filter(order => order.id !== orderId);
    setConfirmedOrdersState(newOrders);

    updateURL({
      "branch-id": selectedBranchId ? selectedBranchId.toString() : null,
      orders: newOrders.length > 0 ? ordersToURLString(newOrders) : null,
    });
  };

  let filteredProducts = PROD.filter((product) => {
    if (selectedCategory !== "todos" && product.category !== selectedCategory) {
      return false;
    }

    if (selectedBranchId !== null && product.branch.id !== selectedBranchId) {
      return false;
    }

    return true;
  });

  filteredProducts = filteredProducts.sort((a, b) => {
    if (sortOrder === "asc") return a.price - b.price;
    if (sortOrder === "desc") return b.price - a.price;
    return 0;
  });

  const value = {
    products: PROD,
    filteredProducts,
    selectedCategory,
    viewMode,
    sortOrder,
    selectedBranchId,
    confirmedOrders,
    currentDraft,
    setSelectedCategory,
    setViewMode,
    setSortOrder,
    openFilterToggle,
    openFilter,
    startNewOrder,
    addFlavorToDraft,
    removeFlavorFromDraft,
    confirmCurrentOrder,
    cancelCurrentOrder,
    removeConfirmedOrder,
    setBranchId,
    clearCart,
  };

  return (
    <ProductsContext.Provider value={value}>
      <div id="product" className="h-full container m-auto my-4">
        {children}
      </div>
    </ProductsContext.Provider>
  );
};

const Product = ({ children }: ProductProps) => {
  return (
    <Suspense
      fallback={
        <div className="h-full container m-auto my-4 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando productos...</p>
          </div>
        </div>
      }
    >
      <ProductProvider>{children}</ProductProvider>
    </Suspense>
  );
};

export default Product;