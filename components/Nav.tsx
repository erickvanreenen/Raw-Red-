"use client";

import { useEffect, useRef, useState } from "react";
import { useCart } from "@/lib/cart-context";
import { Icon } from "./Icons";

const links = [
  { href: "/#shop", label: "Shop" },
  { href: "/#story", label: "Our story" },
  { href: "/#bulk", label: "Bulk orders" },
  { href: "/#faq", label: "FAQ" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount, openCart } = useCart();
  const headerRef = useRef<HTMLElement>(null);
  const stripRef = useRef<HTMLParagraphElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    // The header sticks at minus the strip's height, so the strip scrolls away.
    function measureStrip() {
      if (headerRef.current && stripRef.current) {
        headerRef.current.style.setProperty("--strip-height", `${stripRef.current.offsetHeight}px`);
      }
    }
    onScroll();
    measureStrip();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measureStrip);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measureStrip);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    navRef.current?.querySelector("a")?.focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMenuOpen(false);
        menuBtnRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <header ref={headerRef} className={`site-header${scrolled ? " is-scrolled" : ""}`}>
        <p ref={stripRef} className="strip">Delivered across South Africa in 2 to 4 working days</p>
        <div className="wrap header-inner">
          <a className="brand" href="/#top">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logomark.svg" alt="" width={36} height={36} />
            <span>Raw Rooibos</span>
          </a>
          <nav ref={navRef} id="main-nav" className={`nav${menuOpen ? " is-open" : ""}`} aria-label="Main">
            <ul>
              {links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <button
            type="button"
            className="cart-btn"
            onClick={openCart}
            aria-label={`Cart, ${itemCount} item${itemCount === 1 ? "" : "s"}`}
          >
            <Icon name="cart" />
            {itemCount > 0 && <span className="badge" aria-hidden="true">{itemCount}</span>}
          </button>
          <button
            ref={menuBtnRef}
            type="button"
            className="menu-btn"
            aria-expanded={menuOpen}
            aria-controls="main-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            Menu
          </button>
          <a className="btn btn-primary header-cta" href="/#shop" data-event="shop_click" data-source="header">
            Shop the rooibos<Icon name="arrow" />
          </a>
        </div>
      </header>
    </>
  );
}
