export function Footer() {
  return (
    <footer className="border-t border-sand bg-white py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2 text-ink">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logomark.svg" alt="" width={24} height={24} />
          <span className="font-sans text-xs font-medium uppercase tracking-[0.33em]">
            Raw Red
          </span>
        </div>

        <p className="font-sans text-xs leading-relaxed text-ink/70">
          Organic, unpasteurised rooibos. Family-farmed, hand-packed.
        </p>

        <p className="font-sans text-xs text-ink/60">
          &copy; {new Date().getFullYear()} Raw Red. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
