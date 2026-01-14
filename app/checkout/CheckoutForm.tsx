 
"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";
import { useCart } from "@/components/cart";
import type { Order } from "@/types/order.type";
import toast from "react-hot-toast";

interface CheckoutFormProps {
  cart: Order[];
  branchId: number;
  branchName: string;
  totalPrice: number;
}

export default function CheckoutForm({
  cart,
  branchId,
  branchName,
  totalPrice,
}: CheckoutFormProps) {
  const router = useRouter();
  const { clearCart } = useCart();
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    notes: "",
  });
  
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
   
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          customer_name: formData.name,
          customer_phone: formData.phone,
          customer_email: formData.email || null,
          branch_id: branchId,
          total: totalPrice,
          notes: formData.notes || null,
          status: "pending",
        })
        .select()
        .single();

      if (orderError) throw orderError;

      
      const orderItems = cart.map((item) => ({
        order_id: order.id,
        product_id: item.productId,
        product_name: item.productName,
        quantity: 1,
        price: item.price,
        selected_flavors:
          item.type === "flavor-selection" ? item.selectedFlavors : null,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) throw itemsError;

 
      const { data: branch, error: branchError } = await supabase
        .from("branches")
        .select("whatsapp_number, phone")
        .eq("id", branchId)
        .single();

      if (branchError) {
        console.error("Error obteniendo sucursal:", branchError);
        throw new Error("No se pudo obtener los datos de la sucursal");
      }

      
      const whatsappNumber = branch?.whatsapp_number || branch?.phone || "5491159594708";
      
      if (!whatsappNumber) {
        throw new Error("La sucursal no tiene número de WhatsApp configurado");
      }

  
      const orderReference = order.order_number || `#${order.id}`;
      const message = generateWhatsAppMessage(
        formData.name,
        orderReference,
        cart,
        totalPrice,
        branchName,
        formData.notes
      );

     
      const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        message
      )}`;
      
      toast.success("¡Pedido creado exitosamente!");
      
      
    const link = document.createElement('a');
link.href = whatsappURL;
link.target = '_blank';
link.rel = 'noopener noreferrer';
document.body.appendChild(link);
link.click();
document.body.removeChild(link);
      
 
      setTimeout(() => {
        clearCart();
        router.push("/");
      }, 2000);
    } catch (error) {
      console.error("Error al crear pedido:", error);
      toast.error("Error al procesar el pedido. Por favor intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Datos de contacto
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div>
          <Label htmlFor="name">
            Nombre completo <span className="text-red-500">*</span>
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Juan Pérez"
            className="mt-1"
          />
        </div>

        
        <div>
          <Label htmlFor="phone">
            Teléfono <span className="text-red-500">*</span>
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            required
            value={formData.phone}
            onChange={handleChange}
            placeholder="11 1234 5678"
            className="mt-1"
          />
        </div>

       
        <div>
          <Label htmlFor="email">Email (opcional)</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="juan@example.com"
            className="mt-1"
          />
          <p className="text-xs text-gray-500 mt-1">
            Para recibir promociones y novedades
          </p>
        </div>

        
        <div>
          <Label>Sucursal seleccionada</Label>
          <div className="mt-1 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <p className="font-medium text-gray-900">{branchName}</p>
          </div>
        </div>

        
        <div>
          <Label htmlFor="notes">Notas del pedido (opcional)</Label>
          <Textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Ej: Sin azúcar, alérgico a frutos secos, etc."
            className="mt-1"
            rows={3}
          />
        </div>

        
        <Button
          type="submit"
          disabled={loading}
          className="w-full h-12 text-base bg-[#25D366]"
        >
          {loading ? "Procesando..." : "Enviar pedido por WhatsApp"}
        </Button>

        <p className="text-xs text-gray-500 text-center">
          Al enviar el pedido, serás redirigido a WhatsApp para confirmar con la
          sucursal
        </p>
      </form>
    </div>
  );
}

 
function generateWhatsAppMessage(
  customerName: string,
  orderReference: string,
  cart: Order[],
  total: number,
  branchName: string,
  notes?: string
): string {
  let message = `*NUEVO PEDIDO - DUCCI GELATERIA*\n\n`;
  message += `*Cliente:* ${customerName}\n`;
  message += `*Referencia:* ${orderReference}\n`;
  message += `*Sucursal:* ${branchName}\n\n`;
  message += `*DETALLE DEL PEDIDO:*\n`;
  message += `------------------------\n`;

  cart.forEach((item, index) => {
    message += `\n${index + 1}. *${item.productName}*\n`;
    
    if (item.type === "flavor-selection") {
      message += `   - Tamaño: ${item.size}\n`;
      message += `   - Sabores: ${item.selectedFlavors.join(", ")}\n`;
    } else if (item.type === "quantity-selection") {
      message += `   - Cantidad: ${item.quantity}\n`;
    } else if (item.type === "box") {
      message += `   - Cantidad: ${item.boxQuantity}\n`;
    }
    
    message += `   - Precio: $${item.price.toLocaleString("es-AR")}\n`;
  });

  message += `\n------------------------\n`;
  message += `*TOTAL: $${total.toLocaleString("es-AR")}*\n`;

  if (notes) {
    message += `\n*Notas del cliente:*\n${notes}\n`;
  }

  message += `\n_Pedido realizado desde duccihelados.com_`;

  return message;
}