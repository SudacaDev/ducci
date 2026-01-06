// components/cart/CartContext.tsx
"use client";

import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { parseOrdersFromURL, ordersToURLString } from "@/components/products/utils/orderParsers";
import type { Order } from "@/types/order.type";

interface CartContextType {
  cart: Order[];
  selectedBranchId: number | null;
  isHydrated: boolean;
  addToCart: (order: Order) => void;
  removeFromCart: (orderId: string) => void;
  clearCart: () => void;
  setBranchId: (branchId: number | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<Order[]>([]);
  const [selectedBranchId, setSelectedBranchIdState] = useState<number | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydration segura - solo en el cliente
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    const ordersParam = params.get('orders');
    const branchParam = params.get('branch-id');

    if (ordersParam) {
      setCart(parseOrdersFromURL(ordersParam));
    }
    if (branchParam) {
      setSelectedBranchIdState(parseInt(branchParam));
    }

    setIsHydrated(true);
  }, []);

  const updateCartInURL = (orders: Order[], branchId: number | null) => {
    if (typeof window === 'undefined') return;
    
    const params = new URLSearchParams(window.location.search);
    
    if (branchId) {
      params.set('branch-id', branchId.toString());
    } else {
      params.delete('branch-id');
    }
    
    if (orders.length > 0) {
      params.set('orders', ordersToURLString(orders));
    } else {
      params.delete('orders');
    }
    
    const search = params.toString();
    const query = search ? `?${search}` : "";
    window.history.replaceState({}, "", `${window.location.pathname}${query}`);
  };

  const addToCart = (order: Order) => {
    const updatedCart = [...cart, order];
    setCart(updatedCart);
    updateCartInURL(updatedCart, selectedBranchId);
  };

  const removeFromCart = (orderId: string) => {
    const updatedCart = cart.filter(order => order.id !== orderId);
    setCart(updatedCart);
    updateCartInURL(updatedCart, selectedBranchId);
  };

  const clearCart = () => {
    setCart([]);
    setSelectedBranchIdState(null);
    updateCartInURL([], null);
  };

  const setBranchId = (branchId: number | null) => {
    setSelectedBranchIdState(branchId);
    const updatedCart: Order[] = [];
    setCart(updatedCart);
    updateCartInURL(updatedCart, branchId);
  };

  // Crear el value ANTES del return
  const contextValue: CartContextType = { 
    cart, 
    selectedBranchId,
    isHydrated,
    addToCart, 
    removeFromCart, 
    clearCart,
    setBranchId,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within <CartProvider>");
  }
  return context;
};