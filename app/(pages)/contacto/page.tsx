import ContactPageContent from "@/feature/contact";
import APP_CONFIG from "@/config/general";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Contacto | Comunicate con Nosotros | ${APP_CONFIG.APP_NAME}`,
  description:
    "¿Tenés dudas sobre nuestros helados artesanales, pedidos o delivery? Contactanos por WhatsApp, mail o visitanos en nuestras sucursales. Estamos para ayudarte.",
  keywords: [
    "contacto ducci",
    "whatsapp ducci",
    "teléfono ducci",
    "mail ducci",
    "contacto heladería",
    "consultas helados",
    "soporte ducci",
    "ayuda pedidos",
    "información delivery",
  ],
  openGraph: {
    title: `Contacto | ${APP_CONFIG.APP_NAME}`,
    description:
      "Estamos para ayudarte. Contactanos por WhatsApp, mail o visitanos en nuestras sucursales.",
    images: ["/images/contact-og.jpg"],
    type: "website",
    locale: "es_AR",
    siteName: APP_CONFIG.APP_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: `Contacto | ${APP_CONFIG.APP_NAME}`,
    description: "Contactanos por WhatsApp, mail o visitanos",
  },
};

export default function contact() {
  return <ContactPageContent />;
}
