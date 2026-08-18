import Image from "next/image";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-white">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-20 lg:grid-cols-2 lg:py-28">
        <div className="order-2 lg:order-1">
          <p className="reveal font-sans text-xs font-medium uppercase tracking-[0.1em] text-rooibos-red">
            Organic Rooibos
          </p>
          <h1
            className="reveal mt-3 font-sans text-4xl font-medium uppercase leading-[1.05] tracking-[0.04em] text-ink sm:text-5xl lg:text-6xl"
            style={{ animationDelay: "60ms" }}
          >
            Steeped raw,
            <br />
            not stripped down.
          </h1>
          <p
            className="reveal mt-6 max-w-[42ch] text-base leading-[1.65] text-ink/90"
            style={{ animationDelay: "120ms" }}
          >
            Most rooibos is pasteurised before it reaches your cup. Ours
            isn&apos;t. Hand-harvested, sun-dried, and left alone, the way a
            two-sister family farm has always made it.
          </p>
          <div
            className="reveal mt-8 flex flex-col gap-3 sm:flex-row"
            style={{ animationDelay: "180ms" }}
          >
            <a
              href="#product"
              className="inline-flex min-h-12 items-center justify-center rounded-md bg-rooibos-red px-8 font-sans text-xs font-medium uppercase tracking-[0.1em] text-cream transition-[background-color,transform] duration-180 ease-out-quart hover:bg-deep-russet active:scale-[0.97]"
            >
              Shop the rooibos
            </a>
            <a
              href="#story"
              className="inline-flex min-h-12 items-center justify-center rounded-md border border-sand px-8 font-sans text-xs font-medium uppercase tracking-[0.1em] text-ink transition-[background-color,transform] duration-180 ease-out-quart hover:bg-sand active:scale-[0.97]"
            >
              Our story
            </a>
          </div>
        </div>

        <div
          className="reveal order-1 lg:order-2"
          style={{ animationDelay: "90ms" }}
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
            <Image
              src="https://images.unsplash.com/photo-1606695980435-f0b57d051c2d?auto=format&fit=crop&w=1600&q=80"
              alt="Loose rooibos tea heaped in a round wooden bowl"
              fill
              priority
              sizes="(min-width: 1024px) 560px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
