"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/cart";

import { supabase } from "@/lib/supabase";
import CheckoutForm from "./CheckoutForm";
import OrderSummary from "./OrderSummary";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, selectedBranchId, isHydrated } = useCart();
  const [branchName, setBranchName] = useState<string>("");

  useEffect(() => {
    // Obtener nombre de la sucursal
    const fetchBranch = async () => {
      if (!selectedBranchId) return;

      const { data } = await supabase
        .from("branches")
        .select("name")
        .eq("id", selectedBranchId)
        .single();

      if (data) setBranchName(data.name);
    };

    fetchBranch();
  }, [selectedBranchId]);

  // Ya no redirigimos automáticamente - el usuario puede estar en checkout con carrito válido
  // Si realmente no hay items, mostramos un mensaje

  if (!isHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Cargando...</p>
      </div>
    );
  }

  // Si no hay productos después de hidratar, mostrar mensaje
  if (isHydrated && (cart.length === 0 || !selectedBranchId)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Tu carrito está vacío
          </h2>
          <p className="text-gray-600 mb-6">
            Agregá productos para poder finalizar tu pedido
          </p>
          <button
            onClick={() => router.push("/")}
            className="bg-[var(--secondary-color)] hover:bg-[var(--secondary-color)]/90 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  // Type guard: en este punto sabemos que selectedBranchId no es null
  if (!selectedBranchId) return null;

  const totalPrice = cart.reduce((sum, order) => {
    if (order.type === "quantity-selection") {
      return sum + order.price * order.quantity;
    } else if (order.type === "box") {
      return sum + order.price * order.quantity;
    } else if (order.type === "single-item") {
      return sum + order.price * order.quantity;
    } else if (order.type === "flavor-selection") {
      return sum + order.price * order.quantity;
    }
    return sum;
  }, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Finalizar Pedido
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulario */}
          <div>
            <CheckoutForm
              cart={cart}
              branchId={selectedBranchId}
              branchName={branchName}
              totalPrice={totalPrice}
            />
          </div>

          {/* Resumen del pedido */}
          <div>
            <OrderSummary
              cart={cart}
              branchName={branchName}
              totalPrice={totalPrice}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
