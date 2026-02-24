"use client";

import { useCategories } from "@/hooks/useCategories";
import { useProducts } from "./ProductContext";

const CategoryFilter = () => {
  const { categories, loading } = useCategories();
  const { selectedCategory, setSelectedCategory, openFilterToggle } = useProducts();

  if (loading) {
    return (
      <nav aria-label="Filtro de categorías" className="mb-6">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-10 w-32 bg-gray-200 rounded-lg animate-pulse"
              aria-hidden="true"
            ></div>
          ))}
        </div>
      </nav>
    );
  }

  const handleCategoryClick = (slug: string, name: string) => {
    setSelectedCategory(slug);
    
    // Cerrar el aside solo en mobile después de seleccionar
    if (window.innerWidth < 768) {
      setTimeout(() => {
        openFilterToggle();
      }, 150);
    }
  };

  return (
    <nav
      aria-label="Filtro de categorías de productos"
      className="aside_filter"
    >
      <div
        className="aside_filter-content flex gap-2 overflow-x-auto pb-2"
        role="group"
      >
        <div
          role="button"
          tabIndex={0}
          aria-label="Mostrar todos los productos"
          aria-pressed={selectedCategory === "todos"}
          onClick={() => handleCategoryClick("todos", "Todos")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleCategoryClick("todos", "Todos");
            }
          }}
          className={`  ${selectedCategory === "todos" ? "active li" : " li "}`}
        >
          Todos
        </div>

        {categories.map((category) => {
          const isSelected = selectedCategory === category.slug;

          return (
            <div
              key={category.id}
              role="button"
              tabIndex={0}
              aria-label={`Filtrar por categoría ${category.name}`}
              aria-pressed={isSelected}
              onClick={() => handleCategoryClick(category.slug, category.name)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleCategoryClick(category.slug, category.name);
                }
              }}
              className={`  ${isSelected ? "active li" : " li"}`}
            >
              {category.name}
            </div>
          );
        })}
      </div>

      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {selectedCategory === "todos"
          ? "Mostrando todos los productos"
          : `Mostrando productos de la categoría ${
              categories.find((c) => c.slug === selectedCategory)?.name || ""
            }`}
      </div>
    </nav>
  );
};

export default CategoryFilter;
