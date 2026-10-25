"use client";

import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { useContactSheet } from "@/lib/contact-sheet-context";
import { useAddToCart, usePack } from "@/lib/pack-context";
import { MAX_QTY, formatPrice, rawRooibos } from "@/lib/products";
import { announce, useFlash } from "@/lib/ui";
import { Icon } from "./Icons";

export function ProductSection() {
  const { packId, setPackId } = usePack();
  const { openCart } = useCart();
  const { openContactSheet } = useContactSheet();
  const addToCart = useAddToCart();
  const added = useFlash();
  const [qty, setQty] = useState(1);
  const [limitShown, setLimitShown] = useState(false);
  const pack = rawRooibos.sizes.find((s) => s.id === packId) ?? rawRooibos.sizes[1];

  function step(delta: number) {
    const next = qty + delta;
    if (next < 1) {
      announce("Minimum is 1");
      return;
    }
    if (next > MAX_QTY) {
      setLimitShown(true);
      announce("Need more? Ask about bulk");
      return;
    }
    setQty(next);
    setLimitShown(next === MAX_QTY);
    if (next === MAX_QTY) announce("Need more? Ask about bulk");
  }

  return (
    <section className="section" id="shop" aria-labelledby="shop-title">
      <div className="wrap">
        <div className="shop-grid">
          <div className="panel buybox" id="buybox">
            <h2 className="t-title" id="shop-title" tabIndex={-1}>{rawRooibos.name}</h2>
            <p className="tagline">{rawRooibos.tagline}</p>
            <p className="secondary">{rawRooibos.description}</p>
            <p className="price-row">
              <span className="price">{formatPrice(pack.price)}</span>
              <span className="secondary">per {pack.label} pack</span>
            </p>
            <fieldset>
              <legend className="t-label">Pack size</legend>
              <div className="sizes">
                {rawRooibos.sizes.map((size) => (
                  <label className="size" key={size.id}>
                    <input
                      type="radio"
                      name="pack"
                      value={size.id}
                      checked={size.id === pack.id}
                      onChange={() => setPackId(size.id)}
                    />
                    <span className="size-name">{size.label}</span>
                    <span className="size-price">{formatPrice(size.price)}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <p className="delivery-line">
              <Icon name="truck" />
              <span>Delivered in South Africa in 2 to 4 working days. Delivery cost shown at checkout.</span>
            </p>
            <div className="commit">
              <div className="stepper" role="group" aria-label="Quantity">
                <button type="button" onClick={() => step(-1)} aria-label="Decrease quantity">−</button>
                <output aria-live="polite">{qty}</output>
                <button type="button" onClick={() => step(1)} aria-label="Increase quantity">+</button>
              </div>
              <button
                type="button"
                className="btn btn-primary btn-lg"
                data-event="add_to_cart"
                data-source="buybox"
                onClick={() => {
                  if (addToCart(pack.id, qty) > 0) added.show();
                }}
              >
                Add to cart · {formatPrice(pack.price * qty)}
                <Icon name="arrow" />
              </button>
            </div>
            {limitShown && (
              <p className="limit">
                <span>Need more?</span>
                <button
                  type="button"
                  className="link link-sm"
                  data-event="bulk_open"
                  data-source="buybox_limit"
                  onClick={openContactSheet}
                >
                  Ask about bulk<Icon name="arrow" />
                </button>
              </p>
            )}
            {added.visible && (
              <div className="added" ref={added.ref}>
                <Icon name="check" className="icon check" />
                <span>Added to your cart.</span>
                <button type="button" className="link link-sm" onClick={openCart}>
                  View cart<Icon name="arrow" />
                </button>
              </div>
            )}
          </div>
          <Image
            className="shop-photo photo"
            src="/images/rows-red-soil-sky.jpg"
            width={2000}
            height={1500}
            sizes="(min-width: 768px) 50vw, 100vw"
            alt="Rows of rooibos bushes on red soil under a wide sky, a flat-topped cliff in the distance"
          />
        </div>
        <dl className="panel details">
          {rawRooibos.details.map((detail) => (
            <div key={detail.label}>
              <dt>{detail.label}</dt>
              <dd>{detail.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
