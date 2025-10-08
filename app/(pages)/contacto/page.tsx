import ContactPageContent from "@/feature/contact";
import APP_CONFIG from "@/config/general";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `${APP_CONFIG.APP_NAME} | Contacto`,
  description: "Ponte en contacto con nosotros. Estamos aquí para ayudarte.",
  keywords: ["contacto", "soporte", "ayuda"],
  openGraph: {
    title: `${APP_CONFIG.APP_NAME} | Contacto`,
    description: "Ponte en contacto con nosotros",
    images: ["/images/contact-og.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${APP_CONFIG.APP_NAME} | Contacto`,
    description: "Ponte en contacto con nosotros",
  },
};

export default function contact() {
  return <ContactPageContent />;
}
