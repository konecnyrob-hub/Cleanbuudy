import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { company, addressLine } from "@/lib/company";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Kontaktujte českou podporu e-shopu Cleaner — e-mail a kontaktní formulář.",
};

const details = [
  {
    label: "Provozovatel",
    value: company.legalName,
    icon: (
      <>
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 20a7 7 0 0 1 14 0" />
      </>
    ),
  },
  ...(company.phone
    ? [
        {
          label: "Telefon",
          value: company.phone,
          href: `tel:${company.phone.replace(/\s/g, "")}`,
          icon: <path d="M4 5c0 8 7 15 15 15l2-3-4-2-2 2a13 13 0 0 1-6-6l2-2-2-4z" />,
        },
      ]
    : []),
  {
    label: "E-mail",
    value: company.email,
    href: `mailto:${company.email}`,
    icon: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
  },
  {
    label: "IČO",
    value: company.ico,
    icon: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M9 9h6M9 12h6M9 15h4" />
      </>
    ),
  },
  {
    label: "DIČ",
    value: company.dic,
    icon: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M9 9h6M9 12h6M9 15h4" />
      </>
    ),
  },
  {
    label: "Adresa",
    value: addressLine,
    icon: (
      <>
        <path d="M12 21s7-6.5 7-11a7 7 0 1 0-14 0c0 4.5 7 11 7 11z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
  },
];

export default function Page() {
  return (
    <main className="relative z-[2] min-h-screen bg-paper">
      <div className="mx-auto w-full max-w-5xl px-6 pt-32 pb-24 sm:pt-36">
        <p className="eyebrow">Jsme tu pro vás</p>
        <h1 className="mt-4 font-display text-4xl leading-tight tracking-tight sm:text-5xl">Kontakt</h1>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
          Máte dotaz k produktu, objednávce nebo reklamaci? Ozvěte se — česká podpora
          odpovídá {company.supportHours}.
        </p>

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          {/* kontaktní údaje */}
          <div>
            <ul className="space-y-3">
              {details.map((d) => (
                <li key={d.label}>
                  <div className="flex items-start gap-4 rounded-2xl border border-line-2 bg-card p-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-glow text-sage-deep">
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        {d.icon}
                      </svg>
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-wide text-muted">{d.label}</p>
                      {d.href ? (
                        <a href={d.href} className="break-words font-medium transition-colors hover:text-sage-deep">
                          {d.value}
                        </a>
                      ) : (
                        <p className="break-words font-medium">{d.value}</p>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted">
              Fakturační a firemní údaje najdete také v{" "}
              <a href="/obchodni-podminky" className="text-sage-deep underline">obchodních podmínkách</a>.
            </p>
          </div>

          {/* formulář */}
          <div>
            <h2 className="font-display text-2xl tracking-tight">Napište nám</h2>
            <p className="mt-2 text-sm text-muted">Vyplňte formulář a my se ozveme co nejdříve.</p>
            <div className="mt-5">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
