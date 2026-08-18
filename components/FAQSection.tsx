const faqs = [
  {
    q: "What does \"unpasteurised\" actually change?",
    a: "Pasteurising rooibos after harvest is standard practice: it kills bacteria and gives every batch a uniform reddish colour. It also mellows the antioxidant content and the flavour. We skip it, so the leaf keeps more of its natural character. Batches can vary slightly in colour and taste for the same reason.",
  },
  {
    q: "Is it caffeine-free?",
    a: "Yes, naturally, not decaffeinated. Rooibos doesn't contain caffeine to begin with, so it's safe to drink any time of day.",
  },
  {
    q: "How should I store it?",
    a: "Keep it sealed, away from direct sunlight and heat. Loose leaf keeps well for 18-24 months, though the flavour is at its best within the first year.",
  },
  {
    q: "Where do you ship?",
    a: "Currently within South Africa. Delivery usually takes 2-4 working days. Shipping costs are calculated at checkout based on your address.",
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="font-sans text-2xl font-medium leading-[1.15] text-ink sm:text-3xl">
          Questions people ask before their first order
        </h2>
        <div className="mt-8 divide-y divide-sand border-y border-sand">
          {faqs.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-sans text-base font-medium text-ink marker:content-none">
                {item.q}
                <span
                  aria-hidden="true"
                  className="shrink-0 text-lg text-rooibos-red transition-transform duration-200 ease-out-quart group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-[65ch] text-base leading-[1.65] text-ink/90">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
