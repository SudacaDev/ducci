"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/components/products/ProductContext";
import CategoryFilter from "@/components/products/CategoryFilter";

const Aside = () => {
  const { openFilter, openFilterToggle } = useProducts();

  return (
    <aside className={` product-aside  ${openFilter ? "active" : ""}`}>
      <div className="flex justify-between items-center mb-4 md:hidden">
        <h2 className="text-xl font-semibold">Filtros</h2>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={openFilterToggle}
          aria-label="Cerrar filtros"
        >
          <X />
        </Button>
      </div>

      <div className="aside_filter">
        <div className="aside_filter-title">
          <h3 className="font-semibold text-lg">Categorías</h3>
        </div>
        <CategoryFilter />
      </div>
    </aside>
  );
};

export default Aside;
