import Reveal from "./Reveal";
import { specs } from "@/lib/product";

export default function Specs() {
  return (
    <section id="specs" className="section">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow">Parametry</p>
          <h2 className="mt-4 max-w-xl font-display text-4xl leading-tight tracking-tight sm:text-5xl">
            Malý objekt, promyšlený do detailu.
          </h2>
          <p className="mt-4 max-w-md text-muted">
            Finální technické parametry doplníme po potvrzení od dodavatele.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-x-12 sm:grid-cols-2">
          {specs.map((s, i) => (
            <Reveal
              as="div"
              key={s.label}
              delay={(i % 6) * 0.04}
              className="flex items-baseline justify-between gap-6 border-b border-line-2 py-4"
            >
              <span className="text-muted">{s.label}</span>
              <span className="text-right font-medium">{s.value}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
