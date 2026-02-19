import APP_CONFIG from "@/config/general";
import BranchesContentPage from "@/feature/branches";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Sucursales | ${APP_CONFIG.APP_NAME}`,
  description:
    "Encontrá nuestra heladería artesanal Ducci más cerca. Sucursales en Cañada de Gómez, Las Rosas y Totoras. Horarios, direcciones y delivery disponible.",
  keywords: [
    "sucursales ducci",
    "heladería cañada de gómez",
    "heladería las rosas",
    "heladería totoras",
    "helados cañada de gómez",
    "helados las rosas",
    "helados totoras",
    "helados artesanales santa fe",
    "heladería artesanal santa fe",
    "direcciones ducci",
    "horarios ducci",
  ],
  openGraph: {
    title: `Sucursales | ${APP_CONFIG.APP_NAME}`,
    description:
      "Visitanos en Cañada de Gómez, Las Rosas o Totoras. Pedí delivery a domicilio.",
    images: ["/images/Logo-Ducci-OP.jpg"],
    type: "website",
    locale: "es_AR",
    siteName: APP_CONFIG.APP_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: `Sucursales | ${APP_CONFIG.APP_NAME}`,
    description: "Encontrá tu sucursal Ducci más cercana",
  },
};

export default function BranchesPage() {
  return <BranchesContentPage />;
}
