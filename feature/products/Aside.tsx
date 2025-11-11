// components/products/Aside.tsx
"use client";

import { X, Trash2 } from "lucide-react";
import { CATEGORIES } from "@/constants/prod";
import { useProducts } from "@/components/products/Product";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Aside = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    openFilter,
    openFilterToggle,
    selectedBranchId,
  } = useProducts();

  const router = useRouter();

  const clearAllFilters = () => {
    router.push("/productos", { scroll: false });
  };

  return (
    <>
      {openFilter && (
        <button
          type="button"
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={openFilterToggle}
          aria-label="Cerrar filtros"
        />
      )}

      <aside
        className={`
          product-aside
          ${openFilter ? "show" : ""}
        `}
      >
        <div className="flex justify-between items-center mb-4 md:hidden">
          <h2 className="text-xl font-semibold">Filtros</h2>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={openFilterToggle}
            aria-label="Cerrar filtros"
          >
            <X size={24} />
          </Button>
        </div>

        {/* Botón para limpiar filtros */}
        {selectedCategory !== "todos" && (
          <Button
            type="button"
            onClick={clearAllFilters}
            variant="outline"
            className="w-full mb-4 gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Limpiar filtros
          </Button>
        )}

        <div className="">
          <div className="aside_filter-title">
            <h3 className="font-semibold  text-lg">Categorías</h3>
          </div>
          <div className="aside_filter-content">
            <ul className="aside_filter-content-ul flex flex-col gap-2">
              {CATEGORIES.map((category) => (
                <li key={category.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory(category.id);
                      if (window.innerWidth < 768) {
                        openFilterToggle();
                      }
                    }}
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
    </>
  );
};
export default Aside;
