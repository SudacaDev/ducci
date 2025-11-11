import { ReactNode, RefObject } from "react";
import { cn } from "@/lib/utils";

interface BlockContentProps {
  children?: ReactNode;
  className?: string;
  ref?: RefObject<HTMLHeadingElement | null>;
}

const Content = ({ children, className, ref }: BlockContentProps) => {
  return (
    <div className={cn("content-block__content", className)} ref={ref}>{children}</div>
  );
};

export default Content;
