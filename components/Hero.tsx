import Image from "next/image";

export function Hero() {
  return (
    <section id="top">
      {/* Edge-to-edge banner photo */}
      <div className="relative aspect-[4/3] max-h-[70svh] w-full overflow-hidden bg-sage sm:aspect-[16/9] lg:aspect-[21/9]">
        <Image
          src="/images/farm-golden-hour.jpg"
          alt="Rooibos bushes in golden morning light, a flat-topped cliff on the horizon"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_80%]"
        />
      </div>

      {/* Headline beneath, call to action inline on the right */}
      <div className="mx-auto flex max-w-[1200px] flex-col gap-8 px-5 pb-16 pt-10 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12 lg:px-10 lg:pb-24 lg:pt-14">
        <div>
          <h1 className="t-display reveal max-w-[16ch] text-ink">
            Steeped <span className="text-ember">raw</span>, not stripped down.
          </h1>
          <p
            className="t-lead reveal mt-6 max-w-[46ch]"
            style={{ animationDelay: "80ms" }}
          >
            Unpasteurised rooibos from a small family farm.
            Hand-harvested, sun-dried, and left alone.
          </p>
        </div>

        <div
          className="reveal flex shrink-0 flex-col gap-3 sm:flex-row"
          style={{ animationDelay: "160ms" }}
        >
          <a href="/#product" className="btn btn-primary">
            Shop the rooibos
          </a>
          <a href="/#story" className="btn btn-secondary">
            Our story
          </a>
        </div>
      </div>
    </section>
  );
}
