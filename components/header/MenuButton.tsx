"use client"
import { Menu } from "lucide-react";
import { useHeader } from "./Header";

const MenuButton = () => {
  const { expanded, onShowMenu } = useHeader();

  return (
    <button
      id="open-menu"
      type="button"
      onClick={onShowMenu}
      aria-label="Abrir menú"
      aria-expanded={expanded}
      aria-controls="navbar"
    >
      <Menu />
    </button>
  );
};

export default MenuButton;