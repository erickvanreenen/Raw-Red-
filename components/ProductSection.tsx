"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { SizeSelector } from "./SizeSelector";
import { BulkOrderCallout } from "./BulkOrderCallout";
import { useCart, rawRooibos } from "@/lib/cart-context";
import { formatPrice } from "@/lib/products";

export function ProductSection() {
  const { addItem, lastSizeId } = useCart();
  const [selectedId, setSelectedId] = useState(rawRooibos.sizes[1].id);
  const [quantity, setQuantity] = useState(1);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (lastSizeId && rawRooibos.sizes.some((s) => s.id === lastSizeId)) {
      setSelectedId(lastSizeId);
    }
  }, [lastSizeId]);

  useEffect(() => {
    if (!confirmed) return;
    const timer = setTimeout(() => setConfirmed(false), 2000);
    return () => clearTimeout(timer);
  }, [confirmed]);

  const selectedSize = rawRooibos.sizes.find((s) => s.id === selectedId)!;

  function handleAdd() {
    addItem(selectedSize, quantity);
    setConfirmed(true);
    setQuantity(1);
  }

  return (
    <section id="product" className="px-3 pb-6 sm:px-6">
      <div className="mx-auto max-w-[1280px] rounded-section bg-sage">
        <div className="mx-auto grid max-w-[1200px] gap-10 px-5 py-12 sm:px-8 lg:grid-cols-2 lg:gap-14 lg:px-10 lg:py-16">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-panel lg:sticky lg:top-24 lg:self-start">
            <Image
              src="/images/rows-red-soil-sky.jpg"
              alt="Rows of rooibos bushes on red soil under a wide sky, a flat-topped cliff in the distance"
              fill
              sizes="(min-width: 1024px) 540px, 100vw"
              className="object-cover"
            />
          </div>

          <div>
            <h2 className="t-headline">{rawRooibos.name}</h2>
            <p className="mt-2 text-base font-semibold text-ember">
              {rawRooibos.tagline}
            </p>
            <p className="mt-4 max-w-[60ch] text-base leading-[1.65] text-ink">
              {rawRooibos.description}
            </p>

            {/* Buy box: price, size, quantity and the CTA live in one panel */}
            <div className="mt-8 rounded-panel bg-paper p-6 sm:p-8">
              <div className="flex items-baseline gap-2.5">
                <span className="font-display text-[2.75rem] font-semibold leading-none tracking-[-0.03em] text-ink">
                  {formatPrice(selectedSize.price)}
                </span>
                <span className="text-base text-ink-soft">
                  per {selectedSize.label} pack
                </span>
              </div>

              <div className="mt-6">
                <span className="t-label mb-2 block">Pack size</span>
                <SizeSelector
                  sizes={rawRooibos.sizes}
                  selectedId={selectedId}
                  onSelect={setSelectedId}
                />
              </div>

              <div className="mt-6 flex items-end justify-between">
                <div>
                  <span className="t-label mb-2 block">Quantity</span>
                  <div className="inline-flex items-center rounded-full border-[1.5px] border-edge">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      disabled={quantity <= 1}
                      aria-label="Decrease quantity"
                      className="flex h-12 w-12 items-center justify-center rounded-full text-xl text-ink transition-colors duration-150 ease-out-quart hover:bg-sage disabled:opacity-40 disabled:hover:bg-transparent"
                    >
                      −
                    </button>
                    <span
                      className="w-8 text-center text-base font-semibold tabular-nums"
                      aria-live="polite"
                    >
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.min(9, q + 1))}
                      aria-label="Increase quantity"
                      className="flex h-12 w-12 items-center justify-center rounded-full text-xl text-ink transition-colors duration-150 ease-out-quart hover:bg-sage"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <span className="t-label block text-ink-soft">Subtotal</span>
                  <span className="text-xl font-semibold">
                    {formatPrice(selectedSize.price * quantity)}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className="btn btn-primary mt-6 min-h-14 w-full text-[1.0625rem]"
              >
                {confirmed ? "Added to cart" : "Add to cart"}
              </button>
            </div>
            <p className="sr-only" role="status" aria-live="polite">
              {confirmed
                ? `Added ${quantity} × ${selectedSize.label} to your cart`
                : ""}
            </p>

            <dl className="mt-10 flex flex-col gap-5 border-t border-deep/20 pt-8">
              {rawRooibos.details.map((detail) => (
                <div key={detail.label}>
                  <dt className="t-label">{detail.label}</dt>
                  <dd className="mt-1 max-w-[60ch] text-[0.9375rem] leading-[1.65] text-ink">
                    {detail.value}
                  </dd>
                </div>
              ))}
            </dl>

            <BulkOrderCallout />
          </div>
        </div>
      </div>
    </section>
  );
}
