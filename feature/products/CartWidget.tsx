"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "@/components/cart";
import { useCartDrawer } from "@/contexts/CartDrawerContext";

const CartWidget = () => {
  const { cart, isHydrated } = useCart();
  const { openDrawer } = useCartDrawer();

  if (!isHydrated || cart.length === 0) {
    return null;
  }

  const totalPrice = cart.reduce((sum, order) => {
    if (order.type === "quantity-selection") {
      return sum + order.price * order.quantity;
    } else if (order.type === "box") {
      return sum + order.price * order.quantity;
    } else if (order.type === "single-item") {
      return sum + order.price * order.quantity;
    } else if (order.type === "flavor-selection") {
      return sum + order.price * order.quantity;
    } else {
      return sum;
    }
  }, 0);

  return (
    <button
      type="button"
      onClick={openDrawer}
      className="cart-widget fixed bottom-6 right-6 bg-[var(--secondary-color)] hover:bg-[var(--secondary-color)]/90 text-white rounded-full shadow-lg transition-all hover:scale-105 z-50"
    >
      <div className="flex items-center gap-3 px-6 py-4">
        <div className="relative">
          <ShoppingCart className="w-6 h-6" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
            {cart.length}
          </span>
        </div>
        <div className="flex flex-col items-start">
          <span className="text-xs font-medium opacity-90">Ver carrito</span>
          <span className="text-sm font-bold">
            ${totalPrice.toLocaleString("es-AR")}
          </span>
        </div>
      </div>
    </button>
  );
};

export default CartWidget;
