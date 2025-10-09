"use client";
import Link from "next/link";
import { MENU } from "@/types/nav.type";
import { useHeader } from "./Header";

const Logo = () => {
  const { isActive } = useHeader();

  return (
    <div className="item">
      <Link
        href={MENU.HOME}
        className={isActive(MENU.HOME) ? "active item" : "item"}
        aria-label="Ir a inicio"
        aria-current={isActive(MENU.HOME) ? "page" : undefined}
      >
        logo
      </Link>
    </div>
  );
};

export default Logo;
