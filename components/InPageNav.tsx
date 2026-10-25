"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { goTo } from "@/lib/ui";

// On the homepage, "/#section" and "#section" links scroll to the section and focus its heading.
// Elsewhere (checkout) they navigate normally.
export function InPageNav() {
  const pathname = usePathname();
  const { isOpen, closeCart } = useCart();

  useEffect(() => {
    if (pathname !== "/") return;
    function onClick(e: MouseEvent) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const a = (e.target as Element).closest<HTMLAnchorElement>('a[href^="/#"], a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href")!.split("#")[1];
      if (!id || !document.getElementById(id)) return;
      e.preventDefault();
      if (isOpen) {
        closeCart();
        window.setTimeout(() => goTo(id), 200);
      } else {
        goTo(id);
      }
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [pathname, isOpen, closeCart]);

  return null;
}
