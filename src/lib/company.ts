/* ============================================================================
 * FIREMNÍ, KONTAKTNÍ A PRÁVNÍ ÚDAJE — JEDINÝ ZDROJ PRAVDY
 * ----------------------------------------------------------------------------
 * Doplňte reálné hodnoty na místech označených [DOPLŇTE …] (TODO).
 * Používá to patička, kontaktní stránka, právní stránky i souhrn objednávky.
 * ========================================================================== */

export const company = {
  brand: "Cleaner",
  legalName: "[DOPLŇTE obchodní jméno / jméno OSVČ]", // TODO
  ico: "[DOPLŇTE IČO]", // TODO
  dic: "[DOPLŇTE DIČ / „Nejsme plátci DPH“]", // TODO
  registration:
    "[DOPLŇTE zápis — např. „zapsáno v živnostenském rejstříku“ nebo spisová značka u rejstříkového soudu]", // TODO
  address: {
    street: "[DOPLŇTE ulice a č. p.]", // TODO
    city: "[DOPLŇTE město]", // TODO
    zip: "[DOPLŇTE PSČ]", // TODO
    country: "Česká republika",
  },
  email: "[DOPLŇTE e-mail]", // TODO – např. info@cleaner.cz
  phone: "[DOPLŇTE telefon]", // TODO – např. +420 …
  supportHours: "Po–Pá 9:00–17:00",
  social: {
    instagram: "[DOPLŇTE odkaz na Instagram]", // TODO
    facebook: "[DOPLŇTE odkaz na Facebook]", // TODO
    tiktok: "[DOPLŇTE odkaz na TikTok]", // TODO
  },
};

/** Jednořádková adresa pro zobrazení. */
export const addressLine = `${company.address.street}, ${company.address.zip} ${company.address.city}, ${company.address.country}`;

/* Doprava a vrácení — používá souhrn objednávky i právní stránky. */
export const shipping = {
  priceLabel: "Zdarma", // TODO: ověřit (nebo doplnit částku, např. „79 Kč")
  isFree: true, // TODO
  deliveryDays: "3–5 pracovních dnů",
  carrier: "[DOPLŇTE dopravce]", // TODO – např. Zásilkovna / PPL / Česká pošta
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
