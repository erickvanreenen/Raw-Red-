"use client";

import { type TeaSize, formatPrice } from "@/lib/products";

interface SizeSelectorProps {
  sizes: TeaSize[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function SizeSelector({ sizes, selectedId, onSelect }: SizeSelectorProps) {
  return (
    <div className="grid grid-cols-3 gap-2.5" role="radiogroup" aria-label="Pack size">
      {sizes.map((size) => {
        const selected = size.id === selectedId;
        return (
          <button
            key={size.id}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onSelect(size.id)}
            className={`flex min-h-14 flex-col items-center justify-center gap-0.5 rounded-full border-[1.5px] px-3 py-2 text-base font-semibold leading-tight transition-[background-color,border-color,color,transform] duration-200 ease-out-quart active:scale-[0.97] ${
              selected
                ? "border-deep bg-deep text-white"
                : "border-edge bg-paper text-ink hover:border-deep"
            }`}
          >
            <span>{size.label}</span>
            <span className="text-[0.8125rem] font-medium opacity-90">
              {formatPrice(size.price)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
