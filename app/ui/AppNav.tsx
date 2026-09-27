"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDemoAuth } from "../providers/DemoAuthProvider";

const links = [
  { href: "/start", label: "Главная" },
  { href: "/books", label: "Каталог книг" },
  { href: "/about", label: "О проекте" },
  { href: "/cabinet", label: "Кабинет" },
];

function isActive(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function AppNav() {
  const pathname = usePathname();
  const { user, logout } = useDemoAuth();

  return (
    <header className="header">
      <Link className="header__brand" href="/start">
        Колибри
      </Link>

      <nav aria-label="Основная навигация">
        <ul className="header__nav">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                className="header__link"
                href={link.href}
                aria-current={isActive(pathname, link.href) ? "page" : undefined}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {user ? (
        <div className="header__auth">
          <span className="header__user">{user.name}</span>
          <button className="button button--ghost" type="button" onClick={logout}>
            Выйти
          </button>
        </div>
      ) : (
        <Link
          className="header__login"
          href="/auth/login"
          aria-current={pathname.startsWith("/auth") ? "page" : undefined}
        >
          Войти
        </Link>
      )}
    </header>
  );
}
