"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart-context";

const links = [
  { href: "/#product", label: "Shop" },
  { href: "/#story", label: "Our story" },
  { href: "/#faq", label: "FAQ" },
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
      className={`sticky top-0 z-40 bg-paper transition-[border-color] duration-200 ${
        scrolled ? "border-b border-line" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-5 py-3.5 sm:px-8 lg:px-10">
        <a href="/#top" className="flex min-h-11 items-center gap-2.5 text-ink">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logomark.svg" alt="" width={34} height={34} />
          <span className="font-display text-[1.375rem] font-semibold tracking-[-0.02em]">
            Raw Rooibos
          </span>
        </a>

        <div className="flex items-center gap-7">
          <nav className="hidden items-center gap-7 md:flex" aria-label="Main">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="inline-flex min-h-11 items-center text-[0.9375rem] font-medium text-ink transition-colors duration-150 ease-out-quart hover:text-ember"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={openCart}
              aria-label={`Open cart, ${itemCount} item${itemCount === 1 ? "" : "s"}`}
              className="relative flex h-11 w-11 items-center justify-center rounded-full text-ink transition-colors duration-150 ease-out-quart hover:bg-sage"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M6 6h15l-1.5 9h-12L6 6Zm0 0L5 3H2"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="9" cy="20" r="1.4" fill="currentColor" />
                <circle cx="17" cy="20" r="1.4" fill="currentColor" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-ember px-1 text-[0.7rem] font-semibold text-white">
                  {itemCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle menu"
              className="flex h-11 w-11 items-center justify-center rounded-full text-ink hover:bg-sage md:hidden"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div
        id="mobile-menu"
        className="grid overflow-hidden transition-[grid-template-rows] duration-200 ease-out-quart md:hidden"
        style={{ gridTemplateRows: mobileOpen ? "1fr" : "0fr" }}
      >
        <div className="min-h-0">
          <nav
            className="flex flex-col border-t border-line px-5 pb-3"
            aria-label="Mobile"
            {...(mobileOpen ? {} : { inert: true })}
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex min-h-12 items-center text-base font-medium text-ink"
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
