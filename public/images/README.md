# Produktové fotografie

Sem vložte skutečné fotografie produktu. Kód se nemění — stačí nahradit soubory
se stejným názvem (doporučený formát **.webp**). Do vložení fotek zobrazuje web
elegantní zástupný rámeček.

Cesty jsou definované v `src/lib/product.ts` (objekt `images`).

| Soubor           | Použití                        | Doporučený poměr |
| ---------------- | ------------------------------ | ---------------- |
| `hero.webp`      | Hlavní fotka v úvodu           | 4 : 5 (na výšku) |
| `product-1.webp` | „Jak to funguje" + cenová karta| 4 : 3 / 1 : 1    |
| `detail-1.webp`  | Sekce „Tichý chod"             | 16 : 9           |
| `detail-2.webp`  | Sekce „Baterie / nabíjení"     | 16 : 9           |
| `gallery-1.webp` | Lifestyle + obsah balení       | 4 : 5 / 1 : 1    |

Tip: fotky exportujte v dostatečném rozlišení (delší hrana ~2000 px) a jako WebP
kvůli rychlému načítání.
