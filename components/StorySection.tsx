import Image from "next/image";

export function StorySection() {
  return (
    <section className="section" id="story" aria-labelledby="story-title">
      <div className="wrap story-grid">
        <Image
          className="story-photo photo"
          src="/images/field-rows-cliffs.jpg"
          width={1032}
          height={774}
          sizes="(min-width: 1024px) 45vw, (min-width: 768px) 50vw, 100vw"
          alt="Rows of rooibos on the farm with a flat-topped cliff behind"
        />
        <div className="panel story-text">
          <h2 className="t-headline" id="story-title" tabIndex={-1}>
            Two sisters, one farm, no shortcuts.
          </h2>
          <p className="measure">
            Rooibos is usually pasteurised after harvest to extend shelf life and even out the colour.
            It&apos;s a fine process, but it also softens the leaf&apos;s natural antioxidants and
            flattens the flavour into something more uniform. We skip that step. What you get is closer
            to what came off the bush: a little more variation batch to batch, and a lot more character
            in the cup.
          </p>
          <p className="measure">
            We&apos;re a two-person operation. One of us runs the fields, the other runs everything
            after the harvest. Every bag is still weighed and packed by hand.
          </p>
        </div>
      </div>
    </section>
  );
}
