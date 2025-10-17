"use client";

import { type ReactNode, useContext, createContext, useState } from "react";

export interface ContentBlockContextType {
  isActive: boolean;
  setIsActive: (active: boolean) => void;
}

export interface ContentBlockProps {
  children: ReactNode;
}

const ContentBlockContext = createContext<ContentBlockContextType | undefined>(
  undefined,
);

export const useContentBlock = () => {
  const context = useContext(ContentBlockContext);
  if (!context) {
    throw new Error(
      "Los componentes ContentBlock.* deben usarse dentro de <ContentBlock>",
    );
  }
  return context;
};

const ContentBlock = ({ children }: ContentBlockProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const value: ContentBlockContextType = {
    isActive,
    setIsActive,
  };

  return (
    <ContentBlockContext.Provider value={value}>
      <div className="content-block">
        <div className="content-block__wrapper">{children}</div>
      </div>
    </ContentBlockContext.Provider>
  );
};

export default ContentBlock;
