"use client";

import { Order, SIZE_CONFIG } from "@/types/order.type";

interface OrderSummaryProps {
  cart: Order[];
  branchName: string;
  totalPrice: number;
}

export default function OrderSummary({
  cart,
  branchName,
  totalPrice,
}: OrderSummaryProps) {
  const renderOrderDetails = (order: Order) => {
    switch (order.type) {
      case "flavor-selection":
        return (
          <div className="text-sm space-y-1 mt-1">
            <p className="text-gray-600">
              {SIZE_CONFIG[order.size].label}
            </p>
            <div className="text-xs text-gray-500">
              <span className="font-medium">Sabores:</span>{" "}
              {order.selectedFlavors.join(", ")}
            </div>
          </div>
        );

      case "quantity-selection":
        return (
          <p className="text-sm text-gray-600 mt-1">
            Cantidad: {order.quantity}
          </p>
        );

      case "box":
        return (
          <p className="text-sm text-gray-600 mt-1">
            {order.boxQuantity} {order.boxQuantity === 1 ? "unidad" : "unidades"}
          </p>
        );

      case "single-item":
        return <p className="text-sm text-gray-600 mt-1">1 unidad</p>;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Resumen del pedido
      </h2>

      {/* Sucursal */}
      <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-600 font-medium mb-1">
          Retirás por:
        </p>
        <p className="text-lg font-semibold text-gray-900">{branchName}</p>
      </div>

      {/* Items */}
      <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
        {cart.map((order) => (
          <div
            key={order.id}
            className="pb-4 border-b border-gray-200 last:border-0"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">
                  {order.productName}
                </h3>
                {renderOrderDetails(order)}
              </div>
              <p className="font-semibold text-gray-900 ml-4">
                ${order.price.toLocaleString("es-AR")}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="pt-4 border-t-2 border-gray-300">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-gray-900">Total:</span>
          <span className="text-2xl font-bold text-gray-900">
            ${totalPrice.toLocaleString("es-AR")}
          </span>
        </div>
      </div>

      {/* Info adicional */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          📱 Al confirmar, se abrirá WhatsApp para coordinar el retiro con la
          sucursal
        </p>
      </div>
    </div>
  );
}