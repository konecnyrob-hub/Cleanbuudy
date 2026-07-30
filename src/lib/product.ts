/* ============================================================================
 * JEDINÝ ZDROJ PRAVDY PRO OBSAH PRODUKTU
 * ----------------------------------------------------------------------------
 * Chcete-li vyměnit obsah e-shopu, upravujte POUZE tento soubor a vkládejte
 * fotografie do /public/images/. Komponenty se do dat nikdy „netrefují" ručně.
 *
 * Hodnoty označené TODO jsou zástupné – doplňte je potvrzenými informacemi
 * od dodavatele. Neuvádějte vymyšlené parametry směrem k zákazníkovi.
 * ========================================================================== */

export const brand = {
  name: "Cleaner",
  claim: "Prémiový stolní vysavač",
};

/* ---------------------------------------------------------------------------
 * CENA
 * TODO: Nastavte skutečnou prodejní cenu. Níže je pouze zástupná hodnota.
 * ------------------------------------------------------------------------- */
export const price = {
  amount: "499", // prodejní cena v Kč
  currency: "Kč",
  compareAt: "", // TODO (volitelné): původní cena pro škrtnutí, např. "1 990"
  note: "Uváděcí cena", // TODO: ověřit, zda jde o akční/uváděcí cenu
};

/** Cena pro zobrazení, např. „1 490 Kč". */
export const priceLabel = `${price.amount} ${price.currency}`;

/* ---------------------------------------------------------------------------
 * OBRÁZKY — všechny cesty míří do /public/images/
 * Nahrazení = vložení souboru se stejným názvem. Kód se nemění.
 * Doporučený formát: .webp, poměry stran dle jednotlivých sekcí.
 * ------------------------------------------------------------------------- */
export const images = {
  hero: "/images/hero.webp", // hlavní fotka, poměr 4:5
  product1: "/images/product-1.webp", // detail / úhel 1, 4:3
  product2: "/images/product-2.webp", // detail / úhel 2, 1:1
  product3: "/images/product-3.webp", // detail / úhel 3, 1:1
  detail1: "/images/detail-1.webp", // tichý chod, 4:3
  detail2: "/images/detail-2.webp", // nabíjení / baterie, 4:3
  gallery1: "/images/gallery-1.webp", // lifestyle záběr, 4:5
} as const;

/* ---------------------------------------------------------------------------
 * TECHNICKÉ PARAMETRY
 * Metrické jednotky (g, mm, ml, min, dB). „—" = zatím nepotvrzeno.
 * TODO: doplnit reálné hodnoty. Kvalitativní údaje níže vycházejí ze zadání.
 * ------------------------------------------------------------------------- */
export const specs: { label: string; value: string }[] = [
  { label: "Dobíjení", value: "USB" }, // TODO: potvrdit konektor (USB‑C?)
  { label: "Ovládání", value: "Jedno tlačítko" }, // dle zadání
  { label: "Nádoba na prach", value: "Opakovaně použitelná" }, // dle zadání
  { label: "Hmotnost", value: "—" }, // TODO: doplnit v g
  { label: "Rozměry", value: "⌀ 8,5 cm × výška 7 cm" }, // potvrzeno z produktové fotografie
  { label: "Výdrž baterie", value: "—" }, // TODO: doplnit v minutách
  { label: "Doba nabíjení", value: "—" }, // TODO: doplnit
  { label: "Kapacita baterie", value: "—" }, // TODO: doplnit v mAh
  { label: "Hlučnost", value: "—" }, // TODO: doplnit v dB
  { label: "Objem nádoby", value: "—" }, // TODO: doplnit v ml
  { label: "Materiál", value: "—" }, // TODO: doplnit
];

/* ---------------------------------------------------------------------------
 * OBSAH BALENÍ
 * TODO: Potvrďte přesný obsah balení. Nevymýšlejte příslušenství.
 * ------------------------------------------------------------------------- */
export const inBox: { name: string; detail: string }[] = [
  { name: "Stolní vysavač Cleaner", detail: "Připravený k použití" }, // dle zadání
  { name: "USB nabíjecí kabel", detail: "TODO: potvrdit typ a délku" }, // TODO
  { name: "TODO: příslušenství", detail: "TODO: doplnit dle skutečnosti" }, // TODO
  { name: "TODO: příslušenství", detail: "TODO: doplnit dle skutečnosti" }, // TODO
];

/* ---------------------------------------------------------------------------
 * OBCHODNÍ VÝHODY / ZÁRUKY
 * TODO: Upravte podle skutečných obchodních podmínek e-shopu.
 * ------------------------------------------------------------------------- */
export const guarantees = [
  "Doprava po ČR zdarma", // TODO: ověřit podmínky dopravy
  "Vrácení do 30 dnů", // TODO: ověřit
  "2 roky záruka", // TODO: ověřit délku záruky
  "Opakovaně použitelné — bez sáčků",
];

/* ---------------------------------------------------------------------------
 * SOCIÁLNÍ DŮKAZ
 * TODO: Nahraďte skutečnými recenzemi a hodnocením. Zveřejňujte jen pravdivé
 * reference. Následující texty jsou pouze zástupné.
 * ------------------------------------------------------------------------- */
export const social = {
  rating: "", // TODO: doplnit průměrné hodnocení, např. „4,9"
  reviewsCount: "", // TODO: doplnit počet recenzí, např. „2 400+"
};

export const testimonials: { quote: string; name: string; role: string }[] = [
  {
    // TODO: nahradit skutečnou recenzí zákazníka
    quote:
      "Stojí u klávesnice jako malý designový objekt. Sáhnu po něm klidně desetkrát denně a ani o tom nepřemýšlím.",
    name: "Jméno Příjmení", // TODO
    role: "Ověřený zákazník", // TODO
  },
  {
    // TODO: nahradit skutečnou recenzí zákazníka
    quote:
      "Obědvám u stolu a drobky jsem nesnášel. Jedno přejetí a je čisto. Působí to překvapivě prémiově.",
    name: "Jméno Příjmení", // TODO
    role: "Ověřený zákazník", // TODO
  },
  {
    // TODO: nahradit skutečnou recenzí zákazníka
    quote:
      "Je natolik tichý, že klávesnici čistím i během hovoru a nikdo to neslyší. Zpracování je nad očekávání.",
    name: "Jméno Příjmení", // TODO
    role: "Ověřený zákazník", // TODO
  },
];
