"use client";

import { MENU } from "@/types/nav.type";
import { usePathname } from "next/navigation";

const useGetPathname = () => {
  const pathname = usePathname();

  const isActive = (url: string) => {
    if (url === "/" || url === MENU.HOME) {
      return pathname === "/" || pathname === MENU.HOME;
    }

    return pathname === url || pathname.startsWith(url + "/");
  };

  return {
    isActive,
    pathname,
  };
};

export default useGetPathname;
