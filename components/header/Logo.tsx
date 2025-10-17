"use client";
import Link from "next/link";
import { MENU } from "@/types/nav.type";
import { useHeader } from "./Header";
import Image from "next/image";

const Logo = () => {
  const { isActive } = useHeader();

  return (
    <div className="item logo">
      <Link
        href={MENU.HOME}
        className={isActive(MENU.HOME) ? "active item" : "item"}
        aria-label="Ir a inicio"
        aria-current={isActive(MENU.HOME) ? "page" : undefined}
      >
        <Image
          src="/images/logo-ducci.svg"
          alt="Logo Ducci"
          width={654}
          height={390}
        />
      </Link>
    </div>
  );
};

export default Logo;
