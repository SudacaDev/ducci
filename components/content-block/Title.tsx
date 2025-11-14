import React, { ReactNode } from "react";
import type { Ref } from "react"; // Importar Ref de React

interface TitleProps {
  children?: ReactNode;
}

const Title = React.forwardRef<HTMLHeadingElement, TitleProps>(
  ({ children }, ref: Ref<HTMLHeadingElement>) => {
    return (
      <h2 className="content-block__title" ref={ref}>
        {children}
      </h2>
    );
  },
);

Title.displayName = "BlockTitle";

export default Title;
