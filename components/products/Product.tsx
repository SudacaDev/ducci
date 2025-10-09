"use client";

import { createContext, useContext, useState, ReactNode } from "react";
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
  openFilter: boolean; // ← Agregar esto
  setSelectedCategory: (category: string) => void;
  setViewMode: (mode: "grid" | "list") => void;
  setSortOrder: (order: "asc" | "desc" | "none") => void;
  openFilterToggle: () => void;
}

export const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined
);

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("Los componentes Product.* deben usarse dentro de <Product>");
  }
  return context;
};

interface ProductProps {
  children: ReactNode;
}

const Product = ({ children }: ProductProps) => {
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "none">("none");
  const [openFilter, setOpenFilter] = useState(false)

  const filteredProducts = PROD.filter((product) => {
    if (selectedCategory === "todos") return true;
    return product.category === selectedCategory;
  }).sort((a, b) => {
    if (sortOrder === "asc") return a.price - b.price;
    if (sortOrder === "desc") return b.price - a.price;
    return 0;
  });

  const openFilterToggle = () =>{
    setOpenFilter(!openFilter)
  }

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
    openFilter
  };

  return (
    <ProductsContext.Provider value={value}>
 
        <div id="product" className="h-full container m-auto my-4">
          {children}
        </div>
 
    </ProductsContext.Provider>
  );
};

export default Product;