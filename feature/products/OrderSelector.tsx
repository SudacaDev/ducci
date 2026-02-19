"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useProducts } from "@/components/products/ProductContext";
import { useBranches } from "@/hooks/useBranches";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin } from "lucide-react";
import { BranchSelectorSkeleton } from "@/components/products/skeletons/ProductSkeleton";

const OrderSelector = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { selectedBranchId, setBranchId, confirmedOrders } = useProducts();
  const { branches, loading, error } = useBranches();

  // Leer sucursal desde URL y pre-seleccionar
  useEffect(() => {
    const sucursalSlug = searchParams.get("sucursal");

    if (sucursalSlug && branches.length > 0) {
      const branch = branches.find((b) => b.slug === sucursalSlug);
      if (branch && branch.id !== selectedBranchId) {
        setBranchId(branch.id);
      }
    }
  }, [searchParams, branches]);

  const handleBranchChange = (value: string) => {
    if (confirmedOrders.length > 0) {
      if (
        !confirm("Si cambias de sucursal, se limpiará tu carrito. ¿Continuar?")
      ) {
        return;
      }
    }

    if (value === "all") {
      setBranchId(null);
      router.push("/productos");
    } else {
      const branchId = Number.parseInt(value);
      const branch = branches.find((b) => b.id === branchId);
      setBranchId(branchId);

      if (branch?.slug) {
        router.push(`/productos?sucursal=${branch.slug}`);
      }
    }
  };

  return (
    <div className="bg-white place-order rounded-lg p-6 mb-6">
      <h3 className="text-3xl font-semibold mb-4 text-gray-800">
        Disfrutá Ducci en casa
      </h3>

      {loading ? (
        <BranchSelectorSkeleton />
      ) : error ? (
        <div className="text-center py-4">
          <p className="text-red-600 text-sm">Error al cargar sucursales</p>
          <p className="text-gray-500 text-xs mt-1">{error}</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <label
            htmlFor="branch-selector"
            className="text-sm font-semibold text-gray-700 flex items-center gap-2"
          >
            <MapPin className="w-4 h-4 text-orange-500" />
            Elegí donde querés hace tu pedido
          </label>
          <div className="order-selector">
            <Select
              value={selectedBranchId ? selectedBranchId.toString() : ""}
              onValueChange={handleBranchChange}
            >
              <SelectTrigger className="h-12 bg-white">
                <SelectValue placeholder="Elegir sucursal..." />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {branches.map((branch) => (
                  <SelectItem key={branch.id} value={branch.id.toString()}>
                    <div className="flex flex-col items-start">
                      <span className="font-semibold">{branch.name}</span>
                      <span className="text-xs text-gray-600">
                        {branch.address}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {!selectedBranchId && !loading && !error && (
        <p className="current-draft text-xs text-gray-500 mt-3 text-left">
          👆 Selecciona una sucursal para comenzar a ver productos
        </p>
      )}
    </div>
  );
};

export default OrderSelector;
