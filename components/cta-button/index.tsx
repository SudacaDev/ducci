import { ReactNode } from "react";
import { Button,  } from "../ui/button";
import { cn } from "@/lib/utils";

interface CTAButtonProps {
  children: ReactNode;
  type?: "primary" | "secondary" | "outline";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  size?:  "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg" | null | undefined
}

const CTAButton = ({
  children,
  type = "primary",
  className,
  onClick,
  size,
  disabled = false,
}: CTAButtonProps) => {
  return (
    <Button
      className={cn("button__cta", type && `button__cta--${type}`, className)}
      onClick={onClick}
      disabled={disabled}
      size={size}
    >
      {children}
    </Button>
  );
};

export default CTAButton;
