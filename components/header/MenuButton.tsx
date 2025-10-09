"use client"
import { Menu } from "lucide-react";
import { useHeader } from "./Header";
import { Button } from "@/components/ui/button"

const MenuButton = () => {
  const { expanded, onShowMenu } = useHeader();

  return (
    <Button
      id="open-menu"
      type="button"
      onClick={onShowMenu}
      aria-label="Abrir menú"
      aria-expanded={expanded}
      aria-controls="navbar"
    >
      <Menu />
    </Button>
  );
};

export default MenuButton;