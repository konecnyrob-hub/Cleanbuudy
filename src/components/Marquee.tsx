const words = [
  "Klávesnice",
  "Pracovní stůl",
  "Notebook",
  "Drobky",
  "Prach z gumy",
  "Herní sestavy",
  "Home office",
  "Ateliér",
];

export default function Marquee() {
  return (
    <div className="relative z-[2] border-y border-line-2 bg-surface/60 py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-paper to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-paper to-transparent" />
      <div className="marquee-track">
        {[0, 1].map((rep) => (
          <div key={rep} className="flex shrink-0 items-center" aria-hidden={rep === 1}>
            {words.map((w) => (
              <span key={w} className="flex items-center">
                <span className="px-6 font-display text-2xl text-ink-2">{w}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-sage" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
