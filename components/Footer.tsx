const links = [
  { href: "/#product", label: "Shop" },
  { href: "/#story", label: "Our story" },
  { href: "/#faq", label: "FAQ" },
];

export function Footer() {
  return (
    <footer className="bg-deep text-white">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-8 px-5 py-12 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
        <div>
          <div className="flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logomark.svg" alt="" width={32} height={32} />
            <span className="font-display text-xl font-semibold tracking-[-0.02em]">
              Raw Rooibos
            </span>
          </div>
          <p className="mt-3 max-w-[36ch] text-[0.9375rem] text-white/80">
            Unpasteurised rooibos. Family-farmed, hand-packed.
          </p>
        </div>

        <nav aria-label="Footer" className="flex gap-6">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="inline-flex min-h-11 min-w-11 items-center justify-center text-[0.9375rem] font-medium text-white underline-offset-4 hover:underline focus-visible:outline-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <p className="text-sm text-white/70">
          &copy; {new Date().getFullYear()} Raw Rooibos. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
