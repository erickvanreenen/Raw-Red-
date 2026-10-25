"use client";

import { useEffect, useRef, useState } from "react";
import { useCart } from "@/lib/cart-context";
import { useContactSheet } from "@/lib/contact-sheet-context";
import { useAddToCart, usePack } from "@/lib/pack-context";
import { formatPrice, rawRooibos } from "@/lib/products";
import { useFlash } from "@/lib/ui";
import { Icon } from "./Icons";

// Phone buy bar (work/05-system/components/buy-bar.md): shown only when the hero and buy box are off screen,
// no dialog is open, the screen is tall enough and text isn't enlarged past 150%.
export function BuyBar() {
  const { packId, setPackId } = usePack();
  const { isOpen: cartOpen, openCart } = useCart();
  const { isOpen: sheetOpen } = useContactSheet();
  const addToCart = useAddToCart();
  const added = useFlash();
  const [show, setShow] = useState(false);
  const barRef = useRef<HTMLElement>(null);
  const pack = rawRooibos.sizes.find((s) => s.id === packId) ?? rawRooibos.sizes[1];

  useEffect(() => {
    function update() {
      const hero = document.getElementById("top");
      const box = document.getElementById("buybox");
      if (!hero || !box) return;
      const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
      const heroRect = hero.getBoundingClientRect();
      const boxRect = box.getBoundingClientRect();
      const heroVisible = heroRect.bottom > 0;
      const boxVisible = boxRect.top < window.innerHeight && boxRect.bottom > 0;
      setShow(
        window.matchMedia("(max-width: 767px)").matches &&
          !heroVisible &&
          !boxVisible &&
          !cartOpen &&
          !sheetOpen &&
          window.innerHeight >= 520 &&
          rem < 24
      );
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [cartOpen, sheetOpen]);

  // Keep the footer clear of the bar while it shows.
  useEffect(() => {
    document.body.style.paddingBottom = show && barRef.current ? `${barRef.current.offsetHeight}px` : "";
  }, [show, added.visible]);

  return (
    <aside ref={barRef} className="buybar on-inverse" aria-label="Quick add" hidden={!show}>
      {added.visible && (
        <div className="added" ref={added.ref}>
          <Icon name="check" className="icon check" />
          <span>Added to your cart.</span>
          <button type="button" className="link link-sm" onClick={openCart}>
            View cart<Icon name="arrow" />
          </button>
        </div>
      )}
      <div className="buybar-row">
        <label className="vh" htmlFor="bar-pack">Pack size</label>
        <select id="bar-pack" value={pack.id} onChange={(e) => setPackId(e.target.value)}>
          {rawRooibos.sizes.map((size) => (
            <option key={size.id} value={size.id}>
              {size.label} · {formatPrice(size.price)}
            </option>
          ))}
        </select>
        <button
          type="button"
          className="btn btn-primary"
          data-event="add_to_cart"
          data-source="buy_bar"
          onClick={() => {
            if (addToCart(pack.id, 1) > 0) added.show();
          }}
        >
          Add to cart · {formatPrice(pack.price)}
          <Icon name="arrow" />
        </button>
      </div>
    </aside>
  );
}
