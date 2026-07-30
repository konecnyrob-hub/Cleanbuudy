"use client";

import { useState, type FormEvent } from "react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // TODO: napojit na reálné odeslání (e-mail API / formulářová služba / Shopify).
    // Nyní pouze potvrzení v UI, data se nikam neodesílají.
    setSent(true);
  }

  if (sent) {
    return (
      <div className="rounded-[1.75rem] border border-line-2 bg-surface/60 p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sage text-white">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12l5 5L20 6" />
          </svg>
        </div>
        <h3 className="mt-4 font-display text-xl tracking-tight">Děkujeme za zprávu</h3>
        <p className="mt-2 text-sm text-muted">
          Ozveme se co nejdříve. {/* TODO: reálné odeslání zatím není propojeno */}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-[1.75rem] border border-line-2 bg-card p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium">Jméno</span>
          <input
            type="text"
            name="name"
            required
            autoComplete="name"
            className="rounded-xl border border-line-2 bg-surface px-3.5 py-2.5 outline-none transition-colors focus:border-sage"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium">E-mail</span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            className="rounded-xl border border-line-2 bg-surface px-3.5 py-2.5 outline-none transition-colors focus:border-sage"
          />
        </label>
      </div>

      <label className="mt-4 flex flex-col gap-1.5 text-sm">
        <span className="font-medium">Předmět</span>
        <input
          type="text"
          name="subject"
          className="rounded-xl border border-line-2 bg-surface px-3.5 py-2.5 outline-none transition-colors focus:border-sage"
        />
      </label>

      <label className="mt-4 flex flex-col gap-1.5 text-sm">
        <span className="font-medium">Zpráva</span>
        <textarea
          name="message"
          required
          rows={5}
          className="resize-none rounded-xl border border-line-2 bg-surface px-3.5 py-2.5 outline-none transition-colors focus:border-sage"
        />
      </label>

      <label className="mt-4 flex items-start gap-2.5 text-xs text-muted">
        <input type="checkbox" required className="mt-0.5 h-4 w-4 accent-sage" />
        <span>
          Souhlasím se zpracováním osobních údajů dle{" "}
          <a href="/gdpr" className="text-sage-deep underline">zásad ochrany osobních údajů</a>.
        </span>
      </label>

      <button type="submit" className="btn btn-primary mt-6 w-full justify-center sm:w-auto">
        Odeslat zprávu
      </button>
    </form>
  );
}
