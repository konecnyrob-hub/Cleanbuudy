import Reveal from "./Reveal";
import { testimonials, social } from "@/lib/product";

export default function Testimonials() {
  const hasRating = social.rating && social.reviewsCount;

  return (
    <section className="section bg-surface/50">
      <div className="container-x">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="max-w-xl font-display text-4xl leading-tight tracking-tight sm:text-5xl">
            Oblíbený u lidí, kteří milují čistý stůl.
          </h2>
          {hasRating && (
            <div className="flex items-center gap-2 text-muted">
              <span className="text-lg text-sage" aria-hidden>
                ★★★★★
              </span>
              <span className="text-sm">
                {social.rating} průměr · {social.reviewsCount} recenzí
              </span>
            </div>
          )}
        </Reveal>

        {/* TODO: Nahradit skutečnými recenzemi zákazníků (viz src/lib/product.ts). */}
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.map((q, i) => (
            <Reveal key={i} delay={i * 0.08} className="h-full">
              <figure className="card flex h-full flex-col p-8">
                <span className="text-sm text-sage" aria-hidden>
                  ★★★★★
                </span>
                <blockquote className="mt-4 flex-1 font-display text-xl leading-snug tracking-tight text-ink-2">
                  „{q.quote}"
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-line-2 pt-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-glow font-display text-sage-deep">
                    {q.name.charAt(0)}
                  </span>
                  <div>
                    <p className="text-sm font-medium">{q.name}</p>
                    <p className="text-xs text-muted">{q.role}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
