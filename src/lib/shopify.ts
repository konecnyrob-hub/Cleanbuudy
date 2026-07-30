/* ============================================================================
 * SHOPIFY STOREFRONT API (GraphQL) — Cart API, verze 2026-07
 * ----------------------------------------------------------------------------
 * Aktuální dokumentace (2026): Storefront API podporuje TOKENLESS přístup,
 * který zahrnuje mj. „Cart (read/write)". Pro tlačítko „Koupit" (cartCreate)
 * tedy NENÍ potřeba žádný access token ani scope — stačí doména a varianta.
 *
 * Token je VOLITELNÝ (vyšší limity / přístup k tagům, metafieldům apod.):
 *   - privátní token (server) → hlavička Shopify-Storefront-Private-Token
 *   - veřejný token (browser) → hlavička X-Shopify-Storefront-Access-Token
 *
 * Proměnné v .env.local (viz .env.local.example a SHOPIFY_SETUP.md):
 *   SHOPIFY_STORE_DOMAIN              povinné, např. muj-obchod.myshopify.com
 *   SHOPIFY_VARIANT_ID               povinné, gid://shopify/ProductVariant/123
 *   SHOPIFY_API_VERSION              volitelné, výchozí 2026-07
 *   SHOPIFY_STOREFRONT_PRIVATE_TOKEN volitelné (server, doporučeno má-li token)
 *   SHOPIFY_STOREFRONT_ACCESS_TOKEN  volitelné (veřejný token)
 * ========================================================================== */

const domain = process.env.SHOPIFY_STORE_DOMAIN;
const privateToken = process.env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN;
const publicToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const apiVersion = process.env.SHOPIFY_API_VERSION || "2026-07";

/** Pro cart/checkout stačí doména (Cart je tokenless). */
export function isConfigured(): boolean {
  return Boolean(domain);
}

/** Vrátí seznam chybějících POVINNÝCH proměnných. */
export function missingConfig(): string[] {
  const missing: string[] = [];
  if (!domain) missing.push("SHOPIFY_STORE_DOMAIN");
  if (!process.env.SHOPIFY_VARIANT_ID) missing.push("SHOPIFY_VARIANT_ID");
  return missing;
}

/** Autentizační hlavičky — prázdné = tokenless (dostačuje pro Cart). */
function authHeaders(): Record<string, string> {
  if (privateToken) return { "Shopify-Storefront-Private-Token": privateToken };
  if (publicToken) return { "X-Shopify-Storefront-Access-Token": publicToken };
  return {};
}

type GraphQLResponse<T> = {
  data?: T;
  errors?: { message: string }[];
};

/** Nízkoúrovňový dotaz na Storefront GraphQL API. */
async function storefront<T>(query: string, variables: Record<string, unknown>): Promise<T> {
  if (!domain) {
    throw new Error("Shopify není nakonfigurováno (chybí SHOPIFY_STORE_DOMAIN).");
  }

  const endpoint = `https://${domain}/api/${apiVersion}/graphql.json`;
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });

  const json = (await res.json()) as GraphQLResponse<T>;

  if (!res.ok) {
    throw new Error(`Shopify API vrátilo ${res.status}. Zkontrolujte doménu a verzi API.`);
  }
  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join("; "));
  }
  if (!json.data) {
    throw new Error("Shopify API nevrátilo žádná data.");
  }
  return json.data;
}

const CART_CREATE = /* GraphQL */ `
  mutation cartCreate($lines: [CartLineInput!]!) {
    cartCreate(input: { lines: $lines }) {
      cart {
        id
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`;

type CartCreateData = {
  cartCreate: {
    cart: { id: string; checkoutUrl: string } | null;
    userErrors: { field: string[] | null; message: string }[];
  };
};

/**
 * Vytvoří košík se zvolenou variantou a vrátí URL na Shopify checkout.
 * @param variantId GID varianty, např. "gid://shopify/ProductVariant/123"
 */
export async function createCheckout(variantId: string, quantity = 1): Promise<string> {
  const data = await storefront<CartCreateData>(CART_CREATE, {
    lines: [{ merchandiseId: variantId, quantity }],
  });

  const { cart, userErrors } = data.cartCreate;
  if (userErrors?.length) {
    throw new Error(userErrors.map((e) => e.message).join("; "));
  }
  if (!cart?.checkoutUrl) {
    throw new Error("Nepodařilo se vytvořit košík. Zkontrolujte SHOPIFY_VARIANT_ID.");
  }
  return cart.checkoutUrl;
}
