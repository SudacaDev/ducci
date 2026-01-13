import OrdersPageContent from "@/feature/orders";

import APP_CONFIG from "@/config/general";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `${APP_CONFIG.APP_NAME} | Pedidos`,
  description: "Tus pedidos pronto serán atendidos por la sucursal seleccionada",
  keywords: ["pedidos", "soporte", "ayuda"],
  openGraph: {
    title: `${APP_CONFIG.APP_NAME} | Pedidos`,
    description: "Tus pedidos pronto serán atendidos por la sucursal seleccionada",
    images: ["/images/contact-og.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${APP_CONFIG.APP_NAME} | Pedidos`,
    description: "Tus pedidos pronto serán atendidos por la sucursal seleccionada",
  },
};

export default function OrderPage() {
  return <OrdersPageContent />;
}
