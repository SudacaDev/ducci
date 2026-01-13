import { cn } from "@/lib/utils";
import React, { ReactNode, Ref } from "react";
 

interface BodyProps {
  children?: ReactNode;
  className?: string;
}

const Body = React.forwardRef<HTMLHeadingElement, BodyProps>(
  ({ children, className }, ref: Ref<HTMLHeadingElement>) => {
    return (
      <div className={cn(className, "content-block__body")} ref={ref}>
        {children}
      </div>
    );
  },
);

export default Body;
