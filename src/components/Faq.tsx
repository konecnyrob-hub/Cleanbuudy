"use client";

import { useState } from "react";
import Reveal from "./Reveal";

const faqs = [
  {
    q: "Jak dlouho trvá doručení?",
    a: "Objednávky odesíláme ihned a po České republice doručujeme obvykle do 3–5 pracovních dnů. Dopravu máte zdarma.",
  },
  {
    q: "Jak produkt nabíjím?",
    a: "Přes USB kabel, který už doma nejspíš máte — stejný, jakým nabíjíte většinu zařízení. Světelný prstenec ukazuje stav nabití.",
  },
  {
    q: "Jak dlouho vydrží baterie?",
    a: "Na jedno nabití zvládne mnoho úklidů. Protože úklid stolu trvá jen vteřiny, dobíjíte většinou jen občas. Přesnou výdrž doplníme mezi parametry.",
  },
  {
    q: "Lze produkt vrátit?",
    a: "Ano. Jako spotřebitel máte 14 dní na vrácení bez udání důvodu. Postup a formulář najdete na stránce Odstoupení od smlouvy.",
  },
  {
    q: "Jak mě kontaktujete?",
    a: "Česká zákaznická podpora odpovídá e-mailem i telefonicky (Po–Pá 9–17 h). Všechny kontakty najdete na stránce Kontakt.",
  },
  {
    q: "Vyčistí opravdu mezery mezi klávesami?",
    a: "Ano. Úzká hubice je tvarovaná tak, aby se dostala mezi klávesy i k jejich okrajům, a šetrně zvedne prach a drobky, aniž by tahala za klávesy.",
  },
  {
    q: "Musím dokupovat sáčky nebo filtry?",
    a: "Nikdy. Nádoba na prach i filtr jsou opakovaně použitelné — stačí vysypat a občas propláchnout. Žádné sáčky, kazety ani předplatné.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section bg-surface/50">
      <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <p className="eyebrow">Dobré vědět</p>
          <h2 className="mt-4 font-display text-4xl leading-tight tracking-tight sm:text-5xl">
            Odpovědi na vaše otázky.
          </h2>
          <p className="mt-5 max-w-xs text-muted">
            {/* TODO: doplnit skutečný kontaktní e-mail */}
            Něco vám vrtá hlavou? Ozveme se do jednoho dne na hello@cleaner.cz.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="divide-y divide-line-2 border-y border-line-2">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <li key={f.q}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-xl tracking-tight">{f.q}</span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line-2 transition-transform duration-300 ${
                        isOpen ? "rotate-45 bg-ink text-white" : ""
                      }`}
                    >
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p
                        className={`max-w-xl pb-6 leading-relaxed text-muted transition-opacity duration-300 ${
                          isOpen ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        {f.a}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
