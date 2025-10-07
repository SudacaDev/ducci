import type { Metadata } from "next";
import { Poppins, DM_Sans } from "next/font/google";

import "./globals.css";
import Footer from "@/components/footer";
import Header from "@/components/header";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ducci Gelateria",
  description: "Ducci Gelateria",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <html lang="en">
      <body
        className={`${poppins.variable} ${dmSans.variable} antialiased grid grid-rows-[auto_1fr_auto] h-dvh`}
      >
        <Header />
        <main className="">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
