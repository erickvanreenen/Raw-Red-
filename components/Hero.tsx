import Image from "next/image";

export function Hero() {
  return (
    <section id="top" className="bg-paper">
      <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-5 pb-16 pt-6 sm:px-8 lg:grid-cols-[1fr_1fr] lg:gap-14 lg:px-10 lg:pb-24 lg:pt-10">
        <div>
          <h1 className="t-display reveal text-ink">
            Steeped <span className="text-ember">raw</span>, not stripped down.
          </h1>
          <p
            className="t-lead reveal mt-6 max-w-[46ch]"
            style={{ animationDelay: "80ms" }}
          >
            Organic, unpasteurised rooibos from a small family farm.
            Hand-harvested, sun-dried, and left alone.
          </p>
          <div
            className="reveal mt-8 flex flex-col gap-3 sm:flex-row"
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

        <div
          className="reveal relative aspect-[4/3] w-full overflow-hidden rounded-panel bg-sage"
          style={{ animationDelay: "120ms" }}
        >
          <Image
            src="/images/farm-golden-hour.jpg"
            alt="Rooibos bushes in golden morning light, a flat-topped cliff on the horizon"
            fill
            priority
            sizes="(min-width: 1024px) 560px, 100vw"
            className="origin-bottom scale-[1.45] object-cover object-bottom"
          />
        </div>
      </div>
    </section>
  );
}
