"use client";

import { useProducts } from "@/components/products/Product";
import { MapPin, Package } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { BRANCHES } from "@/constants/branches";
import { SIZE_CONFIG, type IceCreamSize } from "@/types/order.type";
import toast from "react-hot-toast";

const OrderSelector = () => {
  const { 
    selectedBranchId, 
    setBranchId, 
    startNewOrder, 
    currentDraft,
    confirmedOrders,
    cancelCurrentOrder, 
  } = useProducts();

  const handleBranchChange = (value: string) => {
    if (confirmedOrders.length > 0) {
      if (!confirm("Si cambias de sucursal, se limpiará tu carrito. ¿Continuar?")) {
        return;
      }
    }
    setBranchId(value === "all" ? null : Number.parseInt(value));
  };

  const handleSizeSelect = (value: string) => {
    if (!selectedBranchId) {
      toast.error("Primero selecciona una sucursal", { duration: 2000 });
      return;
    }

    // Si ya hay un draft, cancelarlo automáticamente
    if (currentDraft) {
      cancelCurrentOrder();
    }

    const size = value as IceCreamSize;
    const pricePerKg = 1250;
    
    startNewOrder(size, pricePerKg);
    toast.success(`${SIZE_CONFIG[size].label} seleccionado. Ahora elige los sabores`, { 
      duration: 2000 
    });
  };

  return (
    <div className="bg-white place-order rounded-lg   p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        Arma tu pedido
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 
        <div className="flex flex-col  gap-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-orange-500" />
            1. Selecciona tu sucursal
          </label>
          <div className="order-selector">

          <Select
            value={selectedBranchId ? selectedBranchId.toString() : ""}
            onValueChange={handleBranchChange}
          
          >
            <SelectTrigger className="h-12 border-2 border-orange-300 bg-white  ">
              <SelectValue placeholder="Elegir sucursal..." />
            </SelectTrigger>
            <SelectContent className="bg-white ">
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

 
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <Package className="w-4 h-4 text-orange-500" />
            2. Selecciona la cantidad
          </label>
         <div className="order-selector">
             <Select
            value={currentDraft ? currentDraft.size : ""}
            onValueChange={handleSizeSelect}
            disabled={!selectedBranchId}  
          >
            <SelectTrigger 
              className={`h-12 border-2 ${
                !selectedBranchId 
                  ? "border-gray-300 bg-gray-100 cursor-not-allowed" 
                  : currentDraft
                    ? "border-blue-300 bg-blue-50"
                    : "border-orange-300 bg-white"
              }`}
            >
              <SelectValue placeholder={
                !selectedBranchId 
                  ? "Primero elige sucursal" 
                  : "Elegir cantidad..."
              } />
            </SelectTrigger>
           <SelectContent className="bg-white">
              {(Object.keys(SIZE_CONFIG) as IceCreamSize[]).map((size) => {
                const config = SIZE_CONFIG[size];
                const price = 1250 * config.weight;
                
                return (
                  <SelectItem key={size} value={size}>
                    <div className="flex justify-between items-center gap-4">
                      <div className="flex flex-col items-start">
                        <span className="font-semibold">{config.label}</span>
                        <span className="text-xs text-gray-600">
                          Hasta {config.maxFlavors} sabores
                        </span>
                      </div>
                      <span className="font-bold text-orange-600">${price}</span>
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
         </div>
          {currentDraft && (
            <p className=" current-draft text-xs text-blue-600 italic text-left">
              💡 Puedes cambiar la cantidad en cualquier momento
            </p>
          )}
        </div>
      </div>

      
      {!selectedBranchId && (
        <p className="current-draft text-xs text-gray-500 mt-3 text-left">
          👆 Comienza seleccionando tu sucursal
        </p>
      )}
      {selectedBranchId && !currentDraft && (
        <p className="current-draft text-xs text-orange-600 mt-3 text-left">
          Ahora selecciona la cantidad de helado
        </p>
      )}
      
    </div>
  );
};

export default OrderSelector;