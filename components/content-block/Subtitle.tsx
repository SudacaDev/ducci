import { ReactNode } from "react";

interface SubtitleProps {
  children?: ReactNode;
}

const Subtitle = ({ children }: SubtitleProps) => {
  return <p className="content-block__subtitle">{children}</p>;
};
export default Subtitle;
