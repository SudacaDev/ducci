"use client";
import Link from "next/link";
import { NAV } from "@/constants/nav";
import { useFooter } from "./Footer";

const Nav = () => {
  const { isActive } = useFooter();

  return (
    <nav className="footer_links" aria-label="Navegación del footer">
      <ul className="footer_links-ul">
        {NAV.map((item) => {
          const active = isActive(item.url);
          return (
            <li key={item.id}>
              <i></i>
              <Link
                href={item.url}
                aria-current={active ? "page" : undefined}
                aria-label={item.label}
                className={active ? "active" : ""}
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
