import React, { ReactNode, Ref } from "react";

interface BodyProps {
  children?: ReactNode;
}

const Body = React.forwardRef<HTMLHeadingElement, BodyProps>(
  ({ children }, ref: Ref<HTMLHeadingElement>) => {
    return (
      <div className="content-block__body" ref={ref}>
        {children}
      </div>
    );
  },
);

export default Body;
