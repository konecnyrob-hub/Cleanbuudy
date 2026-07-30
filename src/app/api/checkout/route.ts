import { NextResponse } from "next/server";
import { createCheckout, isConfigured, missingConfig } from "@/lib/shopify";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/checkout
 * Body: { quantity?: number }
 * Produkt má jedinou variantu — vždy se použije SHOPIFY_VARIANT_ID ze serveru.
 * Vytvoří košík přes Shopify Storefront API a vrátí { checkoutUrl }.
 */
export async function POST(req: Request) {
  const variantId = process.env.SHOPIFY_VARIANT_ID;

  if (!isConfigured() || !variantId) {
    return NextResponse.json(
      {
        error: "SHOPIFY_NOT_CONFIGURED",
        message:
          "Shopify zatím není nastaveno. Doplňte v .env.local proměnné: " +
          missingConfig().join(", ") +
          " (návod v souboru SHOPIFY_SETUP.md).",
      },
      { status: 501 }
    );
  }

  try {
    const body = await req.json().catch(() => ({}));
    const quantity = Number(body?.quantity) > 0 ? Math.floor(Number(body.quantity)) : 1;

    // vždy jediná Shopify varianta z env, klient ji nemůže přepsat
    const checkoutUrl = await createCheckout(variantId, quantity);
    return NextResponse.json({ checkoutUrl });
  } catch (e) {
    return NextResponse.json(
      { error: "CHECKOUT_FAILED", message: (e as Error).message },
      { status: 502 }
    );
  }
}
