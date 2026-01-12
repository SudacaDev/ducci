"use client";

import { ShoppingCart, X, Trash2 } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart";
import { useCartDrawer } from "@/contexts/CartDrawerContext";
import { Order, SIZE_CONFIG } from "@/types/order.type";
import Link from "next/link";
import { useHeader } from "../header/Header";

export default function CartDrawer() {
  const { cart, removeFromCart, clearCart, isHydrated } = useCart();
  const { isOpen, closeDrawer } = useCartDrawer();
 
  

  const totalItems = cart.length;
  const totalPrice = cart.reduce((sum, order) => {
    if (order.type === "quantity-selection") {
      return sum + (order.price * order.quantity);
    } else if (order.type === "box") {
      return sum + (order.price * order.quantity);
    } else if (order.type === "single-item") {
      return sum + (order.price * order.quantity);
    } else if (order.type === "flavor-selection") {
      return sum + (order.price * order.quantity);
    }
    return sum;
  }, 0);

  // Helper para calcular el subtotal de cada orden
  const getOrderSubtotal = (order: Order): number => {
    if (order.type === "quantity-selection") {
      return order.price * order.quantity;
    } else if (order.type === "box") {
      return order.price * order.quantity;
    } else if (order.type === "single-item") {
      return order.price * order.quantity;
    } else if (order.type === "flavor-selection") {
      return order.price * order.quantity;
    }
    return 0;
  };

  const renderOrderDetails = (order: Order) => {
    switch (order.type) {
      case "flavor-selection":
        return (
          <div className="text-sm space-y-1">
            <p className="text-gray-600">
              {SIZE_CONFIG[order.size].label} - {order.maxFlavors} sabores
            </p>
            {order.quantity > 1 && (
              <p className="text-gray-600 font-semibold">
                Cantidad: {order.quantity}
              </p>
            )}
            <div className="text-xs text-gray-500">
              {order.selectedFlavors.map((flavor, idx) => (
                <span key={idx}>
                  {flavor}
                  {idx < order.selectedFlavors.length - 1 && ", "}
                </span>
              ))}
            </div>
          </div>
        );
      
      case "quantity-selection":
        return (
          <p className="text-sm text-gray-600">
            Cantidad: {order.quantity}
          </p>
        );
      
      case "box":
        return (
          <div className="text-sm text-gray-600 space-y-1">
            <p>{order.quantity} {order.quantity === 1 ? "caja" : "cajas"} de {order.boxQuantity} {order.boxQuantity === 1 ? "unidad" : "unidades"}</p>
            <p className="text-xs text-gray-500">
              ${order.price.toLocaleString("es-AR")} c/u
            </p>
          </div>
        );
      
      case "single-item":
        return (
          <p className="text-sm text-gray-600">
            Cantidad: {order.quantity}
          </p>
        );
    }
  };

  return (
    <Drawer direction="right" open={isOpen} onOpenChange={closeDrawer}>
      <DrawerContent className="h-full w-full bg-white sm:max-w-md md:max-w-lg border-none fixed right-0 top-0 z-[99999999] bottom-0 pt-[32px]">
        <div className="mx-auto w-full h-full flex flex-col">
          <DrawerHeader>
            <div className="flex items-center justify-between">
              <DrawerTitle>Tu Pedido</DrawerTitle>
              {totalItems > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearCart}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Vaciar
                </Button>
              )}
            </div>
            <DrawerDescription className="sr-only">
              Carrito de compras con {totalItems} productos
            </DrawerDescription>
          </DrawerHeader>

     
          <div className="flex-1 overflow-y-auto px-4 py-4">
            {!isHydrated ? (
              <div className="flex items-center justify-center h-32">
                <p className="text-gray-500">Cargando...</p>
              </div>
            ) : totalItems === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <ShoppingCart className="h-16 w-16 text-gray-300 mb-4" />
                <p className="text-gray-600 mb-2">Tu carrito está vacío</p>
                <p className="text-sm text-gray-500">
                  Agregá productos para comenzar tu pedido
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {cart.map((order) => (
                  <div
                    key={order.id}
                    className="flex gap-3 p-4 border border-gray-300 rounded-lg bg-white"
                  >
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">
                        {order.productName}
                      </h3>
                      {renderOrderDetails(order)}
                      <p className="font-semibold text-gray-900 mt-2">
                        ${getOrderSubtotal(order).toLocaleString("es-AR")}
                      </p>
                    </div>
                    
                    <button
                      onClick={() => removeFromCart(order.id)}
                      className="text-black hover:text-red-700 p-2 h-fit hover:cursor-pointer"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer con total y botón checkout */}
          {totalItems > 0 && (
            <DrawerFooter>
              <div className="flex items-center justify-between text-lg font-semibold mb-4">
                <span>Total:</span>
                <span>${totalPrice.toLocaleString("es-AR")}</span>
              </div>
              
              <Link href="/checkout" className="block w-full">
                <Button className="w-full h-12 text-base" onClick={closeDrawer} >
                  Finalizar Pedido
                </Button>
              </Link>
              
              <DrawerClose asChild>
                <Button variant="outline" className="w-full">
                  Seguir comprando
                </Button>
              </DrawerClose>
            </DrawerFooter>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}