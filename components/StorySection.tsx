import Image from "next/image";

export function StorySection() {
  return (
    <section id="story" className="bg-white py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
          <Image
            src="https://images.unsplash.com/photo-1433704334812-6c45b0b8784d?auto=format&fit=crop&w=1400&q=80"
            alt="A farmer harvesting leaves by hand in an open field at golden hour"
            fill
            sizes="(min-width: 1024px) 560px, 100vw"
            className="object-cover"
          />
        </div>

        <div>
          <p className="font-sans text-xs font-medium uppercase tracking-[0.1em] text-rooibos-red">
            Our story
          </p>
          <h2 className="mt-3 font-sans text-2xl font-medium leading-[1.15] text-ink sm:text-3xl">
            Two sisters, one farm, no shortcuts.
          </h2>
          <p className="mt-5 max-w-[65ch] text-base leading-[1.65] text-ink/90">
            Rooibos is usually pasteurised after harvest to extend shelf life
            and even out the colour. It&apos;s a fine process, but it also
            softens the leaf&apos;s natural antioxidants and flattens the
            flavour into something more uniform. We skip that step. What you
            get is closer to what came off the bush: a little more variation
            batch to batch, and a lot more character in the cup.
          </p>
          <p className="mt-4 max-w-[65ch] text-base leading-[1.65] text-ink/90">
            We&apos;re a two-person operation. One of us runs the fields, the
            other runs everything after the harvest. Every bag is still
            weighed and packed by hand.
          </p>
        </div>
      </div>
    </section>
  );
}
