// Vypíše produkty a jejich varianty (GID) pro SHOPIFY_VARIANT_ID.
//
// Použití:
//   Storefront API (tokenless, vyžaduje odemčený Online Store):
//     node scripts/get-variant-id.mjs <domena.myshopify.com>
//   Admin API (funguje i při zamčeném Online Store, potřebuje Admin token):
//     SHOPIFY_ADMIN_TOKEN=shpat_xxx node scripts/get-variant-id.mjs <domena.myshopify.com>
const domain = process.argv[2] || process.env.SHOPIFY_STORE_DOMAIN;
const version = process.env.SHOPIFY_API_VERSION || "2026-07";
const adminToken = process.env.SHOPIFY_ADMIN_TOKEN;
if (!domain) { console.error("Chybí doména."); process.exit(1); }

const useAdmin = Boolean(adminToken);
const endpoint = useAdmin
  ? `https://${domain}/admin/api/${version}/graphql.json`
  : `https://${domain}/api/${version}/graphql.json`;
const headers = { "Content-Type": "application/json" };
if (useAdmin) headers["X-Shopify-Access-Token"] = adminToken;

const query = `{
  products(first: 50) {
    edges { node {
      handle title 
      variants(first: 50) { edges { node { id title sku ${useAdmin ? "inventoryQuantity price" : "availableForSale price { amount currencyCode }"} } } }
    } }
  }
}`;

console.log(`Zdroj: ${useAdmin ? "Admin API" : "Storefront API (tokenless)"} · ${endpoint}\n`);
const res = await fetch(endpoint, { method: "POST", headers, body: JSON.stringify({ query }) });
const json = await res.json().catch(() => ({}));
if (!res.ok) { console.error(`HTTP ${res.status}`, JSON.stringify(json).slice(0, 400)); process.exit(1); }
if (json.errors) { console.error("Chyba API:", JSON.stringify(json.errors, null, 2)); process.exit(1); }
const products = json.data?.products?.edges ?? [];
if (!products.length) { console.log("Žádné produkty nenalezeny."); process.exit(0); }
for (const { node: p } of products) {
  console.log(`▸ ${p.title}  (handle: ${p.handle}, status: ${p.status})`);
  for (const { node: v } of p.variants.edges) {
    const price = useAdmin ? v.price : (v.price ? `${v.price.amount} ${v.price.currencyCode}` : "—");
    console.log(`   • ${v.title} | cena ${price} | SKU: ${v.sku || "—"}`);
    console.log(`     SHOPIFY_VARIANT_ID=${v.id}\n`);
  }
}
