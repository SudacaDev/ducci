import { ReactNode, RefObject,  } from "react";

interface BodyProps {
  children?: ReactNode;
  ref?: RefObject<HTMLHeadingElement | null>;
}

const Body = ({ children, ref }: BodyProps) => {
  return <div className="content-block__body" ref={ref}>{children}</div>;
};

export default Body;
