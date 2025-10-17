import { ReactNode } from "react";

interface FooterProps {
  children?: ReactNode;
}

const Footer = ({ children }: FooterProps) => {
  return <div className="content-block__footer"> {children} </div>;
};
export default Footer;
