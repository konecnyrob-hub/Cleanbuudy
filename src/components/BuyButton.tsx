"use client";

import { useEffect } from "react";
import MagneticButton from "./MagneticButton";
import { useCheckout } from "@/hooks/useCheckout";

type Props = {
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
};

/**
 * Tlačítko „Koupit": přes Shopify Storefront API vytvoří košík s jedinou
 * produktovou variantou (SHOPIFY_VARIANT_ID) a přesměruje na Shopify checkout.
 * Při chybě zobrazí nenápadný toast.
 */
export default function BuyButton({ children, variant = "primary", className }: Props) {
  const { startCheckout, loading, error, clearError } = useCheckout();

  useEffect(() => {
    if (!error) return;
    const t = setTimeout(clearError, 7000);
    return () => clearTimeout(t);
  }, [error, clearError]);

  return (
    <>
      <MagneticButton
        variant={variant}
        className={className}
        loading={loading}
        onClick={() => startCheckout()}
      >
        {children}
      </MagneticButton>

      {error && (
        <div
          role="alert"
          className="fixed inset-x-4 bottom-4 z-[70] mx-auto max-w-md rounded-2xl border border-line-2 bg-surface/90 p-4 text-sm shadow-[0_30px_60px_-30px_rgba(26,24,19,0.5)] backdrop-blur-xl sm:inset-x-auto sm:right-6"
        >
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ink text-white">!</span>
            <p className="leading-relaxed text-ink-2">{error}</p>
            <button onClick={clearError} aria-label="Zavřít" className="ml-auto text-muted hover:text-ink">
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
