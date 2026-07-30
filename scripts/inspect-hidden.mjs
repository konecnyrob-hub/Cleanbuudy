import { chromium } from "playwright";
const BASE = process.argv[2] || "http://localhost:3060";
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: "cs-CZ" });
const page = await ctx.newPage();
await page.goto(BASE + "/", { waitUntil: "domcontentloaded" });
const acc = page.getByRole("button", { name: "Přijmout vše" }); if (await acc.count()) await acc.first().click().catch(()=>{});
await page.waitForTimeout(3000);
await page.evaluate(async () => { await new Promise(r=>{let y=0,h=document.body.scrollHeight;const s=()=>{scrollBy(0,250);y+=250;y>=h?r():setTimeout(s,320)};s()}); });
await page.waitForTimeout(1500);
const hidden = await page.evaluate(() => [...document.querySelectorAll("main *")]
  .filter(el => getComputedStyle(el).opacity === "0" && el.getBoundingClientRect().height > 40)
  .map(el => ({ tag: el.tagName, cls: (el.className||"").toString().slice(0,50), txt: (el.innerText||"").replace(/\s+/g," ").slice(0,60) })));
console.log(JSON.stringify(hidden, null, 1));
await browser.close();
