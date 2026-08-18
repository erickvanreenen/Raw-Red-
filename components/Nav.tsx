"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart-context";

const links = [
  { href: "#product", label: "Shop" },
  { href: "#story", label: "Our Story" },
  { href: "#faq", label: "FAQ" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount, openCart } = useCart();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 bg-sand transition-[border-color] duration-200 ${
        scrolled ? "border-b border-ink/15" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <a href="#top" className="flex items-center gap-2 text-ink">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logomark.svg" alt="" width={32} height={32} />
          <span className="font-sans text-sm font-medium uppercase tracking-[0.33em]">
            Raw Red
          </span>
        </a>

        <div className="flex items-center gap-8">
          <nav className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-sans text-xs font-medium uppercase tracking-[0.1em] text-ink transition-colors duration-150 ease-out-quart hover:text-rooibos-red"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={openCart}
              aria-label={`Open cart, ${itemCount} item${itemCount === 1 ? "" : "s"}`}
              className="relative flex h-11 w-11 items-center justify-center rounded-md text-ink transition-colors duration-150 ease-out-quart hover:bg-white"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M6 6h15l-1.5 9h-12L6 6Zm0 0L5 3H2"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="9" cy="20" r="1.4" fill="currentColor" />
                <circle cx="17" cy="20" r="1.4" fill="currentColor" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-rooibos-red px-1 font-sans text-[0.65rem] font-medium text-cream">
                  {itemCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-label="Toggle menu"
              className="flex h-11 w-11 items-center justify-center rounded-md text-ink hover:bg-white md:hidden"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div
        className="grid overflow-hidden transition-[grid-template-rows] duration-200 ease-out-quart md:hidden"
        style={{ gridTemplateRows: mobileOpen ? "1fr" : "0fr" }}
      >
        <div className="min-h-0">
          <nav className="flex flex-col gap-1 border-t border-ink/15 px-4 pb-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex min-h-11 items-center font-sans text-xs font-medium uppercase tracking-[0.1em] text-ink"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
