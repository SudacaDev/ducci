"use client";

import { useProducts } from "@/components/products/Product";
import { MapPin } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { BRANCHES } from "@/constants/branches";

const OrderSelector = () => {
  const { 
    selectedBranchId, 
    setBranchId, 
    confirmedOrders,
  } = useProducts();

  const handleBranchChange = (value: string) => {
    if (confirmedOrders.length > 0) {
      if (!confirm("Si cambias de sucursal, se limpiará tu carrito. ¿Continuar?")) {
        return;
      }
    }
    setBranchId(value === "all" ? null : Number.parseInt(value));
  };

  return (
    <div className="bg-white place-order rounded-lg p-6 mb-6">
      <h3 className="text-3xl font-semibold mb-4 text-gray-800">
        Selecciona tu sucursal
      </h3>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-orange-500" />
          Elige dónde quieres retirar tu pedido
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
              {BRANCHES.map((branch) => (
                <SelectItem key={branch.id} value={branch.id.toString()}>
                  <div className="flex flex-col items-start">
                    <span className="font-semibold">{branch.name}</span>
                    <span className="text-xs text-gray-600">{branch.address}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {!selectedBranchId && (
        <p className="current-draft text-xs text-gray-500 mt-3 text-left">
          👆 Selecciona una sucursal para comenzar a ver productos
        </p>
      )}
    </div>
  );
};

export default OrderSelector;