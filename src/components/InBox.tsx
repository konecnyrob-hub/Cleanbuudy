import Reveal from "./Reveal";
import ProductImage from "./ProductImage";
import { images, inBox } from "@/lib/product";

export default function InBox() {
  return (
    <section className="section bg-surface/50">
      <div className="container-x grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <Reveal>
          <ProductImage
            src={images.gallery1}
            alt="Obsah balení vysavače Cleaner"
            ratio="1 / 1"
            sizes="(max-width: 1024px) 90vw, 40vw"
            className="card rounded-[2.5rem]"
            imgClassName="transition-transform duration-[1.4s] ease-out hover:scale-105"
          />
        </Reveal>

        <div>
          <Reveal>
            <p className="eyebrow">Obsah balení</p>
            <h2 className="mt-4 font-display text-4xl leading-tight tracking-tight sm:text-5xl">
              Vše pro start. Nic, co byste dokupovali.
            </h2>
          </Reveal>

          <div className="mt-9 grid gap-x-8 gap-y-1 sm:grid-cols-2">
            {inBox.map((c, i) => (
              <Reveal
                as="div"
                key={i}
                delay={i * 0.05}
                className="flex items-center justify-between gap-4 border-b border-line-2 py-4"
              >
                <div>
                  <p className="font-medium">{c.name}</p>
                  <p className="text-sm text-muted">{c.detail}</p>
                </div>
                <span className="font-display text-lg text-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <p className="mt-8 text-sm text-muted">
              Nádoba na prach i filtr jsou opakovaně použitelné — propláchnout,
              usušit a pokračovat. Žádné náplně, žádné kazety, žádné předplatné.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
