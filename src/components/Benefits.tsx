import Reveal from "./Reveal";

const benefits = [
  {
    tag: "Konec hledání baterií",
    title: "Dobíjení přes USB",
    body: "Stačí kabel, který už doma máte. Žádné tužkové baterie, žádný odpad, žádná zásuvka plná vybitých článků.",
    icon: (
      <path d="M7 10a5 5 0 0 1 5-5h6M17 14a5 5 0 0 1-5 5H6m11-9 3-3-3-3M7 6 4 9l3 3" />
    ),
  },
  {
    tag: "Vždy po ruce",
    title: "Do dlaně, lehký",
    body: "Má své místo hned vedle myši — ne ve skříni. Sáhnete po něm v momentě, kdy zahlédnete první drobek.",
    icon: <path d="M6 3h12v18H6zM9 18h6" />,
  },
  {
    tag: "Bez přemýšlení",
    title: "Jediné tlačítko",
    body: "Stisk zapne, další stisk vypne. Žádné režimy k učení, žádný návod k luštění, nic k nastavování.",
    icon: <circle cx="12" cy="12" r="8" />,
  },
  {
    tag: "Klid na práci",
    title: "Tichý chod",
    body: "Vyladěný motor drží nízkou hladinu hluku, takže uklidíte i uprostřed hovoru nebo pozdě večer.",
    icon: <path d="M11 5 6 9H3v6h3l5 4zM16 9a5 5 0 0 1 0 6" />,
  },
  {
    tag: "Nic k vyhazování",
    title: "Vysypání jedním cvaknutím",
    body: "Průhledná nádoba se otevře nad košem a zase zaklapne. Používáte ji stále dokola — žádné sáčky.",
    icon: <path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" />,
  },
  {
    tag: "Stůl, který působí prémiově",
    title: "Navržený, aby byl vidět",
    body: "Tichý, minimalistický objekt v teplé porcelánové a šalvějové barvě. Na stole si své místo zaslouží.",
    icon: <path d="M12 3l2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-.5z" />,
  },
];

export default function Benefits() {
  return (
    <section id="why" className="section">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow">Proč Cleaner</p>
          <h2 className="mt-4 max-w-2xl font-display text-4xl leading-tight tracking-tight sm:text-5xl">
            Každý detail si na stole zaslouží své místo.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.06} className="h-full">
              <article className="card group flex h-full flex-col p-7 transition-transform duration-500 hover:-translate-y-1">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-glow text-sage-deep transition-colors duration-500 group-hover:bg-sage group-hover:text-white">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    {b.icon}
                  </svg>
                </div>
                <p className="text-sm font-medium text-sage-deep">{b.tag}</p>
                <h3 className="mt-1 font-display text-xl tracking-tight">{b.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{b.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
