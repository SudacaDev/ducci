"use client";

import { createContext, useContext, ReactNode, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PROD } from "@/constants/prod";

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
}

export interface ProductsContextType {
  products: Product[];
  filteredProducts: Product[];
  selectedCategory: string;
  viewMode: "grid" | "list";
  sortOrder: "asc" | "desc" | "none";
  openFilter: boolean;

  setSelectedCategory: (category: string) => void;
  setViewMode: (mode: "grid" | "list") => void;
  setSortOrder: (order: "asc" | "desc" | "none") => void;
  openFilterToggle: () => void;
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

// Componente interno que usa useSearchParams
const ProductProvider = ({ children }: ProductProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Leer valores iniciales desde la URL
  const selectedCategory = searchParams.get("category") || "todos";
  const viewMode = (searchParams.get("view") as "grid" | "list") || "grid";
  const sortOrder =
    (searchParams.get("sort") as "asc" | "desc" | "none") || "none";
  const openFilter = searchParams.get("filter") === "open";

  // Función helper para actualizar la URL
  const updateURL = (params: Record<string, string>) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    Object.entries(params).forEach(([key, value]) => {
      if (
        value === "todos" ||
        value === "grid" ||
        value === "none" ||
        value === "closed"
      ) {
        current.delete(key);
      } else {
        current.set(key, value);
      }
    });

    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`${window.location.pathname}${query}`, { scroll: false });
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

  const filteredProducts = PROD.filter((product) => {
    if (selectedCategory === "todos") return true;
    return product.category === selectedCategory;
  }).sort((a, b) => {
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
    setSelectedCategory,
    setViewMode,
    setSortOrder,
    openFilterToggle,
    openFilter,
  };

  return (
    <ProductsContext.Provider value={value}>
      <div id="product" className="h-full container m-auto my-4">
        {children}
      </div>
    </ProductsContext.Provider>
  );
};

// Componente wrapper con Suspense
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
