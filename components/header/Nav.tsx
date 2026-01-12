"use client";
import Link from "next/link";
import { ShoppingCart, X } from "lucide-react";
import { NAV } from "@/constants/nav";
import { useHeader } from "./Header";
import { Button } from "../ui/button";
 
import { useCartDrawer } from "@/contexts/CartDrawerContext";
import { useCart } from "../cart";
 

const Nav = () => {
  const { show, isActive, onCloseMenu } = useHeader();
  const { openDrawer } = useCartDrawer();
   const { cart, isHydrated } = useCart();

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
      
  
      <div className="cart-wrapper px-4 py-2 hover:cursor-pointer cart-header">
       <button onClick={openDrawer} className="hover:cursor-pointer">
        <ShoppingCart />{ cart.length > 0 && isHydrated && <span className="cart-count">{cart.length}</span> } 
      </button>
      </div>
    </nav>
  );
};

export default Nav;