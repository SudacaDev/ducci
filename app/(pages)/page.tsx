// app/page.tsx (homepage)

import type { Metadata } from "next";
import HomePageContent from "@/feature/home";
import APP_CONFIG from "@/config/general";

export const metadata: Metadata = {
  title: `${APP_CONFIG.APP_NAME} | Home`,
  description:
    "Ducci Gelateria: helados artesanales premium en Argentina. El punto de encuentro perfecto para compartir momentos únicos. Baldes, alfajores helados y más con delivery.",
  keywords: [
    "Ducci",
    "ducci gelateria",
    "dusfruta ducci",
    "heladería",
    "helado artesanal",
    "helados artesanales argentina",
    "helados premium",
    "heladería artesanal",
    "punto de encuentro",
    "cafetería",
    "helados cañada de gómez",
    "helados las rosas",
    "helados totoras",
    "helados delivery",
  ],
  openGraph: {
    title: `${APP_CONFIG.APP_NAME} | Helados Artesanales Premium`,
    description:
      "Ducci es mucho más que una heladería. Es el punto de encuentro perfecto para compartir momentos únicos.",
    type: "website",
    locale: "es_AR",
    siteName: APP_CONFIG.APP_NAME,
    url: "https://ducci.com",
    images: [
      {
        url: "/images/Logo-Ducci-OP.jpg",
        width: 1200,
        height: 630,
        alt: "Ducci - Heladería Artesanal Premium",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${APP_CONFIG.APP_NAME} | Helados Artesanales`,
    description:
      "Ducci es mucho más que una heladería. Es el punto de encuentro.",
    images: ["/images/Logo-Ducci-OP.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function Home() {
  return <HomePageContent />;
}
