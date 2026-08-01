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
          <strong>Analytické</strong> — pro měření návštěvnosti používáme Google Analytics 4
          (gtag.js). Pomáhá nám rozumět tomu, jak je web používán, a dále ho zlepšovat.
        </li>
        <li>
          <strong>Marketingové</strong> — pro cílení reklamy. V současné době marketingové
          cookies nepoužíváme; pokud je zavedeme, pouze s vaším souhlasem.
        </li>
      </ul>

      <h2>3. Souhlas a odmítnutí</h2>
      <p>
        Nezbytné cookies nevyžadují souhlas. Analytické cookies Google Analytics slouží pouze
        k měření návštěvnosti a jejich používání můžete kdykoli odmítnout — vymazáním nebo
        zablokováním cookies ve vašem prohlížeči, případně pomocí oficiálního doplňku Google
        pro odhlášení z Google Analytics. Marketingové cookies nepoužíváme.
      </p>

      <h2>4. Jak cookies spravovat</h2>
      <p>
        Nastavení cookies lze upravit v prohlížeči (Chrome, Safari, Firefox, Edge). Blokování
        nezbytných cookies může omezit funkčnost webu.
      </p>

      <h2>5. Doba uložení</h2>
      <p>
        Doba uložení se liší podle typu cookie. Nezbytné cookies trvají po dobu relace nebo
        do vypršení jejich platnosti; váš souhlas se zpracováním cookies uchováváme zpravidla
        po dobu 12 měsíců.
      </p>
    </LegalLayout>
  );
}
