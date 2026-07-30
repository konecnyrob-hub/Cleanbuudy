import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  title: string;
  intro?: string;
  children: ReactNode;
};

/** Sdílený rám pro právní a informační stránky (Nav a Footer dodává root layout). */
export default function LegalLayout({ title, intro, children }: Props) {
  return (
    <main className="relative z-[2] min-h-screen bg-paper">
      <div className="mx-auto w-full max-w-3xl px-6 pt-32 pb-24 sm:pt-36">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink">
          <span aria-hidden>←</span> Zpět na hlavní stránku
        </Link>
        <h1 className="mt-6 font-display text-4xl leading-tight tracking-tight sm:text-5xl">{title}</h1>
        {intro && <p className="mt-4 text-lg leading-relaxed text-muted">{intro}</p>}
        <p className="mt-3 text-xs text-faint">
          Naposledy aktualizováno: <span className="todo">[DOPLŇTE datum]</span>
        </p>
        <div className="prose-legal mt-10">{children}</div>
      </div>
    </main>
  );
}
