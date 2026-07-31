# Připojení vlastní domény k webu (Vercel)

Projekt na Vercelu: **cleanbuudy** · aktuální adresa: `https://cleanbuudy.vercel.app`

---

## Krok 0 — Měj doménu koupenou
Pokud ještě nemáš, kup doménu u libovolného registrátora (Wedos, Forpsi, Cloudflare,
Namecheap, …). Registraci/platbu musíš udělat ty.

## Krok 1 — Přidej doménu ve Vercelu
1. https://vercel.com → projekt **cleanbuudy** → **Settings → Domains**.
2. Napiš doménu, např. `mojedomena.cz`, a klikni **Add**.
3. Přidej i variantu s `www`: `www.mojedomena.cz`.
   - Vercel se zeptá, která má být hlavní. Doporučení: hlavní `mojedomena.cz`,
     a `www.mojedomena.cz` → **Redirect** na hlavní (nebo naopak, dle preference).
4. Vercel ti hned ukáže **konkrétní DNS hodnoty** — ty použij v kroku 2.

## Krok 2 — Nastav DNS u registrátora
Přihlas se ke svému registrátorovi a do DNS zóny přidej záznamy, které ukázal Vercel.
Obvykle jedna ze dvou variant:

### Varianta A — jen přidat záznamy (DNS zůstává u registrátora)
| Typ | Název / Host | Hodnota | TTL |
|-----|--------------|---------|-----|
| `A` | `@` (kořen/apex) | `76.76.21.21` | auto / 3600 |
| `CNAME` | `www` | `cname.vercel-dns.com` | auto / 3600 |

> Použij **přesně** hodnoty z Vercel → Domains (IP i CNAME cíl se mohou lišit).
> Pokud u apexu (`@`) registrátor nepovoluje CNAME, použij `A` záznam (viz výše).

### Varianta B — přesměrovat nameservery na Vercel
Vercel ukáže nameservery (např. `ns1.vercel-dns.com`, `ns2.vercel-dns.com`).
Ty nastav u registrátora jako **nameservery domény**. DNS pak spravuje celé Vercel.

### Poznámky k registrátorům
- **Cloudflare:** u záznamů dej „proxy status" na **DNS only** (šedý mrak), jinak se
  bije SSL s Vercelem.
- **Wedos / Forpsi:** hledej sekci **DNS záznamy** u domény, přidej A + CNAME dle tabulky.

## Krok 3 — Počkej na ověření a HTTPS
- Propagace DNS trvá od pár minut do několika hodin.
- Ve Vercel → Domains uvidíš u domény zelené **Valid Configuration**.
- Vercel **automaticky vystaví SSL certifikát** (HTTPS) — nic neděláš.

## Krok 4 — Nastav správnou URL pro SEO / sdílení
Aby OpenGraph a canonical odkazy mířily na novou doménu:

**Ve Vercelu:** Settings → **Environment Variables** → přidej/uprav (Production):
```
NEXT_PUBLIC_SITE_URL = https://mojedomena.cz
```
Pak **Redeploy** (Deployments → … → Redeploy), aby se hodnota propsala do buildu.

> Nebo mi řekni doménu a tuto proměnnou (a případně výchozí hodnotu v kódu) upravím
> a pushnu za tebe.

## Krok 5 — Ověření
1. Otevři `https://mojedomena.cz` — musí načíst web (zámek HTTPS v prohlížeči).
2. Zkus `https://www.mojedomena.cz` — má přesměrovat na hlavní variantu.
3. Klikni „Koupit" → přesměruje na Shopify checkout (funguje nezávisle na doméně).

---

### Rychlý přehled
1. Vercel → Settings → Domains → Add doménu (+ www).
2. U registrátora přidej DNS (`A @ → 76.76.21.21`, `CNAME www → cname.vercel-dns.com`)
   nebo nastav nameservery.
3. Počkej na ověření + automatické HTTPS.
4. Nastav `NEXT_PUBLIC_SITE_URL` na novou doménu a redeploy.
