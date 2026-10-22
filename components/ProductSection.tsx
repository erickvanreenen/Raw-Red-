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
  const total = selectedSize.price * quantity;

  function handleAdd() {
    addItem(selectedSize, quantity);
    setConfirmed(true);
    setQuantity(1);
  }

  return (
    <section id="product">
      <div className="mx-auto max-w-[1200px] px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
        {/* Photo and buy box side by side; the photo fills the box height */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-panel lg:aspect-auto lg:min-h-[420px]">
            <Image
              src="/images/rows-red-soil-sky.jpg"
              alt="Rows of rooibos bushes on red soil under a wide sky, a flat-topped cliff in the distance"
              fill
              sizes="(min-width: 1024px) 560px, 100vw"
              className="object-cover"
            />
          </div>

          <div className="rounded-panel bg-paper p-6 sm:p-8">
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-medium leading-[1.05] tracking-[-0.03em]">
              {rawRooibos.name}
            </h2>
            <p className="mt-1.5 text-base font-semibold text-ember">
              {rawRooibos.tagline}
            </p>
            <p className="mt-3 text-[0.9375rem] leading-[1.6] text-ink-soft">
              {rawRooibos.description}
            </p>

            <div className="mt-5 flex items-baseline gap-2.5">
              <span className="font-display text-[2.5rem] font-semibold leading-none tracking-[-0.03em]">
                {formatPrice(selectedSize.price)}
              </span>
              <span className="text-base text-ink-soft">
                per {selectedSize.label} pack
              </span>
            </div>

            <div className="mt-4">
              <span className="t-label mb-2 block">Pack size</span>
              <SizeSelector
                sizes={rawRooibos.sizes}
                selectedId={selectedId}
                onSelect={setSelectedId}
              />
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
              <div
                className="inline-flex shrink-0 items-center self-start rounded-full border-[1.5px] border-edge"
                role="group"
                aria-label="Quantity"
              >
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

              <button
                type="button"
                onClick={handleAdd}
                className="btn btn-primary min-h-14 flex-1 text-[1.0625rem]"
              >
                {confirmed ? "Added to cart" : `Add to cart · ${formatPrice(total)}`}
              </button>
            </div>
            <p className="sr-only" role="status" aria-live="polite">
              {confirmed
                ? `Added ${quantity} × ${selectedSize.label} to your cart`
                : ""}
            </p>
          </div>
        </div>

        {/* Details and bulk enquiry, each in a white container */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[2fr_1fr]">
          <dl className="grid gap-6 rounded-panel bg-paper p-6 sm:grid-cols-3 sm:p-8">
            {rawRooibos.details.map((detail) => (
              <div key={detail.label}>
                <dt className="t-label">{detail.label}</dt>
                <dd className="mt-1.5 text-[0.9375rem] leading-[1.6] text-ink-soft">
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
