"use client";

import { createContext, useContext, ReactNode, useState, useEffect } from "react";
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

const CART_STORAGE_KEY = "ducci-cart";
const BRANCH_STORAGE_KEY = "ducci-selected-branch";

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<Order[]>([]);
  const [selectedBranchId, setSelectedBranchIdState] = useState<number | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Cargar desde localStorage al iniciar
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      // Cargar carrito
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
      }

      // Cargar sucursal seleccionada
      const savedBranch = localStorage.getItem(BRANCH_STORAGE_KEY);
      if (savedBranch) {
        setSelectedBranchIdState(parseInt(savedBranch));
      }
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
    }

    setIsHydrated(true);
  }, []);

  // Guardar carrito en localStorage cuando cambia
  useEffect(() => {
    if (!isHydrated) return; // No guardar durante la hidratación inicial

    try {
      if (cart.length > 0) {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
      } else {
        localStorage.removeItem(CART_STORAGE_KEY);
      }
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }, [cart, isHydrated]);

  // Guardar sucursal en localStorage cuando cambia
  useEffect(() => {
    if (!isHydrated) return;

    try {
      if (selectedBranchId !== null) {
        localStorage.setItem(BRANCH_STORAGE_KEY, selectedBranchId.toString());
      } else {
        localStorage.removeItem(BRANCH_STORAGE_KEY);
      }
    } catch (error) {
      console.error("Error saving branch to localStorage:", error);
    }
  }, [selectedBranchId, isHydrated]);

  const addToCart = (order: Order) => {
    setCart(prevCart => [...prevCart, order]);
  };

  const removeFromCart = (orderId: string) => {
    setCart(prevCart => prevCart.filter(order => order.id !== orderId));
  };

  const clearCart = () => {
    setCart([]);
    setSelectedBranchIdState(null);
  };

  const setBranchId = (branchId: number | null) => {
    setSelectedBranchIdState(branchId);
    // Limpiar carrito al cambiar de sucursal
    setCart([]);
  };

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