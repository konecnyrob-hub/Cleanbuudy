import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";
import SellerInfo from "@/components/SellerInfo";
import { company, addressLine } from "@/lib/company";

export const metadata: Metadata = {
  title: "Reklamační řád",
  description: "Reklamační řád e-shopu Cleaner — jak a kde uplatnit reklamaci a jaké máte lhůty.",
};

export default function Page() {
  return (
    <LegalLayout
      title="Reklamační řád"
      intro="Postup pro uplatnění práv z vadného plnění (reklamace) zakoupeného zboží."
    >
      <SellerInfo />

      <h2>1. Odpovědnost za vady</h2>
      <p>
        Prodávající odpovídá kupujícímu za to, že zboží při převzetí nemá vady. Spotřebitel
        může uplatnit právo z vady, která se vyskytne u spotřebního zboží,{" "}
        <strong>v době 24 měsíců</strong> od převzetí.
      </p>

      <h2>2. Jak reklamaci uplatnit</h2>
      <ul>
        <li>Kontaktujte nás na {company.email} s popisem vady a číslem objednávky.</li>
        <li>Zboží zašlete na adresu: {addressLine}.</li>
        <li>Přiložte doklad o koupi a pokud možno fotografie vady.</li>
      </ul>

      <h2>3. Lhůta pro vyřízení</h2>
      <p>
        Reklamaci vyřídíme bez zbytečného odkladu, nejpozději do <strong>30 dnů</strong> ode dne
        jejího uplatnění, pokud se nedohodneme jinak.
      </p>

      <h2>4. Způsob vyřízení</h2>
      <ul>
        <li>Oprava nebo výměna zboží.</li>
        <li>Přiměřená sleva z kupní ceny.</li>
        <li>Odstoupení od smlouvy a vrácení peněz, není-li vada odstranitelná.</li>
      </ul>

      <h2>5. Náklady na reklamaci</h2>
      <p>
        Při oprávněné reklamaci má kupující nárok na náhradu účelně vynaložených nákladů na
        dopravu zboží.
      </p>

      <hr />
      <p>Reklamační řád nabývá účinnosti dne {company.effectiveDate}.</p>
    </LegalLayout>
  );
}
