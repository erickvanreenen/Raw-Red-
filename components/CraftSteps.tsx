import Image from "next/image";

const steps = [
  {
    title: "Harvested by hand",
    line: "Cut on our family farm, row by row.",
    src: "/images/bale-in-field.jpg",
    width: 1200,
    height: 1600,
    alt: "A freshly cut bale of rooibos in a woven sack in the field, mountains behind",
  },
  {
    title: "Dried in the sun",
    line: "Left to dry in the open air.",
    src: "/images/drying-yard-red.jpg",
    width: 1152,
    height: 864,
    alt: "Red rooibos leaf drying in the sun on a concrete yard",
  },
  {
    title: "Packed by hand",
    line: "Every bag weighed and packed by the two of us.",
    src: "/images/harvest-shed.jpg",
    width: 1200,
    height: 1600,
    alt: "Cut rooibos piled in woven sacks inside a shed",
  },
];

export function CraftSteps() {
  return (
    <section className="section" aria-labelledby="steps-title">
      <div className="wrap">
        <h2 className="t-headline section-head" id="steps-title">From the bush to your cup</h2>
        <ol className="steps">
          {steps.map((step) => (
            <li className="step" key={step.title}>
              <Image
                className="photo"
                src={step.src}
                width={step.width}
                height={step.height}
                sizes="(min-width: 768px) 33vw, 112px"
                alt={step.alt}
              />
              <div>
                <h3>{step.title}</h3>
                <p>{step.line}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
