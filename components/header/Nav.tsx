// components/header/Nav.tsx
"use client";
import Link from "next/link";
import { X, ShoppingCart } from "lucide-react";
import { NAV } from "@/constants/nav";
import { useHeader } from "./Header";
import { Button } from "../ui/button";
import { useCart } from "@/components/cart";

const Nav = () => {
  const { show, isActive, onCloseMenu } = useHeader();
  const { cart, isHydrated } = useCart();

  // Calcular total de items
  const totalItems = cart.length;

  return (
    <nav
      id="navbar"
      aria-label="Navegación principal"
      className={show ? "show" : ""}
    >
      <div className="close-button_wrapper">
        <Button
          id="close-menu"
          type="button"
          onClick={onCloseMenu}
          aria-label="Cerrar menú"
          variant={"outline"}
        >
          <X />
        </Button>
      </div>
      <ul className="flex">
        {NAV.map((item) => {
          const isCurrentPage = isActive(item.url);
          const isContacto = item.alwaysActive;

          const getClasses = () => {
            if (isContacto) {
              return "active item";
            }
            if (isCurrentPage) {
              return "active-url  item";
            }
            return "item";
          };

          return (
            <li key={item.id}>
              <Link
                href={item.url}
                aria-current={isCurrentPage ? "page" : undefined}
                className={getClasses()}
                onClick={onCloseMenu}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
      
      {/* Cart Summary */}
      <div className="cart-summary flex items-center gap-2 px-4 py-2">
        <ShoppingCart size={20} />
        <span>
          {isHydrated ? (
            <>({totalItems})</>
          ) : (
            <>(0)</>
          )}
        </span>
      </div>
    </nav>
  );
};

export default Nav;