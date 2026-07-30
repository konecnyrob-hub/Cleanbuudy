"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "cleaner-cookie-consent"; // hodnota: "all" | "essential"

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // banner se zobrazí jen bez uloženého rozhodnutí (žádný hydration mismatch)
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setShow(true);
    } catch {
      setShow(true);
    }
  }, []);

  function decide(value: "all" | "essential") {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* soukromý režim – rozhodnutí neuložíme */
    }
    // TODO: podle souhlasu zde (de)aktivujte analytické/marketingové skripty.
    setShow(false);
  }

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-label="Souhlas s cookies"
      className="fixed inset-x-4 bottom-4 z-[60] mx-auto max-w-md rounded-[1.5rem] border border-line-2 bg-surface/85 p-5 shadow-[0_30px_60px_-30px_rgba(26,24,19,0.5)] backdrop-blur-xl sm:inset-x-auto sm:right-6"
    >
      <p className="text-sm font-semibold">Používáme cookies 🍪</p>
      <p className="mt-1.5 text-sm leading-relaxed text-muted">
        Nezbytné cookies web potřebuje k funkci. Analytické a marketingové použijeme jen
        s vaším souhlasem. Více v{" "}
        <Link href="/cookies" className="text-sage-deep underline">zásadách cookies</Link>.
      </p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <button onClick={() => decide("all")} className="btn btn-primary flex-1 justify-center !py-2.5 text-sm">
          Přijmout vše
        </button>
        <button onClick={() => decide("essential")} className="btn btn-ghost flex-1 justify-center !py-2.5 text-sm">
          Jen nezbytné
        </button>
      </div>
    </div>
  );
}
