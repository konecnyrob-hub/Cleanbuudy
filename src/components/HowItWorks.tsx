import Reveal from "./Reveal";
import ProductImage from "./ProductImage";
import BuyButton from "./BuyButton";
import { images, priceLabel } from "@/lib/product";

const steps = [
  {
    n: "01",
    title: "Jedno stisknutí",
    body: "Jediné tlačítko okamžitě probudí motor. Žádné čekání — vysavač táhne ve chvíli, kdy se ho dotknete.",
  },
  {
    n: "02",
    title: "Přejeďte přes nepořádek",
    body: "Klidně po klávesnici, podložce i hraně notebooku. Nízká hubice se dostane do spár i mezi klávesy.",
  },
  {
    n: "03",
    title: "Cvaknutím otevřete nádobu",
    body: "Průhlednou nádobu nakloníte nad koš, cvaknete západkou a je čistá. Zaklapnete zpět a hotovo.",
  },
  {
    n: "04",
    title: "Dobijte přes USB",
    body: "Když prstenec pohasne, připojíte kabel, který stejně nosíte s sebou. Nabíjí se snadno přes USB.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="section bg-surface/50">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Reveal className="lg:sticky lg:top-28">
            <p className="eyebrow">Jak to funguje</p>
            <h2 className="mt-4 font-display text-4xl leading-tight tracking-tight sm:text-5xl">
              Od nepořádku
              <br />
              k čistému stolu.
            </h2>
            <p className="mt-5 max-w-sm text-lg leading-relaxed text-muted">
              Žádné nastavování. Žádné skládání. Cleaner je navržený tak, aby celá
              rutina proběhla bez jediné myšlenky navíc.
            </p>

            <ProductImage
              src={images.product1}
              alt="Cleaner v ruce při úklidu stolu"
              ratio="4 / 3"
              sizes="(max-width: 1024px) 90vw, 40vw"
              className="mt-8 rounded-[2rem] border border-line-2"
              imgClassName="transition-transform duration-[1.4s] ease-out hover:scale-105"
            />

            <div className="mt-8">
              <BuyButton variant="primary">Chci Cleaner — {priceLabel}</BuyButton>
            </div>
          </Reveal>

          <ol className="relative">
            <div className="absolute left-[1.65rem] top-2 bottom-2 w-px bg-line" aria-hidden />
            {steps.map((s, i) => (
              <Reveal as="li" key={s.n} delay={i * 0.08} className="relative flex gap-6 pb-10 last:pb-0">
                <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-line-2 bg-card font-display text-lg text-sage-deep shadow-sm">
                  {s.n}
                </div>
                <div className="pt-2">
                  <h3 className="font-display text-2xl tracking-tight">{s.title}</h3>
                  <p className="mt-2 max-w-md leading-relaxed text-muted">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
