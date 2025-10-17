import { ReactNode } from "react";

interface TitleProps {
  children?: ReactNode;
}

const Title = ({ children }: TitleProps) => {
  return <h2 className="content-block__title">{children}</h2>;
};

export default Title;
