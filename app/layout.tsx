import { Poppins, DM_Sans } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "@/components/cart";
import { CartDrawerProvider } from "@/contexts/CartDrawerContext";
import CartDrawer from "@/components/cart/CartDrawer";
import CartWidget from "@/feature/products/CartWidget";

export const metadata: Metadata = {
  title: "Ducci Gelateria",
  description: "Es mucho más que una heladeria",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={`${poppins.variable} ${dmSans.variable} antialiased grid grid-rows-[auto_1fr_auto] min-h-screen`}
      >
        <CartProvider>
          <CartDrawerProvider>
            {children}
            <CartDrawer />
            <CartWidget />
          </CartDrawerProvider>
        </CartProvider>

        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          toastOptions={{
            duration: 4000,
            style: {
              background: "#333",
              color: "#fff",
              padding: "16px",
              borderRadius: "8px",
              fontSize: "14px",
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: "#BA6516",
                secondary: "#fff",
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: "#ef4444",
                secondary: "#fff",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
