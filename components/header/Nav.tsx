"use client"
import Link from "next/link";
import { X } from "lucide-react";
import { NAV } from "@/constants/nav";
import { useHeader } from "./Header";

const Nav = () => {
  const { show, isActive, onCloseMenu } = useHeader();

  return (
    <nav
      id="navbar"
      aria-label="Navegación principal"
      className={show ? "show" : ""}
    >
      <div className="close-button_wrapper">
        <button
          id="close-menu"
          type="button"
          onClick={onCloseMenu}
          aria-label="Cerrar menú"
        >
          <X />
        </button>
      </div>
      <ul className="flex">
        {NAV.map((item) => {
          const active = isActive(item.url);

          return (
            <li key={item.id}>
              <Link
                href={item.url}
                aria-current={active ? "page" : undefined}
                className={active ? "active item" : "item"}
                onClick={onCloseMenu}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Nav;