import APP_CONFIG from "@/config/general";
import AboutUsContentPage from "@/feature/about";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `La Magia Ducci | Nuestra Historia | ${APP_CONFIG.APP_NAME}`,
  description:
    "Conocé la historia de Ducci Gelateria. Momentos Ducci es nuestra manera de celebrar la tradición artesanal argentina, la familia y el sabor auténtico que nos define.",
  keywords: [
    "ducci historia",
    "sobre ducci",
    "heladería artesanal argentina",
    "tradición helados artesanales",
    "momentos ducci",
    "la magia ducci",
    "historia heladería",
    "valores ducci",
    "familia ducci",
  ],
  openGraph: {
    title: `La Magia Ducci | ${APP_CONFIG.APP_NAME}`,
    description:
      "Momentos Ducci es nuestra manera de celebrar la tradición, la familia y el sabor auténtico.",
    images: ["/images/Logo-Ducci-OP.jpg"],
    type: "website",
    locale: "es_AR",
    siteName: APP_CONFIG.APP_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: `La Magia Ducci | ${APP_CONFIG.APP_NAME}`,
    description: "Momentos Ducci es nuestra manera de celebrar.",
  },
};

export default function about() {
  return <AboutUsContentPage />;
}
