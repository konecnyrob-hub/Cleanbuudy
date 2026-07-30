import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";
import SellerInfo from "@/components/SellerInfo";
import { shipping } from "@/lib/company";

export const metadata: Metadata = {
  title: "Obchodní podmínky",
  description: "Obchodní podmínky e-shopu Cleaner — objednávka, platba, dodání a práva spotřebitele.",
};

export default function Page() {
  return (
    <LegalLayout
      title="Obchodní podmínky"
      intro="Podmínky upravují práva a povinnosti mezi prodávajícím a kupujícím při nákupu v tomto e-shopu."
    >
      <p>
        Tyto obchodní podmínky jsou pouze <strong>strukturovaný vzor</strong>. Před spuštěním
        e-shopu doplňte označená místa a nechte znění zkontrolovat právníkem podle
        aktuální legislativy (zejména zákon č. 89/2012 Sb., občanský zákoník, a zákon
        č. 634/1992 Sb., o ochraně spotřebitele).
      </p>

      <SellerInfo />

      <h2>1. Úvodní ustanovení</h2>
      <p>
        Tyto podmínky platí pro nákup v internetovém obchodě dostupném na adrese{" "}
        <span className="todo">[DOPLŇTE doménu]</span>. Kupující odesláním objednávky
        potvrzuje, že se s podmínkami seznámil a souhlasí s nimi.
      </p>

      <h2>2. Objednávka a uzavření smlouvy</h2>
      <p>
        Kupní smlouva vzniká odesláním objednávky kupujícím a jejím potvrzením ze strany
        prodávajícího na e-mail kupujícího. Prezentace zboží v e-shopu je informativního
        charakteru.
      </p>

      <h2>3. Ceny a platba</h2>
      <ul>
        <li>Všechny ceny jsou uvedeny jako konečné.</li>
        <li>Dostupné platební metody: <span className="todo">[DOPLŇTE — karta, Apple Pay, dobírka…]</span>.</li>
        <li>Daňový doklad obdrží kupující elektronicky. <span className="todo">[DOPLŇTE údaj o DPH / neplátce]</span></li>
      </ul>

      <h2>4. Dodání zboží</h2>
      <ul>
        <li>Zboží doručujeme po České republice, obvykle do <strong>{shipping.deliveryDays}</strong>.</li>
        <li>Cena dopravy: <strong>{shipping.priceLabel}</strong>.</li>
        <li>Dopravce: <span className="todo">[DOPLŇTE dopravce]</span>.</li>
      </ul>

      <h2>5. Odstoupení od smlouvy</h2>
      <p>
        Spotřebitel má právo odstoupit od smlouvy do 14 dnů od převzetí zboží. Postup a
        formulář najdete na stránce{" "}
        <a href="/odstoupeni-od-smlouvy">Odstoupení od smlouvy</a>.
      </p>

      <h2>6. Práva z vadného plnění (reklamace)</h2>
      <p>
        Postup uplatnění reklamace upravuje <a href="/reklamacni-rad">Reklamační řád</a>.
      </p>

      <h2>7. Ochrana osobních údajů</h2>
      <p>
        Zpracování osobních údajů popisují{" "}
        <a href="/gdpr">Zásady ochrany osobních údajů</a>.
      </p>

      <h2>8. Mimosoudní řešení spotřebitelských sporů</h2>
      <p>
        K mimosoudnímu řešení sporů je příslušná Česká obchodní inspekce (ČOI),{" "}
        <a href="https://adr.coi.cz" target="_blank" rel="noopener noreferrer">adr.coi.cz</a>.
      </p>

      <h2>9. Závěrečná ustanovení</h2>
      <p>
        Znění podmínek může prodávající měnit; pro objednávku platí znění účinné v okamžiku
        jejího odeslání. Tyto podmínky nabývají účinnosti dne{" "}
        <span className="todo">[DOPLŇTE datum]</span>.
      </p>
    </LegalLayout>
  );
}
