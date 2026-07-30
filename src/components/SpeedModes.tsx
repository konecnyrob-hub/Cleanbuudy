"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "./Reveal";

// Ukazatel „úrovně sání" je ilustrativní (relativní síla režimu),
// nejde o měřený technický parametr.
const modes = [
  {
    key: "keys",
    label: "Klávesnice",
    tagline: "Jemný · režim 1",
    power: 34,
    answer: "Ano — klávesnici zvládne.",
    body: "Jemné a přesné sání zvedne prach i drobky mezi klávesami, aniž by tahalo za klávesnice nebo kabely. Ideální na rychlý úklid během dne.",
    good: ["Mezi mechanickými klávesami", "Trackpad i panty notebooku", "Spodní hrana monitoru"],
  },
  {
    key: "crumbs",
    label: "Drobky",
    tagline: "Běžný · režim 2",
    power: 66,
    answer: "Na oběd víc než dost.",
    body: "Každodenní nastavení. Drobky z pečiva, sušenek i piliny z gumy zmizí jediným přejetím přes stůl.",
    good: ["Drobky po jídle", "Piliny z tužky a gumy", "Podložky a tácky"],
  },
  {
    key: "deep",
    label: "Turbo",
    tagline: "Plný výkon · režim 3",
    power: 100,
    answer: "Výkon, když je potřeba.",
    body: "Plný proud vzduchu na tvrdší nepořádek — jemný písek, hlínu z květináče, třpytky i kouty, kam se hadřík nedostane.",
    good: ["Třpytky a konfety", "Nečistoty v koutech šuplíku", "Držáky v autě"],
  },
];

export default function SpeedModes() {
  const [active, setActive] = useState(1);
  const mode = modes[active];

  return (
    <section id="power" className="section">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Tři režimy sání</p>
          <h2 className="mt-4 font-display text-4xl leading-tight tracking-tight sm:text-5xl">
            Přesně tolik výkonu, kolik potřebujete.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Jedno tlačítko přepíná tři vyladěné režimy. Jemný na klávesy, běžný
            na drobky, turbo na nepořádek, který se brání.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-2 lg:items-center">
          {/* ovládání */}
          <div>
            <div className="flex gap-2 rounded-full border border-line-2 bg-surface/70 p-1.5 backdrop-blur">
              {modes.map((m, i) => (
                <button
                  key={m.key}
                  onClick={() => setActive(i)}
                  className={`relative flex-1 rounded-full px-4 py-3 text-sm font-medium transition-colors ${
                    active === i ? "text-white" : "text-muted hover:text-ink"
                  }`}
                >
                  {active === i && (
                    <motion.span
                      layoutId="mode-pill"
                      className="absolute inset-0 rounded-full bg-ink"
                      transition={{ type: "spring", stiffness: 380, damping: 34 }}
                    />
                  )}
                  <span className="relative z-10">{m.label}</span>
                </button>
              ))}
            </div>

            <div className="mt-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={mode.key}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
                >
                  <p className="text-sm font-medium text-sage-deep">{mode.tagline}</p>
                  <h3 className="mt-1 font-display text-3xl tracking-tight">{mode.answer}</h3>
                  <p className="mt-3 max-w-md leading-relaxed text-muted">{mode.body}</p>

                  <ul className="mt-6 space-y-2.5">
                    {mode.good.map((g) => (
                      <li key={g} className="flex items-center gap-3 text-[0.95rem]">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-glow text-sage-deep">
                          <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12l5 5L20 6" />
                          </svg>
                        </span>
                        {g}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* ukazatel sání */}
          <div className="card relative overflow-hidden p-8 sm:p-10">
            <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-glow blur-3xl" />
            <div className="relative flex items-end justify-between">
              <div>
                <p className="text-sm text-muted">Úroveň sání</p>
                <div className="mt-1 flex items-baseline gap-1">
                  <motion.span
                    key={mode.power}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-display text-6xl tracking-tight"
                  >
                    {mode.power}
                  </motion.span>
                  <span className="text-2xl text-muted">%</span>
                </div>
              </div>
              <span className="rounded-full bg-ink px-3 py-1 text-xs font-medium text-white">
                {mode.label}
              </span>
            </div>

            {/* sloupce */}
            <div className="mt-8 flex h-40 items-end gap-1.5">
              {Array.from({ length: 28 }).map((_, i) => {
                const filled = (i / 28) * 100 <= mode.power;
                return (
                  <motion.span
                    key={i}
                    className="flex-1 rounded-full"
                    style={{ backgroundColor: filled ? "var(--color-sage)" : "var(--color-paper-2)" }}
                    initial={false}
                    animate={{ height: filled ? `${30 + Math.sin(i * 0.5) * 12 + i}%` : "16%" }}
                    transition={{ duration: 0.5, delay: i * 0.012, ease: [0.22, 1, 0.36, 1] as const }}
                  />
                );
              })}
            </div>
            <p className="mt-6 text-sm text-muted">
              Cyklonové sání drží sílu, dokud není nádoba plná — bez poklesu
              výkonu v půlce úklidu.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
