const faqs = [
  {
    q: "What does unpasteurised actually change?",
    a: "Pasteurising rooibos after harvest is standard practice. It reduces bacteria on the leaf and evens out the colour from batch to batch. We skip that step so the leaf keeps more of its natural character, which is why our batches can vary a little in colour and taste. Always brew it with freshly boiled water.",
  },
  {
    q: "Is it caffeine-free?",
    a: "Yes, naturally, not decaffeinated. Rooibos doesn't contain caffeine to begin with, so it's safe to drink any time of day.",
  },
  {
    q: "How should I store it?",
    a: "Keep it sealed, away from sunlight and heat. It keeps for 18 to 24 months and tastes best in the first year.",
  },
  {
    q: "Where do you deliver?",
    a: "Anywhere in South Africa, usually in 2 to 4 working days. You'll see the delivery cost at checkout, based on your address.",
  },
];

export function FAQSection() {
  return (
    <section className="section" id="faq" aria-labelledby="faq-title">
      <div className="wrap">
        <div className="faq">
          <h2 className="t-headline section-head" id="faq-title" tabIndex={-1}>
            Questions people ask before their first order
          </h2>
          <div className="faq-list">
            {faqs.map((item) => (
              <details key={item.q}>
                <summary>
                  {item.q}
                  <span className="pm" aria-hidden="true" />
                </summary>
                <p className="answer">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
