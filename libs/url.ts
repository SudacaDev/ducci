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

  const splitString = pathname.replace("/", "");

  return {
    isActive,
    pathname,
    splitString,
  };
};

export default useGetPathname;
