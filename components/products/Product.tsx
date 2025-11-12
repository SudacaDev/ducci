"use client";

import {
  createContext,
  useContext,
  ReactNode,
  Suspense,
  useState,
  useEffect,
} from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { PROD } from "@/constants/prod";
import type { Product as ProductType } from "@/types/product.type";
import type {
  Order,
  FlavorOrder,
  QuantityOrder,
  SingleItemOrder,
  BoxOrder,
  IceCreamSize,
} from "@/types/order.type";

import { SIZE_CONFIG } from "@/types/order.type";

export interface ProductsContextType {
  products: ProductType[];
  filteredProducts: ProductType[];
  selectedCategory: string;
  viewMode: "grid" | "list";
  sortOrder: "asc" | "desc" | "none";
  openFilter: boolean;
  selectedBranchId: number | null;
  confirmedOrders: Order[];
  currentDraft: Order | null;

  setSelectedCategory: (category: string) => void;
  setViewMode: (mode: "grid" | "list") => void;
  setSortOrder: (order: "asc" | "desc" | "none") => void;
  openFilterToggle: () => void;

  // Para productos con sabores
  startFlavorOrder: (product: ProductType) => void;
  addFlavorToDraft: (flavorSlug: string) => void;
  removeFlavorFromDraft: (flavorSlug: string) => void;
  addMultipleFlavorOrders: (
    product: ProductType,
    selectedFlavors: string[],
    quantity: number,
  ) => void; // ← AGREGAR ESTA LÍNEA

  // Para productos con cantidad
  startQuantityOrder: (product: ProductType, quantity: number) => void;
  updateQuantityOrder: (quantity: number) => void;

  // Para productos únicos o cajas
  addSingleItemOrder: (product: ProductType) => void;
  addBoxOrder: (product: ProductType) => void;

  // Generales
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
  const parseOrdersFromURL = (ordersString: string | null): Order[] => {
    if (!ordersString) return [];

    try {
      return ordersString.split("|").map((orderStr, index) => {
        const parts = orderStr.split(":");
        const type = parts[0] as Order["type"];
        const id = `order-${Date.now()}-${index}`;

        switch (type) {
          case "flavor-selection": {
            const [_, productId, productName, size, price, flavorsStr] = parts;
            return {
              id,
              type: "flavor-selection",
              productId: parseInt(productId),
              productName,
              size: size as IceCreamSize,
              maxFlavors: SIZE_CONFIG[size as IceCreamSize].maxFlavors,
              price: parseFloat(price),
              selectedFlavors: flavorsStr
                ? flavorsStr.split(",").filter((f) => f)
                : [],
            } as FlavorOrder;
          }

          case "quantity-selection": {
            const [_, productId, productName, price, quantity] = parts;
            return {
              id,
              type: "quantity-selection",
              productId: parseInt(productId),
              productName,
              price: parseFloat(price),
              quantity: parseInt(quantity),
            } as QuantityOrder;
          }

          case "single-item": {
            const [_, productId, productName, price] = parts;
            return {
              id,
              type: "single-item",
              productId: parseInt(productId),
              productName,
              price: parseFloat(price),
            } as SingleItemOrder;
          }

          case "box": {
            const [_, productId, productName, price, boxQuantity] = parts;
            return {
              id,
              type: "box",
              productId: parseInt(productId),
              productName,
              price: parseFloat(price),
              boxQuantity: parseInt(boxQuantity),
            } as BoxOrder;
          }

          default:
            throw new Error(`Unknown order type: ${type}`);
        }
      });
    } catch (error) {
      console.error("Error parsing orders from URL:", error);
      return [];
    }
  };

  // Convertir órdenes a string para URL
  const ordersToURLString = (orders: Order[]): string => {
    return orders
      .map((order) => {
        switch (order.type) {
          case "flavor-selection":
            return `${order.type}:${order.productId}:${order.productName}:${order.size}:${order.price}:${order.selectedFlavors.join(",")}`;

          case "quantity-selection":
            return `${order.type}:${order.productId}:${order.productName}:${order.price}:${order.quantity}`;

          case "single-item":
            return `${order.type}:${order.productId}:${order.productName}:${order.price}`;

          case "box":
            return `${order.type}:${order.productId}:${order.productName}:${order.price}:${order.boxQuantity}`;

          default:
            return "";
        }
      })
      .filter(Boolean)
      .join("|");
  };

  const [selectedBranchId, setSelectedBranchIdState] = useState<number | null>(
    branchIdParam ? Number.parseInt(branchIdParam) : null,
  );

  const [confirmedOrders, setConfirmedOrdersState] = useState<Order[]>(
    parseOrdersFromURL(ordersParam),
  );

  const [currentDraft, setCurrentDraft] = useState<Order | null>(null);

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

    window.history.replaceState({}, "", `${pathname}${query}`);
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
    setConfirmedOrdersState([]); // Limpiar carrito al cambiar sucursal
    setCurrentDraft(null);
    updateURL({
      "branch-id": branchId ? branchId.toString() : null,
      orders: null,
    });
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

  // ==========================================
  // PRODUCTOS CON SABORES (flavor-selection)
  // ==========================================
  const startFlavorOrder = (product: ProductType) => {
    if (product.type !== "flavor-selection") return;
    if (!product.config?.maxFlavors) return;

    // Cancelar draft anterior si existe
    if (currentDraft) {
      setCurrentDraft(null);
    }

    const newDraft: FlavorOrder = {
      id: `draft-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: "flavor-selection",
      productId: product.id,
      productName: product.name,
      size: getSizeFromProduct(product),
      maxFlavors: product.config.maxFlavors,
      price: product.price,
      selectedFlavors: [],
    };

    setCurrentDraft(newDraft);
  };

  const getSizeFromProduct = (product: ProductType): IceCreamSize => {
    if (product.name.includes("1 Kilo")) return "1";
    if (product.name.includes("1/2 Kilo")) return "1/2";
    if (product.name.includes("1/4 Kilo")) return "1/4";
    if (product.name.includes("1 Bocha")) return "1-bocha";
    if (product.name.includes("2 Bochas")) return "2-bochas";
    if (product.name.includes("3 Bochas")) return "3-bochas";
    return "1"; // default
  };

  const addFlavorToDraft = (flavorSlug: string) => {
    if (!currentDraft || currentDraft.type !== "flavor-selection") return;

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
    if (!currentDraft || currentDraft.type !== "flavor-selection") return;

    setCurrentDraft({
      ...currentDraft,
      selectedFlavors: currentDraft.selectedFlavors.filter(
        (f) => f !== flavorSlug,
      ),
    });
  };

  // ==========================================
  // PRODUCTOS CON CANTIDAD (quantity-selection)
  // ==========================================
  const startQuantityOrder = (product: ProductType, quantity: number) => {
    if (product.type !== "quantity-selection") return;
    if (quantity <= 0) return;

    // Crear orden directamente SIN draft
    const newOrder: QuantityOrder = {
      id: `order-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: "quantity-selection",
      productId: product.id,
      productName: product.name,
      price: product.price,
      quantity,
    };

    // Agregar directamente al carrito
    const newConfirmedOrders = [...confirmedOrders, newOrder];
    setConfirmedOrdersState(newConfirmedOrders);

    // Actualizar URL
    updateURL({
      "branch-id": selectedBranchId ? selectedBranchId.toString() : null,
      orders: ordersToURLString(newConfirmedOrders),
    });
  };

  const updateQuantityOrder = (quantity: number) => {
    if (!currentDraft || currentDraft.type !== "quantity-selection") return;

    setCurrentDraft({
      ...currentDraft,
      quantity,
    });
  };

  // ==========================================
  // PRODUCTOS ÚNICOS (single-item)
  // ==========================================
  const addSingleItemOrder = (product: ProductType) => {
    if (product.type !== "single-item") return;

    const newOrder: SingleItemOrder = {
      id: `order-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: "single-item",
      productId: product.id,
      productName: product.name,
      price: product.price,
    };

    // Agregar directamente sin draft
    const newConfirmedOrders = [...confirmedOrders, newOrder];
    setConfirmedOrdersState(newConfirmedOrders);

    updateURL({
      "branch-id": selectedBranchId ? selectedBranchId.toString() : null,
      orders: ordersToURLString(newConfirmedOrders),
    });
  };

  // ==========================================
  // CAJAS (box)
  // ==========================================
  const addBoxOrder = (product: ProductType) => {
    if (product.type !== "box") return;
    if (!product.config?.boxQuantity) return;

    const newOrder: BoxOrder = {
      id: `order-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: "box",
      productId: product.id,
      productName: product.name,
      price: product.price,
      boxQuantity: product.config.boxQuantity,
    };

    // Agregar directamente sin draft
    const newConfirmedOrders = [...confirmedOrders, newOrder];
    setConfirmedOrdersState(newConfirmedOrders);

    updateURL({
      "branch-id": selectedBranchId ? selectedBranchId.toString() : null,
      orders: ordersToURLString(newConfirmedOrders),
    });
  };

  // ==========================================
  // AGREGAR MÚLTIPLES ÓRDENES DE SABORES
  // ==========================================
  const addMultipleFlavorOrders = (
    product: ProductType,
    selectedFlavors: string[],
    quantity: number,
  ) => {
    if (product.type !== "flavor-selection") return;
    if (quantity <= 0) return;

    const getSizeFromProduct = (prod: ProductType): IceCreamSize => {
      if (prod.name.includes("1 Kilo") || prod.name.includes("1kg")) return "1";
      if (prod.name.includes("1/2 Kilo") || prod.name.includes("1/2kg"))
        return "1/2";
      if (prod.name.includes("1/4 Kilo") || prod.name.includes("1/4kg"))
        return "1/4";
      if (prod.name.includes("1 Bocha")) return "1-bocha";
      if (prod.name.includes("2 Bochas")) return "2-bochas";
      if (prod.name.includes("3 Bochas")) return "3-bochas";
      return "1";
    };

    const newOrders: FlavorOrder[] = [];

    // Crear múltiples órdenes
    for (let i = 0; i < quantity; i++) {
      const newOrder: FlavorOrder = {
        id: `order-${Date.now()}-${i}-${Math.random().toString(36).substr(2, 9)}`,
        type: "flavor-selection",
        productId: product.id,
        productName: product.name,
        size: getSizeFromProduct(product),
        maxFlavors: product.config?.maxFlavors || 1,
        price: product.price,
        selectedFlavors: selectedFlavors,
      };
      newOrders.push(newOrder);
    }

    // Agregar todas las órdenes
    const updatedOrders = [...confirmedOrders, ...newOrders];
    setConfirmedOrdersState(updatedOrders);

    // Actualizar URL
    updateURL({
      "branch-id": selectedBranchId ? selectedBranchId.toString() : null,
      orders: ordersToURLString(updatedOrders),
    });
  };
  // ==========================================
  // GENERALES
  // ==========================================
  const confirmCurrentOrder = () => {
    if (!currentDraft) return;

    // Validaciones por tipo
    if (
      currentDraft.type === "flavor-selection" &&
      currentDraft.selectedFlavors.length === 0
    ) {
      return;
    }

    if (
      currentDraft.type === "quantity-selection" &&
      currentDraft.quantity <= 0
    ) {
      return;
    }

    // Agregar a pedidos confirmados
    const newConfirmedOrders = [...confirmedOrders, currentDraft];
    setConfirmedOrdersState(newConfirmedOrders);

    // Limpiar borrador
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
    const newOrders = confirmedOrders.filter((order) => order.id !== orderId);
    setConfirmedOrdersState(newOrders);

    updateURL({
      "branch-id": selectedBranchId ? selectedBranchId.toString() : null,
      orders: newOrders.length > 0 ? ordersToURLString(newOrders) : null,
    });
  };

  let filteredProducts = PROD.filter((product) => {
    // Filtrar por categoría
    if (selectedCategory !== "todos" && product.category !== selectedCategory) {
      return false;
    }

    // CAMBIO: Filtrar por sucursal - verificar si la sucursal está en el array
    if (selectedBranchId !== null) {
      const hasThisBranch = product.branches.some(
        (branch) => branch.id === selectedBranchId,
      );
      if (!hasThisBranch) {
        return false;
      }
    }

    // Solo mostrar productos "comprables" (no sabores sueltos)
    if (product.type === "flavor-selection" && product.price === 0) {
      return false;
    }

    return true;
  });

  // Ordenar productos
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
    startFlavorOrder,
    addFlavorToDraft,
    removeFlavorFromDraft,
    addMultipleFlavorOrders, // ← AGREGAR ESTA LÍNEA
    startQuantityOrder,
    updateQuantityOrder,
    addSingleItemOrder,
    addBoxOrder,
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
