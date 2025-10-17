import { ReactNode } from "react";

interface BodyProps {
  children?: ReactNode;
}

const Body = ({ children }: BodyProps) => {
  return <div className="content-block__body">{children}</div>;
};

export default Body;
