"use client";

import useGetPathname from "@/libs/url";
import { createContext, useContext, useState, type ReactNode } from "react";

export interface HeaderContextType {
  show: boolean;
  expanded: boolean;
  isActive: (url: string) => boolean;
  onShowMenu: () => void;
  onCloseMenu: () => void;
}

export const HeaderContext = createContext<HeaderContextType | undefined>(
  undefined,
);

export const useHeader = () => {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error("Los componentes Header.* deben usarse dentro de <Header>");
  }
  return context;
};

interface HeaderProps {
  children: ReactNode;
}

const Header = ({ children }: HeaderProps) => {
  const { isActive } = useGetPathname();
  const [show, setShow] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const onShowMenu = () => {
    setShow(true);
    setExpanded(true);
  };

  const onCloseMenu = () => {
    setShow(false);
    setExpanded(false);
  };

  const value = {
    show,
    expanded,
    isActive,
    onShowMenu,
    onCloseMenu,
  };

  return (
    <HeaderContext.Provider value={value}>
      <header className="header bg-primary-color-light">
        <div className="flex justify-center items-center m-auto navBar container px-4 nav-wrapper">
          {children}
        </div>
      </header>
    </HeaderContext.Provider>
  );
};

export default Header;
