import type { Metadata } from "next";
import HomePageContent from "@/feature/home";
import APP_CONFIG from "@/config/general";

export const metadata: Metadata = {
  title: `${APP_CONFIG.APP_NAME} | Home`,
  description: "Ducci es mucho más que una heladería. Es el punto de encuentro.",
  keywords: ["Ducci", "heladería", "helado artesanal", "punto de encuentro", "cafetería"],
  
  openGraph: {
    title: `${APP_CONFIG.APP_NAME} | Home`,
    description: "Ducci es mucho más que una heladería. Es el punto de encuentro.",
    type: "website",
    locale: "es_AR",
    siteName: APP_CONFIG.APP_NAME,
    images: [
      {
        url: "/images/Logo-Ducci-OP.jpg",
        width: 1200,
        height: 630,
        alt: "Ducci - Heladería Artesanal",
      },
    ],
  },
  
  twitter: {
    card: "summary_large_image",
    title: `${APP_CONFIG.APP_NAME} | Home`,
    description: "Ducci es mucho más que una heladería. Es el punto de encuentro.",
    images: ["/images/Logo-Ducci-OP.jpg"],
  },
};

export default function Home() {
  return <HomePageContent />;
}