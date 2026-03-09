"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/analyze/skin", label: "Skin Analysis" },
  { href: "/analyze/hair", label: "Hair Analysis" },
  { href: "/products", label: "Products" },
  { href: "/compare", label: "Compare" },
  { href: "/ingredients", label: "Ingredients" },
  { href: "/myths-facts", label: "Myths vs Facts" },
  { href: "/blog", label: "Blog" }
];

export function NavBar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 glass">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-extrabold tracking-tight text-primary">
          DermaCompare
        </Link>
        <nav className="hidden gap-5 text-sm font-semibold text-muted md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className={pathname === link.href ? "text-primary" : "hover:text-primary"}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
