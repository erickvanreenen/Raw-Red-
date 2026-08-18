"use client";

import { type TeaSize, formatPrice } from "@/lib/products";

interface SizeSelectorProps {
  sizes: TeaSize[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function SizeSelector({ sizes, selectedId, onSelect }: SizeSelectorProps) {
  return (
    <div className="flex gap-2" role="radiogroup" aria-label="Pack size">
      {sizes.map((size) => {
        const selected = size.id === selectedId;
        return (
          <button
            key={size.id}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onSelect(size.id)}
            className={`flex min-h-12 flex-1 flex-col items-center justify-center gap-0.5 rounded-md border px-3 py-3 font-sans text-xs font-medium uppercase tracking-[0.1em] transition-[background-color,border-color,color,transform] duration-150 ease-out-quart active:scale-[0.96] ${
              selected
                ? "border-rooibos-red bg-rooibos-red text-cream"
                : "border-sand bg-white text-ink hover:border-rooibos-red"
            }`}
          >
            <span>{size.label}</span>
            <span className="text-[0.7rem] normal-case tracking-normal opacity-80">
              {formatPrice(size.price)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
