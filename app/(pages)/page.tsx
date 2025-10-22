import HomePageContent from "@/feature/home";
import APP_CONFIG from "@/config/general";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `${APP_CONFIG.APP_NAME} | Home`,
  description: "Ducci es mucho más que una heladería. Es el punto de encuentro.",
  keywords: ["Ducci", "soporte", "ayuda"],
  openGraph: {
    title: `${APP_CONFIG.APP_NAME} | Sucursales`,
    description: "Ducci es mucho más que una heladería. Es el punto de encuentro.",
    images: ["/images/logo-ducci.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${APP_CONFIG.APP_NAME} | Sucursales`,
    description: "Ducci es mucho más que una heladería. Es el punto de encuentro.",
  },
};

export default function Home() {
  return <HomePageContent />;
}
