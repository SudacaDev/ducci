import type { Product as ProductType } from "@/types/product.type";
import type { IceCreamSize } from "@/types/order.type";

export const getSizeFromProduct = (product: ProductType): IceCreamSize => {
  if (product.name.includes("1 Kilo") || product.name.includes("1kg")) return "1";
  if (product.name.includes("1/2 Kilo") || product.name.includes("1/2kg")) return "1/2";
  if (product.name.includes("1/4 Kilo") || product.name.includes("1/4kg")) return "1/4";
  if (product.name.includes("1 Bocha")) return "1-bocha";
  if (product.name.includes("2 Bochas")) return "2-bochas";
  if (product.name.includes("3 Bochas")) return "3-bochas";
  return "1";
};

export const filterProducts = (
  products: ProductType[],
  selectedCategory: string,
  selectedBranchId: number | null,
  sortOrder: "asc" | "desc" | "none"
): ProductType[] => {
  let filtered = products.filter((product) => {
    // Filtrar por categoría
    if (selectedCategory !== "todos" && product.category !== selectedCategory) {
      return false;
    }

    // Filtrar por sucursal
    if (selectedBranchId !== null) {
      const hasThisBranch = product.branches.some(branch => branch.id === selectedBranchId);
      if (!hasThisBranch) {
        return false;
      }
    }

    // Solo productos comprables (no sabores sueltos)
    if (product.type === "flavor-selection" && product.price === 0) {
      return false;
    }

    return true;
  });

  // Ordenar
  return filtered.sort((a, b) => {
    if (sortOrder === "asc") return a.price - b.price;
    if (sortOrder === "desc") return b.price - a.price;
    return 0;
  });
};