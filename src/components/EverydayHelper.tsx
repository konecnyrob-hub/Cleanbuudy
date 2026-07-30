import Reveal from "./Reveal";
import BuyButton from "./BuyButton";

const uses = [
  {
    title: "Drobky po jídle",
    icon: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <circle cx="10" cy="10" r="1" fill="currentColor" stroke="none" />
        <circle cx="14" cy="11" r="1" fill="currentColor" stroke="none" />
        <circle cx="11" cy="14" r="1" fill="currentColor" stroke="none" />
        <circle cx="15" cy="14.5" r="0.9" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    title: "Klávesnice",
    icon: (
      <>
        <rect x="2.5" y="6" width="19" height="12" rx="2" />
        <path d="M6 10h.01M9.5 10h.01M13 10h.01M16.5 10h.01M8 14h8" />
      </>
    ),
  },
  {
    title: "Pracovní stůl",
    icon: (
      <>
        <rect x="3" y="4" width="18" height="12" rx="2" />
        <path d="M8 20h8M12 16v4" />
      </>
    ),
  },
  {
    title: "Auto",
    icon: (
      <>
        <path d="M4 11l1.6-4.2A2 2 0 0 1 7.5 5.5h9a2 2 0 0 1 1.9 1.3L20 11" />
        <path d="M3.5 11h17v4a1 1 0 0 1-1 1H4.5a1 1 0 0 1-1-1z" />
        <circle cx="7.5" cy="16.5" r="1.6" />
        <circle cx="16.5" cy="16.5" r="1.6" />
      </>
    ),
  },
  {
    title: "Domů i na cesty",
    icon: (
      <>
        <path d="M6 8h12l-1 12H7z" />
        <path d="M9 8V6a3 3 0 0 1 6 0v2" />
      </>
    ),
  },
];

export default function EverydayHelper() {
  return (
    <section id="pouziti" className="section">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Každodenní pomocník</p>
          <h2 className="mt-4 font-display text-4xl leading-tight tracking-tight sm:text-5xl">
            Malý pomocník pro každodenní nepořádek
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Cleaner uklidí drobky, prach i drobné nečistoty za pár sekund. Mějte ho po ruce
            na stole, v kanceláři, doma i v autě. Není náhradou velkého vysavače — je rychlý
            pomocník pro každý den.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2.5 text-sm text-ink-2">
            <span className="rounded-full border border-line-2 bg-surface px-3.5 py-1.5">Jedno tlačítko</span>
            <span className="rounded-full border border-line-2 bg-surface px-3.5 py-1.5">Kompaktní rozměry</span>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {uses.map((u, i) => (
            <Reveal key={u.title} delay={i * 0.06} className="h-full">
              <article className="card flex h-full flex-col items-center gap-4 p-6 text-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-glow text-sage-deep">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {u.icon}
                  </svg>
                </span>
                <h3 className="text-[0.95rem] font-semibold leading-tight">{u.title}</h3>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.25} className="mt-12 flex justify-center">
          <BuyButton variant="primary">Pořiďte si Cleaner</BuyButton>
        </Reveal>
      </div>
    </section>
  );
}
