import { company, addressLine } from "@/lib/company";

/** Identifikace prodávajícího — sdílený blok pro právní stránky. */
export default function SellerInfo() {
  return (
    <div className="not-prose my-6 rounded-2xl border border-line-2 bg-surface/60 p-5 text-sm">
      <p className="font-semibold text-ink">Provozovatel e-shopu (prodávající)</p>
      <ul className="mt-2 space-y-1 text-muted">
        <li>{company.legalName}</li>
        <li>Sídlo: {addressLine}</li>
        <li>IČO: {company.ico}</li>
        <li>DIČ: {company.dic}</li>
        <li>{company.registration}</li>
        <li>
          E-mail: {company.email}
          {company.phone ? ` · Telefon: ${company.phone}` : ""}
        </li>
      </ul>
    </div>
  );
}
