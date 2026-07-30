import Reveal from "./Reveal";

const reasons = [
  { title: "Kvalitní zpracování", body: "Promyšlený design a materiály, které vydrží každodenní používání." },
  { title: "Rychlé doručení", body: "Odesíláme ihned, u vás do 3–5 pracovních dnů." },
  { title: "Bezpečné platby", body: "Šifrované připojení a důvěryhodné platební metody." },
  { title: "Česká podpora", body: "Ozveme se česky, Po–Pá 9–17 h." },
  { title: "Jednoduché vrácení", body: "14 dní na vrácení bez udání důvodu." },
];

export default function WhyBuy() {
  return (
    <section className="section bg-surface/50">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Nakupujte s klidem</p>
          <h2 className="mt-4 font-display text-4xl leading-tight tracking-tight sm:text-5xl">
            Proč nakupovat u nás
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Férový český e-shop s důrazem na kvalitu, rychlost a spokojenost.
          </p>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.06} className="h-full">
              <article className="flex h-full items-start gap-4 rounded-[1.75rem] border border-line-2 bg-card p-6">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sage text-white">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12l5 5L20 6" />
                  </svg>
                </span>
                <div>
                  <h3 className="font-display text-lg tracking-tight">{r.title}</h3>
                  <p className="mt-1 text-[0.95rem] leading-relaxed text-muted">{r.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
