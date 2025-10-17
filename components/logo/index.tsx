"use client";

import { MENU } from "@/types/nav.type";
import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  isFooter?: boolean;
}

const Logo = ({ isFooter }: LogoProps) => {
  return (
    <div className="footer_logo">
      <Link
        href={MENU.HOME}
        aria-label="Ir a inicio"
        aria-current={MENU.HOME ? "page" : undefined}
      >
        <Image
          src={`${isFooter ? "/images/logo-ducci-footer.svg" : "/images/logo-ducci.svg"}`}
          alt="Logo Ducci"
          width={654}
          height={390}
          priority
        />
      </Link>
    </div>
  );
};

export default Logo;
