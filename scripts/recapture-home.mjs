import { chromium } from "playwright";
const BASE = process.argv[2] || "http://localhost:3060";
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: "cs-CZ" });
const page = await ctx.newPage();
const hiddenCounts = [];
await page.goto(BASE + "/", { waitUntil: "domcontentloaded" });
const acc = page.getByRole("button", { name: "Přijmout vše" });
if (await acc.count()) await acc.first().click().catch(()=>{});
await page.waitForTimeout(3500); // hero morph
// pomalý scroll, aby IntersectionObserver stihl každou sekci
await page.evaluate(async () => {
  await new Promise((res) => {
    let y = 0;
    const h = document.body.scrollHeight;
    const step = () => {
      window.scrollBy(0, 250);
      y += 250;
      if (y >= h) res(); else setTimeout(step, 320);
    };
    step();
  });
});
await page.waitForTimeout(1200);
// kolik reveal prvků zůstalo skrytých (opacity 0)?
const stillHidden = await page.evaluate(() => {
  return [...document.querySelectorAll("main *")].filter(el => {
    const s = getComputedStyle(el);
    return s.opacity === "0" && el.getBoundingClientRect().height > 40;
  }).length;
});
console.log("Reveal prvků stále skrytých po pomalém scrollu:", stillHidden);
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(500);
await page.screenshot({ path: "e2e-report/screenshots/01-homepage.png", fullPage: true });
console.log("Homepage screenshot přepořízen.");
await browser.close();
