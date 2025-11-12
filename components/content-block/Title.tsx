import { ReactNode, RefObject } from "react";

interface TitleProps {
  children?: ReactNode;
  ref?: RefObject<HTMLHeadingElement | null>;
}

const Title = ({ children, ref }: TitleProps) => {
  return (
    <h2 className="content-block__title" ref={ref}>
      {children}
    </h2>
  );
};

export default Title;
