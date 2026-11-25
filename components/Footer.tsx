import { rawRooibos } from "@/lib/products";

const links = [
  { href: "/#shop", label: "Shop" },
  { href: "/#story", label: "Our story" },
  { href: "/#bulk", label: "Bulk orders" },
  { href: "/#faq", label: "FAQ" },
];

export function Footer() {
  return (
    <footer className="site-footer on-inverse">
      <div className="wrap footer-grid">
        <div>
          <a className="brand" href="/#top">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logomark.svg" alt="" width={36} height={36} />
            <span>Raw Rooibos</span>
          </a>
          <p className="footer-tag">Unpasteurised rooibos. Family-farmed, hand-packed.</p>
        </div>
        <nav aria-label="Footer">
          <ul>
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <a className="footer-mail" href={`mailto:${rawRooibos.bulkContactEmail}`}>
            {rawRooibos.bulkContactEmail}
          </a>
          <p className="footer-legal">© 2026 Raw Rooibos. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
