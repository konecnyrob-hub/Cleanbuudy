import Reveal from "./Reveal";

const benefits = [
  {
    title: "Rychlé a efektivní čištění",
    body: "Stačí přejet po stole a je uklizeno — rychle a bez námahy.",
    icon: <path d="M13 3L4 14h6l-1 7 9-11h-6z" />,
  },
  {
    title: "Kompaktní a přenosný",
    body: "Vejde se do dlaně i do batohu. Vezmete ho kamkoliv.",
    icon: (
      <>
        <path d="M6 8h12l-1 12H7z" />
        <path d="M9 8V6a3 3 0 0 1 6 0v2" />
      </>
    ),
  },
  {
    title: "Dlouhá výdrž baterie",
    // TODO: doplnit potvrzenou výdrž v minutách (reference uváděla „až 45 minut").
    body: "Pohodlné dobíjení přes USB — na jedno nabití zvládne mnoho úklidů.",
    icon: (
      <>
        <rect x="4" y="8" width="15" height="8" rx="2" />
        <path d="M21 11v2" />
        <path d="M7 10.5v3M10 10.5v3" />
      </>
    ),
  },
  {
    title: "Snadná údržba",
    body: "Vyjměte zásobník a během chvíle je opět čistý.",
    icon: (
      <>
        <path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" />
      </>
    ),
  },
];

export default function BenefitStrip() {
  return (
    <section aria-label="Hlavní výhody" className="relative z-[2] pb-6">
      <div className="container-x">
        <ul className="grid gap-4 rounded-[2rem] border border-line-2 bg-surface/70 p-5 backdrop-blur sm:grid-cols-2 sm:p-6 lg:grid-cols-4">
          {benefits.map((b, i) => (
            <Reveal
              as="li"
              key={b.title}
              delay={i * 0.1}
              y={20}
              className="flex items-start gap-4 rounded-2xl p-3 transition-colors duration-300 hover:bg-card"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-lime-soft text-lime-deep">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5.5 w-5.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {b.icon}
                </svg>
              </span>
              <div>
                <h3 className="text-[0.95rem] font-semibold leading-tight">{b.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{b.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
