import Link from "next/link";
import { company, addressLine, legalLinks } from "@/lib/company";

const nav = [
  { label: "Domů", href: "/" },
  { label: "Produkt", href: "/#buy" },
  { label: "Kontakt", href: "/kontakt" },
];

const socials = [
  {
    label: "Instagram",
    href: company.social.instagram,
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    label: "Facebook",
    href: company.social.facebook,
    icon: <path d="M14 8h2V5h-2c-1.7 0-3 1.3-3 3v2H9v3h2v6h3v-6h2l1-3h-3V8z" />,
  },
  {
    label: "TikTok",
    href: company.social.tiktok,
    icon: <path d="M15 4c.5 2 2 3.5 4 3.7V11c-1.6 0-3-.5-4-1.3V15a5 5 0 1 1-5-5v3a2 2 0 1 0 2 2V4h3z" />,
  },
];

export default function Footer() {
  return (
    <footer className="relative z-[2] border-t border-line-2 bg-paper-2">
      <div className="container-x py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.3fr_1.3fr]">
          {/* značka */}
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink">
                <span className="h-2.5 w-2.5 rounded-full bg-lime" />
              </span>
              <span className="text-[1.15rem] font-semibold tracking-tight">cleaner</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Mini stolní vysavač pro čistý a klidný pracovní stůl. Tichý,
              opakovaně použitelný a vždy po ruce.
            </p>
            <div className="mt-5 flex gap-2.5">
              {socials.filter((s) => s.href).map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-line-2 bg-surface text-ink-2 transition-colors hover:bg-card hover:text-ink"
                >
                  <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    {s.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* navigace */}
          <div>
            <p className="text-sm font-medium">Navigace</p>
            <ul className="mt-4 space-y-2.5">
              {nav.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-muted transition-colors hover:text-ink">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* informace / právní */}
          <div>
            <p className="text-sm font-medium">Informace</p>
            <ul className="mt-4 space-y-2.5">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-muted transition-colors hover:text-ink">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* kontakt */}
          <div>
            <p className="text-sm font-medium">Kontakt</p>
            <ul className="mt-4 space-y-2.5 text-sm text-muted">
              <li>
                <a href={`mailto:${company.email}`} className="transition-colors hover:text-ink">
                  {company.email}
                </a>
              </li>
              {company.phone && (
                <li>
                  <a href={`tel:${company.phone.replace(/\s/g, "")}`} className="transition-colors hover:text-ink">
                    {company.phone}
                  </a>
                </li>
              )}
              <li>IČO: {company.ico}</li>
              <li>DIČ: {company.dic}</li>
              <li className="max-w-[16rem] leading-relaxed">{addressLine}</li>
            </ul>
          </div>
        </div>

        {/* spodní lišta */}
        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-line pt-8 text-sm text-muted sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {company.legalName} · IČO {company.ico}
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/gdpr" className="transition-colors hover:text-ink">
              Ochrana osobních údajů
            </Link>
            <Link href="/obchodni-podminky" className="transition-colors hover:text-ink">
              Obchodní podmínky
            </Link>
            <Link href="/cookies" className="transition-colors hover:text-ink">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
