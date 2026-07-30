"use client";

import { useEffect, useState } from "react";
import { priceLabel } from "@/lib/product";
import BuyButton from "./BuyButton";

const links = [
  { label: "Proč Cleaner", href: "/#why" },
  { label: "Jak to funguje", href: "/#how" },
  { label: "Výkon", href: "/#power" },
  { label: "Parametry", href: "/#specs" },
  { label: "Kontakt", href: "/kontakt" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="container-x">
        <nav
          className={`flex items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 sm:px-5 ${
            scrolled
              ? "border border-line-2 bg-surface/80 shadow-[0_20px_50px_-30px_rgba(26,24,19,0.5)] backdrop-blur-xl"
              : "border border-transparent"
          }`}
        >
          <a href="/" className="flex items-center gap-2.5" aria-label="Cleaner — domů">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink">
              <span className="h-2.5 w-2.5 rounded-full bg-lime" />
            </span>
            <span className="text-[1.15rem] font-semibold tracking-tight">cleaner</span>
          </a>

          <ul className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-sm text-muted transition-colors hover:text-ink"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <BuyButton variant="primary" className="!px-5 !py-2.5 !text-sm">
            Koupit · {priceLabel}
          </BuyButton>
        </nav>
      </div>
    </header>
  );
}
