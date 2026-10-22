import Image from "next/image";

const farmPhotos = [
  {
    src: "/images/field-rows-cliffs.jpg",
    alt: "Rows of rooibos in the field with a flat-topped cliff behind",
    caption: "Rows on the farm",
  },
  {
    src: "/images/harvest-shed.jpg",
    alt: "Cut rooibos piled in woven sacks inside a shed",
    caption: "Cut and bagged",
  },
  {
    src: "/images/drying-yard-red.jpg",
    alt: "Red rooibos leaf drying in the sun on a concrete floor",
    caption: "Drying in the sun",
  },
];

export function StorySection() {
  return (
    <section id="story" className="bg-paper py-16 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-panel">
            <Image
              src="/images/bale-in-field.jpg"
              alt="A freshly cut bale of rooibos standing in a woven sack in the field, mountains behind"
              fill
              sizes="(min-width: 1024px) 540px, 100vw"
              className="object-cover"
            />
          </div>

          <div>
            <p className="t-label text-ember">Our story</p>
            <h2 className="t-headline mt-3">
              Two sisters, one farm, no shortcuts.
            </h2>
            <p className="mt-5 max-w-[60ch] text-base leading-[1.65] text-ink">
              Rooibos is usually pasteurised after harvest to extend shelf life
              and even out the colour. It&apos;s a fine process, but it also
              softens the leaf&apos;s natural antioxidants and flattens the
              flavour into something more uniform. We skip that step. What you
              get is closer to what came off the bush: a little more variation
              batch to batch, and a lot more character in the cup.
            </p>
            <p className="mt-4 max-w-[60ch] text-base leading-[1.65] text-ink">
              We&apos;re a two-person operation. One of us runs the fields, the
              other runs everything after the harvest. Every bag is still
              weighed and packed by hand.
            </p>
          </div>
        </div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-3">
          {farmPhotos.map((photo) => (
            <li key={photo.src}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-card">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 640px) 380px, 100vw"
                  className="object-cover"
                />
              </div>
              <p className="mt-3 text-[0.9375rem] font-medium text-ink-soft">
                {photo.caption}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
