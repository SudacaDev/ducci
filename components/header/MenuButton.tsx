"use client";

import { useState } from "react";
import { Menu, ShoppingCart, X } from "lucide-react";
import { useHeader } from "./Header";
import { Button } from "@/components/ui/button";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { NAV } from "@/constants/nav";
import Link from "next/link";
import { useCartDrawer } from "@/contexts/CartDrawerContext";
import { useCart } from "../cart";
import { DialogTitle } from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const MenuButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isActive, onCloseMenu } = useHeader();
  const { openDrawer } = useCartDrawer();
  const { cart, isHydrated } = useCart();

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen} direction="right">
      <div className="flex gap-2">
        <div className="cart-wrapper mobile px-4 py-2 hover:cursor-pointer cart-header">
          <button onClick={openDrawer} className="hover:cursor-pointer">
            <ShoppingCart />
            {cart.length > 0 && isHydrated && (
              <span className="cart-count">{cart.length}</span>
            )}
          </button>
        </div>
        <DrawerTrigger asChild>
          <Button
            id="open-menu"
            type="button"
            aria-label="Abrir menú"
            aria-expanded={isOpen}
            aria-controls="navbar"
            variant="ghost"
            size="icon"
          >
            <Menu />
          </Button>
        </DrawerTrigger>
      </div>

      <DrawerContent className="h-full w-full bg-white sm:max-w-md md:max-w-lg border-none fixed right-0 top-0 z-[99999999] bottom-0 pt-[32px] flex flex-col">
        <VisuallyHidden>
          <DialogTitle>Título del modal</DialogTitle>
        </VisuallyHidden>
        <nav
          id="drawer-navbar"
          aria-label="Navegación principal"
          className={"flex flex-col"}
        >
          <div className="close-button_wrapper">
            <DrawerClose asChild>
              <Button
                id="close-menu"
                type="button"
                aria-label="Cerrar menú"
                variant={"outline"}
              >
                <X />
              </Button>
            </DrawerClose>
          </div>
          <div className="w-full">
            <ul className="drawer-menu flex flex-col px-8">
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
                      onClick={() => {
                        setIsOpen(false);
                        onCloseMenu();
                      }}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </DrawerContent>
    </Drawer>
  );
};

export default MenuButton;
