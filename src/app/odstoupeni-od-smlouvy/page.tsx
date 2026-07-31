import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";
import SellerInfo from "@/components/SellerInfo";
import { company, addressLine } from "@/lib/company";

export const metadata: Metadata = {
  title: "Odstoupení od smlouvy",
  description: "Jak odstoupit od kupní smlouvy do 14 dnů a vrátit zboží zakoupené v e-shopu Cleaner.",
};

export default function Page() {
  return (
    <LegalLayout
      title="Odstoupení od smlouvy"
      intro="Jako spotřebitel máte právo odstoupit od smlouvy do 14 dnů bez udání důvodu."
    >
      <SellerInfo />

      <h2>1. Lhůta pro odstoupení</h2>
      <p>
        Od kupní smlouvy lze odstoupit do <strong>14 dnů</strong> ode dne převzetí zboží.
        Lhůta je zachována, odešlete-li oznámení o odstoupení před jejím uplynutím.
      </p>

      <h2>2. Jak odstoupit</h2>
      <ul>
        <li>Zašlete jednoznačné oznámení na e-mail {company.email} nebo poštou na adresu sídla.</li>
        <li>Můžete využít vzorový formulář níže.</li>
        <li>Zboží vraťte na adresu: {addressLine}.</li>
      </ul>

      <h2>3. Vrácení peněz</h2>
      <p>
        Peníze (včetně nákladů na dodání ve výši nejlevnějšího nabízeného způsobu) vrátíme
        do <strong>14 dnů</strong> od odstoupení, zpravidla stejným způsobem, jakým byly
        přijaty. Nejsme povinni vrátit peníze dříve, než nám zboží předáte nebo prokážete
        jeho odeslání.
      </p>

      <h2>4. Náklady na vrácení a stav zboží</h2>
      <ul>
        <li>Náklady na vrácení zboží nese kupující.</li>
        <li>Kupující odpovídá za snížení hodnoty zboží v důsledku nakládání nad rámec vyzkoušení.</li>
      </ul>

      <h2>5. Vzorový formulář pro odstoupení</h2>
      <p className="not-prose rounded-2xl border border-line-2 bg-surface/60 p-5 text-sm text-muted">
        Adresát: {company.legalName}, {addressLine}
        <br />
        Oznamuji, že tímto odstupuji od smlouvy o nákupu tohoto zboží: …………………………
        <br />
        Datum objednání / převzetí: …………………………
        <br />
        Jméno a adresa spotřebitele: …………………………
        <br />
        Číslo účtu pro vrácení peněz: …………………………
        <br />
        Datum a podpis: …………………………
      </p>
    </LegalLayout>
  );
}
