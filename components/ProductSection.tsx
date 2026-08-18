"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { SizeSelector } from "./SizeSelector";
import { BulkOrderCallout } from "./BulkOrderCallout";
import { useCart, rawRedRooibos } from "@/lib/cart-context";
import { formatPrice } from "@/lib/products";

export function ProductSection() {
  const { addItem, lastSizeId } = useCart();
  const [selectedId, setSelectedId] = useState(rawRedRooibos.sizes[1].id);
  const [quantity, setQuantity] = useState(1);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (lastSizeId && rawRedRooibos.sizes.some((s) => s.id === lastSizeId)) {
      setSelectedId(lastSizeId);
    }
  }, [lastSizeId]);

  useEffect(() => {
    if (!confirmed) return;
    const timer = setTimeout(() => setConfirmed(false), 2000);
    return () => clearTimeout(timer);
  }, [confirmed]);

  const selectedSize = rawRedRooibos.sizes.find((s) => s.id === selectedId)!;

  function handleAdd() {
    addItem(selectedSize, quantity);
    setConfirmed(true);
    setQuantity(1);
  }

  return (
    <section id="product" className="bg-sand py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg lg:aspect-auto">
          <Image
            src="https://images.unsplash.com/photo-1643606245626-3bb927ea8619?auto=format&fit=crop&w=1400&q=80"
            alt="A wooden spoon full of loose rooibos tea beside a cup"
            fill
            sizes="(min-width: 1024px) 560px, 100vw"
            className="object-cover"
          />
        </div>

        <div>
          <h2 className="font-sans text-2xl font-medium leading-[1.15] text-ink sm:text-3xl">
            {rawRedRooibos.name}
          </h2>
          <p className="mt-1 font-sans text-xs font-medium uppercase tracking-[0.1em] text-rooibos-red">
            {rawRedRooibos.tagline}
          </p>
          <p className="mt-5 max-w-[65ch] text-base leading-[1.65] text-ink/90">
            {rawRedRooibos.description}
          </p>

          {/* Unified buy box: price, size, quantity, and the CTA all live in one block */}
          <div className="mt-8 rounded-lg bg-white p-6">
            <div className="flex items-baseline gap-2">
              <span className="font-sans text-3xl font-medium text-rooibos-red">
                {formatPrice(selectedSize.price)}
              </span>
              <span className="font-sans text-sm text-ink/60">
                per {selectedSize.label} pack
              </span>
            </div>

            <div className="mt-6">
              <span className="mb-2 block font-sans text-xs font-medium uppercase tracking-[0.1em] text-ink">
                Pack size
              </span>
              <SizeSelector
                sizes={rawRedRooibos.sizes}
                selectedId={selectedId}
                onSelect={setSelectedId}
              />
            </div>

            <div className="mt-6 flex items-center justify-between">
              <div>
                <span className="mb-2 block font-sans text-xs font-medium uppercase tracking-[0.1em] text-ink">
                  Quantity
                </span>
                <div className="flex items-center rounded-md border border-sand">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                    className="flex h-12 w-12 items-center justify-center text-ink transition-colors duration-150 ease-out-quart hover:bg-sand disabled:opacity-30 disabled:hover:bg-transparent"
                  >
                    −
                  </button>
                  <span
                    className="w-8 text-center font-sans text-sm tabular-nums"
                    aria-live="polite"
                  >
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(9, q + 1))}
                    aria-label="Increase quantity"
                    className="flex h-12 w-12 items-center justify-center text-ink transition-colors duration-150 ease-out-quart hover:bg-sand"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="text-right">
                <span className="block font-sans text-xs font-medium uppercase tracking-[0.1em] text-ink/60">
                  Subtotal
                </span>
                <span className="font-sans text-lg font-medium text-ink">
                  {formatPrice(selectedSize.price * quantity)}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              className="mt-6 flex min-h-12 w-full items-center justify-center rounded-md bg-rooibos-red px-8 font-sans text-xs font-medium uppercase tracking-[0.1em] text-cream transition-[background-color,transform] duration-180 ease-out-quart hover:bg-deep-russet active:scale-[0.97]"
            >
              {confirmed ? "Added to cart" : "Add to cart"}
            </button>
          </div>
          <p className="sr-only" role="status" aria-live="polite">
            {confirmed
              ? `Added ${quantity} × ${selectedSize.label} to your cart`
              : ""}
          </p>

          <dl className="mt-10 flex flex-col gap-5 border-t border-ink/10 pt-8">
            {rawRedRooibos.details.map((detail) => (
              <div key={detail.label}>
                <dt className="font-sans text-xs font-medium uppercase tracking-[0.1em] text-ink">
                  {detail.label}
                </dt>
                <dd className="mt-1.5 max-w-[65ch] text-sm leading-[1.65] text-ink/80">
                  {detail.value}
                </dd>
              </div>
            ))}
          </dl>

          <BulkOrderCallout />
        </div>
      </div>
    </section>
  );
}
