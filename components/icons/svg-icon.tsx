import { ReactNode } from "react";

interface SvgIconProps {
  children: ReactNode;
  size?: number;
  className?: string;
  viewBox?: string;
  fill?: string;
  stroke?: string;
}

const SvgIcon = ({ 
  children, 
  size = 24, 
  className = "",
  viewBox = "0 0 24 24",
  fill = "none",
  stroke = "currentColor"
}: SvgIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill={fill}
      stroke={stroke}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {children}
    </svg>
  );
};

export default SvgIcon;