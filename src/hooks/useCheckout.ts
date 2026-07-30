"use client";

import { useState } from "react";

/**
 * Spustí Shopify checkout: přes /api/checkout vytvoří košík s jedinou
 * produktovou variantou (SHOPIFY_VARIANT_ID) a přesměruje na Shopify checkout.
 */
export function useCheckout() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function startCheckout(quantity = 1) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.checkoutUrl) {
        throw new Error(data?.message || "Objednávku se nepodařilo zahájit. Zkuste to prosím znovu.");
      }
      // přesměrování na hostovaný Shopify checkout
      window.location.href = data.checkoutUrl;
      // loading necháme zapnutý, dokud probíhá přesměrování
    } catch (e) {
      setError((e as Error).message);
      setLoading(false);
    }
  }

  return { startCheckout, loading, error, clearError: () => setError(null) };
}
