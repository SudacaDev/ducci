import type { Order, FlavorOrder, QuantityOrder, SingleItemOrder, BoxOrder, IceCreamSize } from "@/types/order.type";
import { SIZE_CONFIG } from "@/types/order.type";

export const parseOrdersFromURL = (ordersString: string | null): Order[] => {
  if (!ordersString) return [];
  
  try {
    return ordersString.split("|").map((orderStr, index) => {
      const parts = orderStr.split(":");
      const type = parts[0] as Order["type"];
      const id = `order-${Date.now()}-${index}`;
      
      switch (type) {
        case "flavor-selection": {
          const [_, productId, productName, size, price, flavorsStr] = parts;
          return {
            id,
            type: "flavor-selection",
            productId: parseInt(productId),
            productName,
            size: size as IceCreamSize,
            maxFlavors: SIZE_CONFIG[size as IceCreamSize].maxFlavors,
            price: parseFloat(price),
            selectedFlavors: flavorsStr ? flavorsStr.split(",").filter(f => f) : [],
          } as FlavorOrder;
        }
        
        case "quantity-selection": {
          const [_, productId, productName, price, quantity] = parts;
          return {
            id,
            type: "quantity-selection",
            productId: parseInt(productId),
            productName,
            price: parseFloat(price),
            quantity: parseInt(quantity),
          } as QuantityOrder;
        }
        
        case "single-item": {
          const [_, productId, productName, price] = parts;
          return {
            id,
            type: "single-item",
            productId: parseInt(productId),
            productName,
            price: parseFloat(price),
          } as SingleItemOrder;
        }
        
        case "box": {
          const [_, productId, productName, price, boxQuantity] = parts;
          return {
            id,
            type: "box",
            productId: parseInt(productId),
            productName,
            price: parseFloat(price),
            boxQuantity: parseInt(boxQuantity),
          } as BoxOrder;
        }
        
        default:
          throw new Error(`Unknown order type: ${type}`);
      }
    });
  } catch (error) {
    console.error("Error parsing orders from URL:", error);
    return [];
  }
};

export const ordersToURLString = (orders: Order[]): string => {
  return orders.map(order => {
    switch (order.type) {
      case "flavor-selection":
        return `${order.type}:${order.productId}:${order.productName}:${order.size}:${order.price}:${order.selectedFlavors.join(",")}`;
      
      case "quantity-selection":
        return `${order.type}:${order.productId}:${order.productName}:${order.price}:${order.quantity}`;
      
      case "single-item":
        return `${order.type}:${order.productId}:${order.productName}:${order.price}`;
      
      case "box":
        return `${order.type}:${order.productId}:${order.productName}:${order.price}:${order.boxQuantity}`;
      
      default:
        return "";
    }
  }).filter(Boolean).join("|");
};