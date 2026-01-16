import ProductsPageContent from "@/feature/products";
import APP_CONFIG from "@/config/general";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Productos | Helados | Baldes y Alfajores Helados | ${APP_CONFIG.APP_NAME}`,
  description: "Dusfruta Ducci: helados artesanales premium. Baldes de 1L, 3L y 5L, alfajores helados artesanales y productos gourmet. Pedí online con envío a domicilio.",
  keywords: [
    "productos",
    "helados ducci",
    "helados artesanales",
    "baldes de helado",
    "baldes de helado 1 litro",
    "baldes de helado 3 litros",
    "baldes de helado 5 litros",
    "alfajores helados",
    "alfajores helados artesanales",
    "helados delivery",
    "helados a domicilio",
    "comprar helados online",
    "heladeria artesanal",
    "helados premium"
  ],
  openGraph: {
    title: `Productos Dusfruta Ducci - Helados Artesanales`,
    description: "Baldes de helado, alfajores helados y productos premium. Pedí online con envío a domicilio.",
    images: ["/images/Logo-Ducci-OP.jpg"],
    type: "website",
    locale: "es_AR",
    siteName: APP_CONFIG.APP_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: `Productos | ${APP_CONFIG.APP_NAME}`,
    description: "Baldes de helado, alfajores helados artesanales. Pedí online.",
  },
};

export default function products() {
  return <ProductsPageContent />;
}