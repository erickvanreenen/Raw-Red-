import Image from "next/image";
import { Icon } from "./Icons";

export function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <Image
        className="hero-banner photo"
        src="/images/farm-golden-hour.jpg"
        width={2000}
        height={1500}
        sizes="100vw"
        priority
        alt="Rooibos bushes in golden evening light, a flat-topped cliff on the horizon"
      />
      <div className="wrap hero-body">
        <div>
          <h1 className="t-display" id="hero-title" tabIndex={-1}>
            Steeped <em>raw</em>, not stripped down.
          </h1>
          <p className="t-lead">
            Unpasteurised rooibos from a small family farm. Hand-harvested, sun-dried, and left alone.
          </p>
        </div>
        <div className="cta-row">
          <a className="btn btn-primary btn-lg" href="/#shop" data-event="shop_click" data-source="hero">
            Shop the rooibos<Icon name="arrow" />
          </a>
          <a className="link" href="/#story" data-event="story_click" data-source="hero">
            See our story<Icon name="arrow" />
          </a>
        </div>
      </div>
    </section>
  );
}
