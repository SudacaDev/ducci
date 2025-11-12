"use client";

import { useProducts } from "@/components/products/Product";
import { Check, MapPin, IceCream, Package } from "lucide-react";
import { SIZE_CONFIG } from "@/types/order.type";

const OrderStepper = () => {
  const { selectedBranchId, currentDraft } = useProducts();

  const steps = [
    {
      number: 1,
      title: "Sucursal",
      icon: MapPin,
      completed: selectedBranchId !== null,
      active: selectedBranchId === null,
    },
    {
      number: 2,
      title: "Tamaño",
      icon: Package,
      completed: currentDraft !== null,
      active: selectedBranchId !== null && currentDraft === null,
    },
    {
      number: 3,
      title: "Sabores",
      icon: IceCream,
      completed: currentDraft !== null && currentDraft.selectedFlavors.length > 0,
      active: currentDraft !== null,
    },
  ];

  return (
    <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border-2 border-orange-200 rounded-lg p-6 mb-6 shadow-sm">
      <h2 className="text-lg font-bold text-orange-900 mb-4 text-center">
        ¿Cómo armar tu pedido?
      </h2>
      
      <div className="flex items-center justify-between max-w-2xl mx-auto">
        {steps.map((step, index) => {
          const Icon = step.icon;
          
          return (
            <div key={step.number} className="flex items-center flex-1">
              {/* Paso */}
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    step.completed
                      ? "bg-green-500 text-white"
                      : step.active
                        ? "bg-orange-500 text-white ring-4 ring-orange-200 scale-110"
                        : "bg-gray-200 text-gray-400"
                  }`}
                >
                  {step.completed ? (
                    <Check className="w-6 h-6" />
                  ) : (
                    <Icon className="w-6 h-6" />
                  )}
                </div>
                <p
                  className={`mt-2 text-sm font-semibold ${
                    step.active ? "text-orange-700" : step.completed ? "text-green-700" : "text-gray-500"
                  }`}
                >
                  {step.number}. {step.title}
                </p>
              </div>

              {/* Línea conectora */}
              {index < steps.length - 1 && (
                <div
                  className={`h-1 flex-1 mx-2 transition-all duration-300 ${
                    steps[index + 1].completed || steps[index + 1].active
                      ? "bg-orange-400"
                      : "bg-gray-300"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Mensaje contextual */}
      <div className="mt-6 text-center">
        {!selectedBranchId && (
          <p className="text-orange-800 font-medium animate-pulse">
            👆 Comienza seleccionando una sucursal arriba
          </p>
        )}
        {selectedBranchId && !currentDraft && (
          <p className="text-orange-800 font-medium animate-pulse">
            👇 Ahora elige el tamaño de tu helado
          </p>
        )}
        {currentDraft && currentDraft.selectedFlavors.length === 0 && (
          <p className="text-orange-800 font-medium animate-pulse">
            🍦 Selecciona entre 1 y {currentDraft.maxFlavors} sabores
          </p>
        )}
        {currentDraft && currentDraft.selectedFlavors.length > 0 && currentDraft.selectedFlavors.length < currentDraft.maxFlavors && (
          <p className="text-blue-700 font-medium">
            ✨ Llevas {currentDraft.selectedFlavors.length} sabor{currentDraft.selectedFlavors.length > 1 ? 'es' : ''}. Puedes agregar hasta {currentDraft.maxFlavors - currentDraft.selectedFlavors.length} más o confirmar ahora
          </p>
        )}
        {currentDraft && currentDraft.selectedFlavors.length === currentDraft.maxFlavors && (
          <p className="text-green-700 font-bold text-lg">
            ✅ ¡Máximo alcanzado! Confirma tu pedido
          </p>
        )}
      </div>
    </div>
  );
};

export default OrderStepper;