"use client";

import { useBranches } from "@/hooks/useBranches";
import { useProductsDB } from "@/hooks/useProducts";
import { useFlavorsDB } from "@/hooks/useFlavors";

export default function TestSupabasePage() {
  const { branches, loading: branchesLoading } = useBranches();
  const { products, loading: productsLoading } = useProductsDB();
  const { flavors, loading: flavorsLoading } = useFlavorsDB();

  if (branchesLoading || productsLoading || flavorsLoading) {
    return <div className="p-8">Cargando datos...</div>;
  }

  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">
          Sucursales ({branches.length})
        </h2>
        <ul className="space-y-2">
          {branches.map((branch) => (
            <li key={branch.id} className="border p-2 rounded">
              {branch.name} - {branch.address}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">
          Productos ({products.length})
        </h2>
        <ul className="space-y-2">
          {products.map((product) => (
            <li key={product.id} className="border p-2 rounded">
              {product.name} - ${product.price} - {product.branches.length}{" "}
              sucursales
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Sabores ({flavors.length})</h2>
        <ul className="space-y-2">
          {flavors.map((flavor) => (
            <li key={flavor.id} className="border p-2 rounded">
              {flavor.name} - {flavor.branches.length} sucursales
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
