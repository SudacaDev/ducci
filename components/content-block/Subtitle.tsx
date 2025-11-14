import React, { ReactNode, Ref } from "react";

interface SubtitleProps {
  children?: ReactNode;
}

const Subtitle = React.forwardRef<HTMLHeadingElement, SubtitleProps>(
  ({ children }, ref: Ref<HTMLHeadingElement>) => {
    return (
      <p className="content-block__subtitle" ref={ref}>
        {children}
      </p>
    );
  },
);
export default Subtitle;
