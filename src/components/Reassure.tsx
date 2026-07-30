import Reveal from "./Reveal";
import ProductImage from "./ProductImage";
import { images } from "@/lib/product";

export default function Reassure() {
  return (
    <section className="section">
      <div className="container-x grid gap-5 lg:grid-cols-2">
        {/* Tichý chod */}
        <Reveal>
          <article className="card relative flex h-full flex-col overflow-hidden">
            <ProductImage
              src={images.detail1}
              alt="Detail tichého chodu vysavače Cleaner"
              ratio="16 / 9"
              sizes="(max-width: 1024px) 90vw, 45vw"
              imgClassName="transition-transform duration-[1.4s] ease-out hover:scale-105"
            />
            <div className="flex flex-1 flex-col p-8 sm:p-10">
              <p className="eyebrow">Je hlučný?</p>
              <h3 className="mt-4 font-display text-3xl leading-tight tracking-tight sm:text-4xl">
                Tak tichý, že uklidíte i během hovoru.
              </h3>
              <p className="mt-4 max-w-md leading-relaxed text-muted">
                Vyladěný motor drží nízkou hladinu hluku — blíž tlumu tiché
                konverzace než domácímu vysavači. {/* TODO: doplnit hlučnost v dB */}
              </p>

              {/* zvuková vlna (ilustrativní) */}
              <div className="mt-8 flex h-24 items-center gap-1">
                {Array.from({ length: 40 }).map((_, i) => {
                  const h = 20 + Math.abs(Math.sin(i * 0.6)) * (i < 26 ? 55 : 20);
                  return (
                    <span
                      key={i}
                      className="flex-1 rounded-full bg-sage/70"
                      style={{ height: `${h}%` }}
                    />
                  );
                })}
              </div>
              <div className="mt-4 flex justify-between text-xs text-muted">
                <span>Ticho</span>
                <span className="font-medium text-sage-deep">Cleaner</span>
                <span>Mixér</span>
              </div>
            </div>
          </article>
        </Reveal>

        {/* Baterie */}
        <Reveal delay={0.08}>
          <article className="card relative flex h-full flex-col overflow-hidden">
            <ProductImage
              src={images.detail2}
              alt="Nabíjení vysavače Cleaner přes USB"
              ratio="16 / 9"
              sizes="(max-width: 1024px) 90vw, 45vw"
              imgClassName="transition-transform duration-[1.4s] ease-out hover:scale-105"
            />
            <div className="flex flex-1 flex-col p-8 sm:p-10">
              <p className="eyebrow">Jak dlouho vydrží?</p>
              <h3 className="mt-4 font-display text-3xl leading-tight tracking-tight sm:text-4xl">
                Dny úklidu na jedno nabití.
              </h3>
              <p className="mt-4 max-w-md leading-relaxed text-muted">
                Úklid stolu trvá vteřiny, takže většině lidí stačí dobít jen
                občas — pohodlně přes USB. {/* TODO: doplnit výdrž v minutách a dobu nabíjení */}
              </p>

              <div className="mt-8 flex items-center gap-8">
                <div className="relative h-32 w-32 shrink-0">
                  <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
                    <circle cx="60" cy="60" r="52" fill="none" stroke="var(--color-paper-2)" strokeWidth="12" />
                    <circle
                      cx="60"
                      cy="60"
                      r="52"
                      fill="none"
                      stroke="var(--color-sage)"
                      strokeWidth="12"
                      strokeLinecap="round"
                      strokeDasharray="327"
                      strokeDashoffset="52"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-display text-xl tracking-tight">USB</span>
                    <span className="text-xs text-muted">dobíjení</span>
                  </div>
                </div>
                <ul className="space-y-3 text-[0.95rem] text-muted">
                  <li className="flex items-center gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-sage" /> Nabíjení přes USB kabel
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-sage" /> Světelný prstenec ukazuje stav
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-sage" /> Kabel, který už máte doma
                  </li>
                </ul>
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
