# Nasazení na Vercel — Cleaner

Projekt je připravený k nasazení. Design ani funkce se neměnily. Níže je přesný postup.

## Stav připravenosti (ověřeno)
- ✅ Produkční build proběhne bez chyby (`next build`).
- ✅ `/api/checkout` je serverová funkce (ƒ) — na Vercelu poběží jako Node Serverless Function.
- ✅ V kódu není žádný tajný údaj natvrdo — vše se čte z `process.env`.
- ✅ `.env.local` je v `.gitignore`, do repozitáře se nedostane.
- ✅ Testovací nástroj Playwright odebrán z `package.json` (čistý, rychlý build).

---

## Krok 1 — Git repozitář (jen `mote-store`)

Projekt zatím není git repo. Nadřazená složka obsahuje i jiné projekty, proto verzuj
**pouze složku `mote-store`**. Z jejího kořene spusť:

```bash
git init
git add .
git commit -m "Cleaner e-shop – initial"
git branch -M main
```

Vytvoř prázdný repozitář na GitHubu (bez README) a připoj ho:

```bash
git remote add origin https://github.com/<ucet>/<repo>.git
git push -u origin main
```

> `.env.local` se díky `.gitignore` nenahraje — to je správně.

## Krok 2 — Import do Vercelu

1. https://vercel.com → **Add New… → Project** → **Import** tvůj GitHub repozitář.
2. **Framework Preset:** Next.js (detekuje se automaticky).
3. **Root Directory:** pokud jsi verzoval přímo `mote-store`, nech `./`.
   Pokud jsi pushnul nadřazenou složku, nastav Root Directory na `mote-store`.
4. Build & Output nech výchozí (Vercel spustí `npm install` a build skript).

## Krok 3 — Environment Variables

V importu (nebo Project → **Settings → Environment Variables**) přidej:

| Název | Hodnota | Prostředí | Pozn. |
|-------|---------|-----------|-------|
| `SHOPIFY_STORE_DOMAIN` | `<tvůj-obchod>.myshopify.com` | Production (i Preview) | povinné |
| `SHOPIFY_VARIANT_ID` | `gid://shopify/ProductVariant/<ID>` | Production (i Preview) | povinné |
| `SHOPIFY_API_VERSION` | `2026-07` | Production | volitelné (výchozí 2026-07) |
| `NEXT_PUBLIC_SITE_URL` | `https://<tvoje-produkční-URL>` | Production | volitelné — pro Open Graph; musí být už při buildu |
| `SHOPIFY_STOREFRONT_PRIVATE_TOKEN` | *(jen chceš-li token)* | Production | volitelné, označ jako **Sensitive** |

> Hodnoty jsou stejné jako v lokálním `.env.local`. Doménu ani variant ID **nevkládej do
> kódu** — patří jen sem. Košík funguje i bez tokenu (Storefront API tokenless).

Po přidání proměnných spusť **Deploy** (nebo Redeploy, pokud jsi je přidával až potom).

## Krok 4 — Ověření po nasazení

Na produkční adrese (`https://<projekt>.vercel.app`):
1. Otevři web → projdi stránky, patičku, právní odkazy.
2. Klikni na **„Koupit"** → musí přesměrovat na
   `https://<tvůj-obchod>.myshopify.com/checkouts/...` s produktem za **499 Kč**.
3. Rychlý test API přímo:
   ```bash
   curl -s -X POST https://<projekt>.vercel.app/api/checkout \
     -H "Content-Type: application/json" -d '{"quantity":1}'
   ```
   Očekávaný výstup: `{"checkoutUrl":"https://<tvůj-obchod>.myshopify.com/cart/..."}`.
   Pokud dostaneš `501 SHOPIFY_NOT_CONFIGURED`, chybí env proměnné → doplň a redeploy.

## Poznámky
- **Node.js:** Vercel použije výchozí verzi (20/22), Next 16 je kompatibilní. Volitelně
  lze zafixovat v Project → Settings → General → Node.js Version.
- **Custom doména:** Project → Settings → Domains. Poté nastav `NEXT_PUBLIC_SITE_URL`
  na tuto doménu a redeploy (kvůli správným OG odkazům).
- **Shopify checkout:** obchod musí zůstat odemčený (aktivní Online Store / plán),
  jinak checkout neproběhne.
- **E2E testy:** Playwright byl odebrán z produkčních závislostí. Pro lokální spuštění
  testů ho nainstaluj zpět: `npm i -D @playwright/test && node node_modules/playwright-core/cli.js install chromium`.
