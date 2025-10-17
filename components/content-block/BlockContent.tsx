import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BlockContentProps {
  children?: ReactNode;
  className?: string;
}

const Content = ({ children, className }: BlockContentProps) => {
  return (
    <div className={cn("content-block__content", className)}>{children}</div>
  );
};

export default Content;
