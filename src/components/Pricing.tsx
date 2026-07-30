import Reveal from "./Reveal";
import ProductImage from "./ProductImage";
import TrustBadges from "./TrustBadges";
import BuyButton from "./BuyButton";
import { images, price, priceLabel, guarantees } from "@/lib/product";
import { shipping } from "@/lib/company";

export default function Pricing() {
  return (
    <section id="buy" className="section">
      <div className="container-x">
        <Reveal>
          <div className="card relative grid overflow-hidden lg:grid-cols-2">
            {/* vizuální strana – skutečná fotografie */}
            <div className="relative min-h-[22rem] lg:min-h-full">
              <ProductImage
                src={images.product1}
                alt="Stolní vysavač Cleaner"
                ratio="1 / 1"
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-full"
                imgClassName="transition-transform duration-[1.4s] ease-out hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
                <div className="absolute bottom-6 left-6 rounded-full bg-white/15 px-4 py-2 text-sm text-white backdrop-blur">
                  Skladem
                </div>
              </ProductImage>
            </div>

            {/* nabídková strana */}
            <div className="flex flex-col justify-center p-8 sm:p-12">
              <p className="eyebrow">Pořiďte si uklizený stůl</p>
              <h2 className="mt-4 font-display text-4xl leading-tight tracking-tight sm:text-5xl">
                Stolní vysavač Cleaner
              </h2>

              <div className="mt-6 flex items-end gap-3">
                <span className="font-display text-5xl tracking-tight">{priceLabel}</span>
                {/* TODO: původní cena – nastavte price.compareAt v src/lib/product.ts */}
                {price.compareAt && (
                  <span className="mb-1.5 text-lg text-faint line-through">
                    {price.compareAt} {price.currency}
                  </span>
                )}
                {price.note && (
                  <span className="mb-2 rounded-full bg-glow px-2.5 py-1 text-xs font-medium text-sage-deep">
                    {price.note}
                  </span>
                )}
              </div>

              {/* Souhrn objednávky — cena, doprava, celkem a dodání jasně viditelné */}
              <div className="mt-7 rounded-2xl border border-line-2 bg-surface/60 p-4 text-sm">
                <div className="flex items-center justify-between py-1">
                  <span className="text-muted">Produkt</span>
                  <span className="font-medium">{priceLabel}</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-muted">Doprava</span>
                  <span className="font-medium">{shipping.priceLabel}</span>
                </div>
                {/* TODO: je-li doprava placená, uveďte zde součet produkt + doprava */}
                <div className="mt-1 flex items-center justify-between border-t border-line-2 pt-2">
                  <span className="font-semibold">Celkem</span>
                  <span className="font-display text-lg">{priceLabel}</span>
                </div>
                <p className="mt-2 text-xs text-muted">
                  Konečná cena · dodání {shipping.deliveryDays}
                </p>
              </div>

              <ul className="mt-6 space-y-3">
                {guarantees.map((p) => (
                  <li key={p} className="flex items-center gap-3 text-[0.97rem]">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-sage text-white">
                      <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12l5 5L20 6" />
                      </svg>
                    </span>
                    {p}
                  </li>
                ))}
              </ul>

              <div className="mt-9 flex flex-wrap gap-3">
                <BuyButton variant="primary" className="flex-1 justify-center">
                  Přidat do košíku — {priceLabel}
                </BuyButton>
                <a href="#specs" className="btn btn-ghost">
                  Parametry
                </a>
              </div>
              <p className="mt-4 text-center text-xs text-muted sm:text-left">
                Bezpečná platba · Apple Pay a platební karty · Nespokojenost = vrácení peněz.
                {/* TODO: ověřit dostupné platební metody */}
              </p>

              {/* informační box s ikonami pod tlačítkem */}
              <div className="mt-6">
                <TrustBadges />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
