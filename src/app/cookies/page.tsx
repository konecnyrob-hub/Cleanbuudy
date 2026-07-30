import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Zásady používání cookies",
  description: "Jak e-shop Cleaner používá soubory cookies a jak můžete spravovat svůj souhlas.",
};

export default function Page() {
  return (
    <LegalLayout
      title="Zásady používání cookies"
      intro="Informace o souborech cookies, které tento web používá, a o vašem souhlasu."
    >
      <h2>1. Co jsou cookies</h2>
      <p>
        Cookies jsou malé textové soubory, které se ukládají do vašeho prohlížeče a pomáhají
        webu fungovat, pamatovat si nastavení a měřit návštěvnost.
      </p>

      <h2>2. Jaké cookies používáme</h2>
      <ul>
        <li>
          <strong>Nezbytné</strong> — potřebné pro základní funkce (např. košík, souhlas se cookies).
          Nevyžadují souhlas.
        </li>
        <li>
          <strong>Analytické</strong> — pomáhají nám rozumět používání webu.{" "}
          <span className="todo">[DOPLŇTE nástroj, např. Google Analytics]</span>
        </li>
        <li>
          <strong>Marketingové</strong> — pro cílení reklamy.{" "}
          <span className="todo">[DOPLŇTE nástroje, např. Meta Pixel]</span>
        </li>
      </ul>

      <h2>3. Souhlas</h2>
      <p>
        Analytické a marketingové cookies používáme jen s vaším souhlasem, který udělujete přes
        cookie lištu. Souhlas můžete kdykoli změnit nebo odvolat vymazáním cookies ve vašem
        prohlížeči.
      </p>

      <h2>4. Jak cookies spravovat</h2>
      <p>
        Nastavení cookies lze upravit v prohlížeči (Chrome, Safari, Firefox, Edge). Blokování
        nezbytných cookies může omezit funkčnost webu.
      </p>

      <h2>5. Doba uložení</h2>
      <p>
        Doba uložení se liší podle typu cookie. <span className="todo">[DOPLŇTE konkrétní doby]</span>
      </p>
    </LegalLayout>
  );
}
