"use client";

import { useState } from "react";
import { useProducts } from "@/components/products/Product";
import { ShoppingCart, Trash2, ChevronUp, ChevronDown, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BRANCHES } from "@/constants/branches";
import { PROD } from "@/constants/prod";
import { SIZE_CONFIG } from "@/types/order.type";

const CartWidget = () => {
  const { confirmedOrders, selectedBranchId, clearCart, removeConfirmedOrder } = useProducts();
  const [isExpanded, setIsExpanded] = useState(false);

  const productNameToSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  };

  if (confirmedOrders.length === 0) {
    return null;
  }

  const selectedBranch = selectedBranchId
    ? BRANCHES.find(b => b.id === selectedBranchId)
    : null;

  const totalPrice = confirmedOrders.reduce((sum, order) => {
    const sizeConfig = SIZE_CONFIG[order.size];
    return sum + (order.pricePerKg * sizeConfig.weight);
  }, 0);

  const handleOrderClick = () => {
    const branchInfo = selectedBranch 
      ? `Sucursal: ${selectedBranch.name} - ${selectedBranch.address}` 
      : "";
    
    const ordersText = confirmedOrders.map((order, index) => {
      const sizeConfig = SIZE_CONFIG[order.size];
      const price = order.pricePerKg * sizeConfig.weight;
      const flavors = order.selectedFlavors
        .map(slug => {
          const product = PROD.find(p => productNameToSlug(p.name) === slug);
          return product ? product.name : slug;
        })
        .join(", ");

      return `Pedido #${index + 1}: ${sizeConfig.label}\nSabores: ${flavors || "Sin sabores"}\nPrecio: $${price}`;
    }).join("\n\n");

    const message = `¡Hola! Me gustaría hacer un pedido:\n\n${branchInfo}\n\n${ordersText}\n\nTotal: $${totalPrice}\n\n¿Está disponible?`;

    const whatsappNumber = selectedBranch?.phone?.replace(/\D/g, "") || "541159594708";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className={`cart-widget ${isExpanded ? "expanded" : ""}`}>
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="cart-widget__header"
      >
        <div className="flex items-center gap-2">
          <div className="cart-widget__icon">
            <ShoppingCart className="w-5 h-5" />
            <span className="cart-widget__badge">{confirmedOrders.length}</span>
          </div>
          <span className="font-semibold">Mi pedido</span>
        </div>
        {isExpanded ? (
          <ChevronDown className="w-5 h-5" />
        ) : (
          <ChevronUp className="w-5 h-5" />
        )}
      </button>

      {isExpanded && (
        <div className="cart-widget__content">
          {selectedBranch && (
            <div className="cart-widget__branch">
              <p className="font-semibold text-sm">{selectedBranch.name}</p>
              <p className="text-xs text-gray-600">{selectedBranch.address}</p>
            </div>
          )}

          <div className="cart-widget__products">
            {confirmedOrders.map((order, index) => {
              const sizeConfig = SIZE_CONFIG[order.size];
              const price = order.pricePerKg * sizeConfig.weight;
              
              return (
                <div key={order.id} className="border-2 border-orange-200 rounded-lg p-3 bg-orange-50">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-bold text-orange-900">
                        Pedido #{index + 1} - {sizeConfig.label}
                      </p>
                      <p className="text-xs text-orange-700">
                        {order.selectedFlavors.length} sabores
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-orange-600">${price}</p>
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => removeConfirmedOrder(order.id)}
                        className="h-6 w-6 p-0 text-red-600 hover:bg-red-100"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {order.selectedFlavors.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-orange-200">
                      <p className="text-xs font-semibold text-orange-800 mb-1">Sabores:</p>
                      <ul className="text-xs text-orange-700 space-y-1">
                        {order.selectedFlavors.map(flavorSlug => {
                          const product = PROD.find(p => productNameToSlug(p.name) === flavorSlug);
                          return (
                            <li key={flavorSlug} className="flex items-center gap-1">
                              <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                              {product?.name || flavorSlug}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="cart-widget__total">
            <span className="font-semibold">Total:</span>
            <span className="font-bold text-lg text-[var(--secondary-color)]">
              ${totalPrice}
            </span>
          </div>

          <div className="cart-widget__actions">
            <Button
              type="button"
              onClick={handleOrderClick}
              className="w-full bg-[var(--secondary-color)] hover:bg-[var(--secondary-color)]/90 text-white font-semibold gap-2"
            >
              <Send className="w-4 h-4" />
              Hacer Pedido por WhatsApp
            </Button>
            <Button
              type="button"
              onClick={clearCart}
              variant="outline"
              className="w-full gap-2 text-red-600 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
              Limpiar carrito
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartWidget;