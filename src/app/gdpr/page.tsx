import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";
import SellerInfo from "@/components/SellerInfo";
import { company } from "@/lib/company";

export const metadata: Metadata = {
  title: "Ochrana osobních údajů (GDPR)",
  description: "Zásady zpracování osobních údajů e-shopu Cleaner v souladu s nařízením GDPR.",
};

export default function Page() {
  return (
    <LegalLayout
      title="Ochrana osobních údajů"
      intro="Zásady zpracování osobních údajů podle nařízení (EU) 2016/679 (GDPR)."
    >
      <h2>1. Správce údajů</h2>
      <SellerInfo />

      <h2>2. Jaké údaje zpracováváme</h2>
      <ul>
        <li>Identifikační a kontaktní: jméno, adresa, e-mail, telefon.</li>
        <li>Údaje o objednávce a platbě.</li>
        <li>Technické údaje a cookies — viz <a href="/cookies">Zásady cookies</a>.</li>
      </ul>

      <h2>3. Účel a právní základ</h2>
      <ul>
        <li>Vyřízení objednávky a plnění smlouvy (čl. 6 odst. 1 písm. b GDPR).</li>
        <li>Plnění zákonných povinností, např. účetnictví (písm. c).</li>
        <li>Marketing pouze na základě výslovného souhlasu (písm. a); souhlas lze kdykoli odvolat.</li>
      </ul>

      <h2>4. Doba uchování</h2>
      <p>
        Údaje uchováváme po dobu nezbytnou k naplnění účelu a po dobu stanovenou právními
        předpisy — účetní a daňové doklady zejména po dobu vyžadovanou zákonem (až 10 let).
      </p>

      <h2>5. Příjemci a zpracovatelé</h2>
      <p>
        Údaje mohou být předány zpracovatelům, kteří pro nás zajišťují provoz e-shopu, dopravu
        a platby — zejména poskytovateli e-shopové platformy a platební brány, přepravní
        společnosti a poskytovateli e-mailových služeb.
      </p>

      <h2>6. Vaše práva</h2>
      <ul>
        <li>Právo na přístup, opravu a výmaz.</li>
        <li>Právo na omezení zpracování a přenositelnost.</li>
        <li>Právo vznést námitku a odvolat souhlas.</li>
        <li>Právo podat stížnost u Úřadu pro ochranu osobních údajů (<a href="https://www.uoou.cz" target="_blank" rel="noopener noreferrer">uoou.cz</a>).</li>
      </ul>

      <h2>7. Kontakt</h2>
      <p>
        Se svými dotazy se obracejte na {company.email}.
      </p>
    </LegalLayout>
  );
}
