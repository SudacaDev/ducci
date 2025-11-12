"use client";

import { useProducts } from "@/components/products/Product";
import { Button } from "@/components/ui/button";
import { SIZE_CONFIG, type IceCreamSize } from "@/types/order.type";
import { Lock } from "lucide-react";
import toast from "react-hot-toast";

const SizeSelector = () => {
  const { startNewOrder, selectedBranchId, currentDraft } = useProducts();

  const handleSizeSelect = (size: IceCreamSize) => {
    if (selectedBranchId === null) {
      toast.error("Por favor, selecciona una sucursal primero", { duration: 3000 });
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (currentDraft) {
      toast.error("Primero confirma o cancela el pedido actual", { duration: 2000 });
      return;
    }

    // Precio base por kilo (después lo haremos dinámico)
    const pricePerKg = 1250;
    
    startNewOrder(size, pricePerKg);
    toast.success(`${SIZE_CONFIG[size].label} seleccionado. Ahora elige los sabores`, { 
      duration: 2000 
    });
  };

  // Si no hay sucursal seleccionada, mostrar mensaje bloqueado
  if (!selectedBranchId) {
    return (
      <div className="bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 p-8 mb-6 text-center">
        <Lock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 font-medium text-lg">
          Primero debes seleccionar una sucursal arriba ☝️
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-[var(--secondary-color)] text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">
          2
        </div>
        <div>
          <h3 className="text-xl font-semibold">
            {currentDraft ? "Termina tu pedido actual para agregar otro tamaño" : "Selecciona el tamaño"}
          </h3>
          <p className="text-gray-600 text-sm">Elige cuánto helado quieres llevar</p>
        </div>
      </div>

      {currentDraft && (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4 rounded">
          <p className="text-blue-800 font-medium text-sm">
            ⚠️ Ya tienes un pedido en proceso. Confírmalo o cancélalo primero.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(Object.keys(SIZE_CONFIG) as IceCreamSize[]).map((size) => {
          const config = SIZE_CONFIG[size];
          const price = 1250 * config.weight;
          
          return (
            <Button
              key={size}
              type="button"
              onClick={() => handleSizeSelect(size)}
              disabled={!!currentDraft}
              className="h-auto flex-col gap-2 py-6 order-info hover:from-orange-500 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="text-2xl font-bold">{config.label}</span>
              <span className="text-sm">Hasta {config.maxFlavors} sabores</span>
              <span className="text-lg font-semibold">${price}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default SizeSelector;