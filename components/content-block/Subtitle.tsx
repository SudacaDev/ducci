import { ReactNode, RefObject } from "react";

interface SubtitleProps {
  children?: ReactNode;
  ref?: RefObject<HTMLHeadingElement | null>;
}

const Subtitle = ({ children, ref }: SubtitleProps) => {
  return (
    <p className="content-block__subtitle" ref={ref}>
      {children}
    </p>
  );
};
export default Subtitle;
