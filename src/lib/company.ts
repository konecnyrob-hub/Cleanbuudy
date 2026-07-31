/* ============================================================================
 * FIREMNÍ, KONTAKTNÍ A PRÁVNÍ ÚDAJE — JEDINÝ ZDROJ PRAVDY
 * ----------------------------------------------------------------------------
 * Identifikační údaje provozovatele. Používá to patička, kontaktní stránka,
 * právní stránky i souhrn objednávky. Změna se propíše všude.
 * ========================================================================== */

export const company = {
  brand: "Cleaner",
  legalName: "Robin Konečný",
  ico: "19950713",
  dic: "Neplátce DPH",
  registration:
    "Fyzická osoba podnikající zapsaná v živnostenském rejstříku.",
  address: {
    street: "Zelinova 5589",
    city: "Zlín",
    zip: "760 05",
    country: "Česká republika",
  },
  email: "robinkonecny1@seznam.cz",
  phone: "", // nezadáno – kontakt probíhá e-mailem
  website: "cleanner.cz",
  effectiveDate: "31. 7. 2026",
  supportHours: "Po–Pá 9:00–17:00",
  // Doplňte reálné odkazy, jakmile budou účty. Prázdné = v patičce se nezobrazí.
  social: {
    instagram: "",
    facebook: "",
    tiktok: "",
  },
};

/** Jednořádková adresa pro zobrazení. */
export const addressLine = `${company.address.street}, ${company.address.zip} ${company.address.city}, ${company.address.country}`;

/* Doprava a vrácení — používá souhrn objednávky i právní stránky. */
export const shipping = {
  priceLabel: "Zdarma", // TODO: ověřit (nebo doplnit částku, např. „79 Kč")
  isFree: true, // TODO
  deliveryDays: "3–5 pracovních dnů",
  carrier: "", // dopravce a cena se zobrazí v pokladně (Shopify checkout)
  returnDays: 14, // zákonná lhůta pro spotřebitele
};

/* Odkazy na právní a informační stránky (App Router routes). */
export const legalLinks = [
  { label: "Obchodní podmínky", href: "/obchodni-podminky" },
  { label: "Reklamační řád", href: "/reklamacni-rad" },
  { label: "Odstoupení od smlouvy", href: "/odstoupeni-od-smlouvy" },
  { label: "Ochrana osobních údajů (GDPR)", href: "/gdpr" },
  { label: "Zásady používání cookies", href: "/cookies" },
];
