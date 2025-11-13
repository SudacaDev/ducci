"use client";

import { ReactNode, useState, useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useProductsDB } from "@/hooks/useProducts";
import { useFlavorsDB } from "@/hooks/useFlavors";
import { ProductsContext } from "./ProductContext";
import { parseOrdersFromURL, ordersToURLString } from "./utils/orderParsers";
import { getSizeFromProduct } from "./utils/orderHelpers";
import type { Product as ProductType } from "@/types/product.type";
import type { Order, FlavorOrder, QuantityOrder, SingleItemOrder, BoxOrder } from "@/types/order.type";

interface ProductProps {
  children: ReactNode;
}

 
const ProductProvider = ({ children }: ProductProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const selectedCategory = searchParams.get("category") || "todos";
  const viewMode = (searchParams.get("view") as "grid" | "list") || "grid";
  const sortOrder = (searchParams.get("sort") as "asc" | "desc" | "none") || "none";
  const openFilter = searchParams.get("filter") === "open";
  const branchIdParam = searchParams.get("branch-id");
  const ordersParam = searchParams.get("orders");

  const [selectedBranchId, setSelectedBranchIdState] = useState<number | null>(
    branchIdParam ? parseInt(branchIdParam) : null
  );

  const {
    products: productsFromDB,
    loading: productsLoading,
    error: productsError,
    refetch: refetchProducts,
  } = useProductsDB({
    categorySlug: selectedCategory,
    branchId: selectedBranchId,
    sortOrder: sortOrder,
  });

  const {
    flavors: flavorsFromDB,
    loading: flavorsLoading,
    error: flavorsError,
    refetch: refetchFlavors,
  } = useFlavorsDB({
    categorySlug: selectedCategory,
    branchId: selectedBranchId,
  });

  const loading = productsLoading || flavorsLoading;
  const error = productsError || flavorsError;

  const filteredProducts = productsFromDB;
  const allFlavors = flavorsFromDB;

  const [confirmedOrders, setConfirmedOrdersState] = useState<Order[]>(
    parseOrdersFromURL(ordersParam)
  );

  const [currentDraft, setCurrentDraft] = useState<Order | null>(null);

  useEffect(() => {
    const newBranchId = branchIdParam ? parseInt(branchIdParam) : null;
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

  const setSelectedCategory = (category: string) => updateURL({ category });
  const setViewMode = (mode: "grid" | "list") => updateURL({ view: mode });
  const setSortOrder = (order: "asc" | "desc" | "none") => updateURL({ sort: order });
  const openFilterToggle = () => updateURL({ filter: openFilter ? "closed" : "open" });

  const setBranchId = (branchId: number | null) => {
    setSelectedBranchIdState(branchId);
    setConfirmedOrdersState([]);
    setCurrentDraft(null);
    updateURL({ "branch-id": branchId ? branchId.toString() : null, orders: null });
  };

  const clearCart = () => {
    setSelectedBranchIdState(null);
    setConfirmedOrdersState([]);
    setCurrentDraft(null);
    updateURL({ "branch-id": null, orders: null });
  };

  const startFlavorOrder = (product: ProductType) => {
    if (product.type !== "flavor-selection") return;
    if (!product.config?.maxFlavors) return;

    if (currentDraft) setCurrentDraft(null);

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

  const addFlavorToDraft = (flavorSlug: string) => {
    if (!currentDraft || currentDraft.type !== "flavor-selection") return;
    if (currentDraft.selectedFlavors.includes(flavorSlug)) return;
    if (currentDraft.selectedFlavors.length >= currentDraft.maxFlavors) return;

    setCurrentDraft({
      ...currentDraft,
      selectedFlavors: [...currentDraft.selectedFlavors, flavorSlug],
    });
  };

  const removeFlavorFromDraft = (flavorSlug: string) => {
    if (!currentDraft || currentDraft.type !== "flavor-selection") return;

    setCurrentDraft({
      ...currentDraft,
      selectedFlavors: currentDraft.selectedFlavors.filter((f) => f !== flavorSlug),
    });
  };

  const addMultipleFlavorOrders = (
    product: ProductType,
    selectedFlavors: string[],
    quantity: number
  ) => {
    if (product.type !== "flavor-selection") return;

    const newOrders: FlavorOrder[] = [];

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

    const updatedOrders = [...confirmedOrders, ...newOrders];
    setConfirmedOrdersState(updatedOrders);

    updateURL({
      "branch-id": selectedBranchId ? selectedBranchId.toString() : null,
      orders: ordersToURLString(updatedOrders),
    });
  };

  const startQuantityOrder = (product: ProductType, quantity: number) => {
    if (product.type !== "quantity-selection") return;
    if (quantity <= 0) return;

    const newOrder: QuantityOrder = {
      id: `order-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: "quantity-selection",
      productId: product.id,
      productName: product.name,
      price: product.price,
      quantity,
    };

    const updatedOrders = [...confirmedOrders, newOrder];
    setConfirmedOrdersState(updatedOrders);

    updateURL({
      "branch-id": selectedBranchId ? selectedBranchId.toString() : null,
      orders: ordersToURLString(updatedOrders),
    });
  };

  const updateQuantityOrder = (quantity: number) => {
    if (!currentDraft || currentDraft.type !== "quantity-selection") return;
    setCurrentDraft({ ...currentDraft, quantity });
  };

  const addSingleItemOrder = (product: ProductType) => {
    if (product.type !== "single-item") return;

    const newOrder: SingleItemOrder = {
      id: `order-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: "single-item",
      productId: product.id,
      productName: product.name,
      price: product.price,
    };

    const updatedOrders = [...confirmedOrders, newOrder];
    setConfirmedOrdersState(updatedOrders);

    updateURL({
      "branch-id": selectedBranchId ? selectedBranchId.toString() : null,
      orders: ordersToURLString(updatedOrders),
    });
  };

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

    const updatedOrders = [...confirmedOrders, newOrder];
    setConfirmedOrdersState(updatedOrders);

    updateURL({
      "branch-id": selectedBranchId ? selectedBranchId.toString() : null,
      orders: ordersToURLString(updatedOrders),
    });
  };

  const confirmCurrentOrder = () => {
    if (!currentDraft) return;

    if (currentDraft.type === "flavor-selection" && currentDraft.selectedFlavors.length === 0)
      return;
    if (currentDraft.type === "quantity-selection" && currentDraft.quantity <= 0) return;

    const updatedOrders = [...confirmedOrders, currentDraft];
    setConfirmedOrdersState(updatedOrders);
    setCurrentDraft(null);

    updateURL({
      "branch-id": selectedBranchId ? selectedBranchId.toString() : null,
      orders: ordersToURLString(updatedOrders),
    });
  };

  const cancelCurrentOrder = () => setCurrentDraft(null);

  const removeConfirmedOrder = (orderId: string) => {
    const updatedOrders = confirmedOrders.filter((order) => order.id !== orderId);
    setConfirmedOrdersState(updatedOrders);

    updateURL({
      "branch-id": selectedBranchId ? selectedBranchId.toString() : null,
      orders: updatedOrders.length > 0 ? ordersToURLString(updatedOrders) : null,
    });
  };


  const value = {
    products: filteredProducts,
    filteredProducts,
    allFlavors,
    selectedCategory,
    viewMode,
    sortOrder,
    selectedBranchId,
    confirmedOrders,
    currentDraft,
    loading,
    error,
    setSelectedCategory,
    setViewMode,
    setSortOrder,
    openFilterToggle,
    openFilter,
    startFlavorOrder,
    addFlavorToDraft,
    removeFlavorFromDraft,
    addMultipleFlavorOrders,
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
    <Suspense fallback={null}>
      <ProductProvider>{children}</ProductProvider>
    </Suspense>
  );
};

export default Product;