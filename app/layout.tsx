"use client";
import { Poppins, DM_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Lenis from "lenis";
import "./globals.css";
import { useEffect } from "react";

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

  /**
   * 
   * 
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  
    // ✅ GUARDAR EN WINDOW PARA ACCESO GLOBAL
    (window as any).lenis = lenis;
  
    function raf(time: any) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
  
    requestAnimationFrame(raf);
  
    // Cleanup
    return () => {
      lenis.destroy();
      delete (window as any).lenis;
    };
  }, []);
   */
  return (
    <html lang="es">
      <body
        className={`${poppins.variable} ${dmSans.variable} antialiased grid grid-rows-[auto_1fr_auto] min-h-screen`}
      >
        {children}
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
