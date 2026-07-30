/* ============================================================================
 * E2E test webu jako zákazník (Playwright / Chromium)
 * Projde všechny stránky, pořídí screenshoty, sbírá konzoli, síťové chyby,
 * kontroluje odkazy a projde purchase flow až na Shopify checkout.
 * Nic neopravuje — jen reportuje.
 *   node scripts/e2e.mjs [baseURL]
 * ========================================================================== */
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const BASE = process.argv[2] || "http://localhost:3060";
const OUT = "e2e-report";
const SHOTS = path.join(OUT, "screenshots");
fs.mkdirSync(SHOTS, { recursive: true });

const pages = [
  { path: "/", name: "01-homepage", wait: 4000, scroll: true },
  { path: "/kontakt", name: "02-kontakt", wait: 1500 },
  { path: "/obchodni-podminky", name: "03-obchodni-podminky", wait: 1200 },
  { path: "/reklamacni-rad", name: "04-reklamacni-rad", wait: 1200 },
  { path: "/odstoupeni-od-smlouvy", name: "05-odstoupeni", wait: 1200 },
  { path: "/gdpr", name: "06-gdpr", wait: 1200 },
  { path: "/cookies", name: "07-cookies", wait: 1200 },
];

const report = { base: BASE, startedAt: new Date().toISOString(), pages: [], links: {}, purchase: null };

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let y = 0;
      const step = () => {
        window.scrollBy(0, 600);
        y += 600;
        if (y >= document.body.scrollHeight) { window.scrollTo(0, 0); resolve(); }
        else setTimeout(step, 120);
      };
      step();
    });
  });
  await page.waitForTimeout(600);
}

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: "cs-CZ" });
const page = await context.newPage();

// sběr per-stránka (resetuje se před každou navigací)
let consoleMsgs = [];
let pageErrors = [];
let failedResponses = [];
let failedRequests = [];
page.on("console", (m) => consoleMsgs.push({ type: m.type(), text: m.text() }));
page.on("pageerror", (e) => pageErrors.push(String(e)));
page.on("response", (r) => { if (r.status() >= 400) failedResponses.push({ url: r.url(), status: r.status() }); });
page.on("requestfailed", (r) => failedRequests.push({ url: r.url(), error: r.failure()?.errorText || "failed" }));

const allInternalLinks = new Set();
const placeholderLinks = new Set();
const externalLinks = new Set();
const mailtoTelLinks = new Set();

let cookiesAccepted = false;

for (const p of pages) {
  consoleMsgs = []; pageErrors = []; failedResponses = []; failedRequests = [];
  const url = BASE + p.path;
  let httpStatus = null;
  try {
    const resp = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
    httpStatus = resp?.status() ?? null;
  } catch (e) {
    pageErrors.push("NAVIGATION: " + String(e));
  }
  // přijmout cookies jednou (dále už localStorage drží souhlas)
  if (!cookiesAccepted) {
    const btn = page.getByRole("button", { name: "Přijmout vše" });
    if (await btn.count()) { await btn.first().click().catch(() => {}); cookiesAccepted = true; await page.waitForTimeout(300); }
  }
  await page.waitForTimeout(p.wait);
  if (p.scroll) await autoScroll(page);

  // sběr odkazů
  const hrefs = await page.$$eval("a[href]", (as) => as.map((a) => a.getAttribute("href")));
  for (const h of hrefs) {
    if (!h) continue;
    if (h.startsWith("mailto:") || h.startsWith("tel:")) { mailtoTelLinks.add(h); continue; }
    if (h.includes("[DOPLŇTE") || /\s/.test(h.trim())) { placeholderLinks.add(h.trim()); continue; }
    if (h === "#") continue;
    if (/^https?:\/\//i.test(h)) {
      if (h.includes("localhost")) allInternalLinks.add(h);
      else externalLinks.add(h);
    } else if (h.startsWith("/")) {
      allInternalLinks.add(BASE + h);
    } else if (h.startsWith("#")) {
      /* in-page kotva, přeskočit */
    }
  }

  const shotFile = path.join(SHOTS, p.name + ".png");
  await page.screenshot({ path: shotFile, fullPage: true }).catch((e) => pageErrors.push("SCREENSHOT: " + e));

  report.pages.push({
    path: p.path,
    url,
    httpStatus,
    title: await page.title(),
    screenshot: path.relative(OUT, shotFile),
    consoleErrors: consoleMsgs.filter((m) => m.type === "error"),
    consoleWarnings: consoleMsgs.filter((m) => m.type === "warning" || m.type === "warn"),
    pageErrors: [...pageErrors],
    failedResponses: [...failedResponses],
    failedRequests: [...failedRequests],
  });
  console.log(`✓ ${p.path}  (HTTP ${httpStatus}, chyby konzole: ${consoleMsgs.filter((m) => m.type === "error").length}, síť ≥400: ${failedResponses.length})`);
}

// kontrola interních odkazů (HTTP status)
const linkResults = [];
for (const link of [...allInternalLinks].sort()) {
  try {
    const r = await context.request.get(link, { timeout: 15000 });
    linkResults.push({ link, status: r.status(), ok: r.status() < 400 });
  } catch (e) {
    linkResults.push({ link, status: null, ok: false, error: String(e) });
  }
}
report.links = {
  internal: linkResults,
  external: [...externalLinks],
  placeholders: [...placeholderLinks],
  mailtoTel: [...mailtoTelLinks],
};
console.log(`✓ zkontrolováno ${linkResults.length} interních odkazů, ${linkResults.filter((l) => !l.ok).length} nefunkčních`);

// ---- PURCHASE FLOW ----
consoleMsgs = []; failedResponses = [];
let checkoutApi = null;
page.on("response", async (r) => {
  if (r.url().includes("/api/checkout")) {
    checkoutApi = { status: r.status(), body: await r.text().catch(() => "") };
  }
});
await page.goto(BASE + "/", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(1500);
const buy = page.getByRole("link", { name: /Koupit/ }).first();
const purchase = { clicked: false, reachedShopify: false, finalUrl: null, checkoutApi: null, screenshot: null, priceVisible: null };
try {
  await buy.click({ timeout: 8000 });
  purchase.clicked = true;
  await page.waitForURL(/myshopify\.com/, { timeout: 25000 });
  purchase.reachedShopify = true;
  await page.waitForTimeout(2500);
  purchase.finalUrl = page.url();
  const shot = path.join(SHOTS, "08-shopify-checkout.png");
  await page.screenshot({ path: shot, fullPage: true }).catch(() => {});
  purchase.screenshot = path.relative(OUT, shot);
  const bodyText = await page.evaluate(() => document.body.innerText).catch(() => "");
  purchase.priceVisible = /499/.test(bodyText);
} catch (e) {
  purchase.error = String(e);
}
purchase.checkoutApi = checkoutApi;
report.purchase = purchase;
console.log(`✓ purchase flow: Shopify=${purchase.reachedShopify}, cena 499=${purchase.priceVisible}`);

report.finishedAt = new Date().toISOString();
fs.writeFileSync(path.join(OUT, "report.json"), JSON.stringify(report, null, 2));
console.log("Hotovo → " + OUT + "/report.json");

await browser.close();
