"use client";

import { createContext, useContext, ReactNode } from "react";
import useGetPathname from "@/libs/url";

export interface FooterContextType {
  isActive: (url: string) => boolean;
}

export const FooterContext = createContext<FooterContextType | undefined>(
  undefined,
);

export const useFooter = () => {
  const context = useContext(FooterContext);
  if (!context) {
    throw new Error("Los componentes Footer.* deben usarse dentro de <Footer>");
  }
  return context;
};

interface FooterProps {
  children: ReactNode;
}

const Footer = ({ children }: FooterProps) => {
  const { isActive } = useGetPathname();

  const value = {
    isActive,
  };

  return (
    <FooterContext.Provider value={value}>
      <footer className="flex justify-center items-center">
        <div className="w-full flex justify-center items-center flex-col">
          <div className="footer_wrapper container  m-auto     gap-4">
            {children}
          </div>
          <div className="py-4 w-full justify-center items-center flex footer-copy container ">
            <small>
              Copyright &copy; 2024 Ducci Gelateria. All rights reserved.
            </small>
          </div>
        </div>
      </footer>
    </FooterContext.Provider>
  );
};

export default Footer;
