// components/products/Aside.tsx
"use client";

import { X } from "lucide-react";
import { CATEGORIES } from "@/constants/prod";
import { useProducts } from "@/components/products/Product";
import { Button } from "@/components/ui/button";

const Aside = () => {
  const { 
    selectedCategory, 
    setSelectedCategory, 
    openFilter, 
    openFilterToggle 
  } = useProducts();

  return (
    <>
      {/* Overlay en mobile */}
      {openFilter && (
        <button
          type="button"
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={openFilterToggle}
          aria-label="Cerrar filtros"
        />
      )}

      {/* Aside */}
      <aside 
        className={`
          product-aside
          ${openFilter ? 'show' : ''}
        `}
      >
        {/* Botón cerrar (solo mobile) */}
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

        {/* Categorías */}
        <div>
          <h3 className="font-semibold mb-3 text-lg">Categorías</h3>
          <ul className="flex flex-col gap-2">
            {CATEGORIES.map((category) => (
              <li key={category.id}>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory(category.id);
                    // Cerrar en mobile después de seleccionar
                    if (window.innerWidth < 768) {
                      openFilterToggle();
                    }
                  }}
                  className={`w-full text-left px-3 py-2 rounded transition-colors ${
                    selectedCategory === category.id
                      ? "bg-[var(--primary-color)] text-[var(--primary-foreground)] font-semibold"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {category.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
};
export default Aside