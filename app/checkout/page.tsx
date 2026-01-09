
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

  // Redirigir si no hay productos o no hay sucursal
  useEffect(() => {
    if (isHydrated && (cart.length === 0 || !selectedBranchId)) {
      router.push("/");
    }
  }, [cart, selectedBranchId, isHydrated, router]);

  if (!isHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Cargando...</p>
      </div>
    );
  }

  if (cart.length === 0 || !selectedBranchId) {
    return null; // Se está redirigiendo
  }

  const totalPrice = cart.reduce((sum, order) => sum + order.price, 0);

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