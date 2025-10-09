"use client";
import { useHeader } from "./Header";

const Overlay = () => {
  const { show, onCloseMenu } = useHeader();

  return (
    <button
      id="overlay"
      type="button"
      className={show ? "show" : ""}
      onClick={onCloseMenu}
      aria-label="Cerrar menú"
      tabIndex={show ? 0 : -1}
      aria-hidden={true}
    />
  );
};

export default Overlay;
