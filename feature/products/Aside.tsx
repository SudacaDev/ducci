"use client";


import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CATEGORIES } from "@/constants/prod";
import { useProducts } from "@/components/products/ProductContext";

const Aside = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    openFilter,
    openFilterToggle,
  } = useProducts();

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
        <div className="aside_filter-content">
          <ul className="aside_filter-content-ul flex gap-2">
            {CATEGORIES.map((category) => (
              <li key={category.id}>
                <button
                  type="button"
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full text-left px-3 py-2 rounded transition-colors ${
                    selectedCategory === category.id
                      ? "bg-[var(--secondary-color)] text-[var(--secondary-foreground)] font-semibold active"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {category.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default Aside;
