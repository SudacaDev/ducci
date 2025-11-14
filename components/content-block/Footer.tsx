import React, { ReactNode, Ref } from "react";

interface FooterProps {
  children?: ReactNode;
}

const Footer = React.forwardRef<HTMLHeadingElement, FooterProps>(
  ({ children }, ref: Ref<HTMLHeadingElement>) => {
    return (
      <div className="content-block__footer" ref={ref}>
        {children}
      </div>
    );
  },
);
export default Footer;
