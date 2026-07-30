# Napojení na Shopify Storefront API (2026)

Web používá **oficiální Shopify Storefront GraphQL API** (verze `2026-07`) a moderní
**Cart API** (`cartCreate` → `checkoutUrl`). Žádný Buy Button, žádné zastaralé Checkout API.

Tok po kliknutí na „Koupit":
1. prohlížeč zavolá serverovou route `/api/checkout`,
2. server vytvoří košík přes Storefront API a přidá jedinou variantu (`SHOPIFY_VARIANT_ID`),
3. server vrátí `checkoutUrl` a zákazník je přesměrován na hostovaný Shopify checkout.

---

## ⚡ Co se v roce 2026 změnilo (důležité)

Podle aktuální dokumentace Storefront API podporuje **tokenless přístup**, který
zahrnuje mj. **Cart (read/write)**. To znamená:

> **Pro tlačítko „Koupit" NEPOTŘEBUJETE žádný access token ani žádný scope.**
> Stačí `SHOPIFY_STORE_DOMAIN` + `SHOPIFY_VARIANT_ID`.

Implementace je na to připravená — funguje bez tokenu (tokenless), a token umí použít
jen tehdy, když ho doplníte (kvůli vyšším limitům).

### K vašim scopes
Aplikace v Dev Dashboardu má `unauthenticated_read_product_listings` a
`unauthenticated_read_product_inventory`. Ty jsou pro **čtení produktů a skladu**.
**Pro vytvoření košíku se nepoužijí** — Cart je tokenless. Nemusíte tedy nic přidávat.

> Kdybyste v budoucnu chtěli košík vytvářet **s tokenem** (ne tokenless), musel by mít
> token oprávnění **`unauthenticated_write_checkouts`** (to je „Cart object" ve Storefront
> API). Pro náš tokenless režim to ale není potřeba.

---

## 1) Povinné hodnoty

### A. Store Domain (`SHOPIFY_STORE_DOMAIN`)
Vždy adresa `*.myshopify.com` (i když máte vlastní doménu).
- Shopify admin → **Settings → Domains** → hodnota u „myshopify.com domain",
  např. `muj-obchod.myshopify.com`.

### B. Variant ID (`SHOPIFY_VARIANT_ID`)
GID varianty ve tvaru `gid://shopify/ProductVariant/CISLO`:
- Shopify admin → **Products** → otevřete produkt → klikněte na variantu.
  V URL je číslo, např. `.../variants/1234567890` →
  GID = `gid://shopify/ProductVariant/1234567890`.
- Produkt musí být **Active** a dostupný pro Online Store / prodejní kanál.
- Alternativně GID zjistíte i v **GraphiQL app** dotazem na `products`.

Toto stačí — po vyplnění těchto dvou hodnot tlačítko „Koupit" funguje.

---

## 2) (Volitelné) Access token pro vyšší limity

Tokenless přístup má limit složitosti dotazu 1000 a IP‑based rate limity, což pro
tlačítko „Koupit" bohatě stačí. Pokud přesto chcete token (vyšší limity, tagy,
metafieldy), **nejjednodušší je Headless kanál**:

1. Nainstalujte **Headless** kanál ze Shopify App Store.
2. Klikněte **Create storefront** → vygenerují se **public** i **private** access tokeny.
3. Pro server (náš případ) použijte **private access token**.
4. Oprávnění spravujete v **Sales channels → Headless → (storefront) → Storefront API
   permissions → Edit**. Pro košík zapněte **Cart / checkouts** (odpovídá
   `unauthenticated_write_checkouts`).

Token pak vložte do `.env.local`:
- privátní (server, doporučeno): `SHOPIFY_STOREFRONT_PRIVATE_TOKEN=…`
  (posílá se v hlavičce `Shopify-Storefront-Private-Token`)
- nebo veřejný: `SHOPIFY_STOREFRONT_ACCESS_TOKEN=…`
  (hlavička `X-Shopify-Storefront-Access-Token`)

> App v novém **Dev Dashboardu**: token získáte po konfiguraci Storefront API a instalaci
> aplikace na obchod (v credentials aplikace / u nainstalované aplikace v adminu).
> Pro jediný headless storefront je ale Headless kanál nejrychlejší cesta.

---

## 3) Nastavení projektu

```bash
cp .env.local.example .env.local
# vyplňte SHOPIFY_STORE_DOMAIN a SHOPIFY_VARIANT_ID
node node_modules/next/dist/bin/next build
node node_modules/next/dist/bin/next start -p 3060
```

Dokud chybí povinné proměnné, tlačítko „Koupit" zobrazí nenápadnou hlášku — web nespadne.

---

## Zdroje (aktuální Shopify dokumentace)
- Storefront API reference (tokenless + token-based, verze 2026-07):
  https://shopify.dev/docs/api/storefront
- Getting started (Headless kanál, generování tokenů):
  https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api/getting-started
- Přístupová oprávnění (Cart = `unauthenticated_write_checkouts`):
  https://shopify.dev/docs/api/usage/access-scopes
