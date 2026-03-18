"use client";
import Link from "next/link";
import { NAV } from "@/constants/nav";
import { useFooter } from "./Footer";

const Nav = () => {
  const { isActive } = useFooter();

  return (
    <nav className="footer_links flex w-full justify-center md:justify-start" aria-label="Navegación del footer">
      <ul className="footer_links-ul flex flex-col gap-2 text-center md:text-left m-0 p-0">
        {NAV.map((item) => {
          const active = isActive(item.url);
          return (
            <li key={item.id} className="flex items-center justify-center md:justify-start gap-3 text-[1.05rem]">
              <i className="shrink-0 w-2 h-2 rounded-full bg-[#fde071]"></i>
              <Link
                href={item.url}
                aria-current={active ? "page" : undefined}
                aria-label={item.label}
                className={`opacity-90 hover:opacity-100 hover:text-[#fde071] transition-colors duration-300 ${active ? "text-[#fde071] font-medium" : "text-white"}`}
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
