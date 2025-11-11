import { ReactNode, RefObject } from "react";

interface FooterProps {
  children?: ReactNode;
  ref?: RefObject<HTMLHeadingElement | null>;
}

const Footer = ({ children, ref }: FooterProps) => {
  return <div className="content-block__footer" ref={ref}> {children} </div>;
};
export default Footer;
