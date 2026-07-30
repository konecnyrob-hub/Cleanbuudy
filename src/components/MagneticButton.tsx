"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useRef, useState, type ReactNode, type MouseEvent } from "react";

type Props = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "ghost";
  className?: string;
  onSelect?: () => void;
  /** Pokud je zadáno, tlačítko funguje jako akce (nenaviguje). */
  onClick?: () => void;
  /** Zobrazí spinner a zablokuje interakci. */
  loading?: boolean;
};

/**
 * Prémiové tlačítko: magnetické přitahování ke kurzoru, roztažení při hoveru,
 * ripple efekt při kliknutí a pružinová fyzika. Pouze GPU transformace.
 */
export default function MagneticButton({
  children,
  href = "#",
  variant = "primary",
  className = "",
  onSelect,
  onClick,
  loading = false,
}: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 260, damping: 18, mass: 0.4 });
  const y = useSpring(my, { stiffness: 260, damping: 18, mass: 0.4 });
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  function handleMove(e: MouseEvent) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) * 0.35);
    my.set((e.clientY - (r.top + r.height / 2)) * 0.35);
  }
  function handleLeave() {
    mx.set(0);
    my.set(0);
  }
  function handleClick(e: MouseEvent) {
    if (loading) {
      e.preventDefault();
      return;
    }
    if (ref.current) {
      const r = ref.current.getBoundingClientRect();
      const id = Date.now();
      setRipples((p) => [...p, { id, x: e.clientX - r.left, y: e.clientY - r.top }]);
      setTimeout(() => setRipples((p) => p.filter((z) => z.id !== id)), 650);
    }
    if (onClick) {
      e.preventDefault();
      onClick();
    }
    onSelect?.();
  }

  const isPrimary = variant === "primary";
  const base = isPrimary
    ? "bg-ink text-white shadow-[0_18px_40px_-16px_rgba(20,22,28,0.7)]"
    : "border border-line-2 bg-white/55 text-ink backdrop-blur-md";
  const rippleColor = isPrimary ? "bg-white/35" : "bg-ink/10";

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={handleClick}
      aria-busy={loading || undefined}
      style={{ x, y }}
      whileHover={reduce || loading ? undefined : { scale: 1.05 }}
      whileTap={loading ? undefined : { scale: 0.96 }}
      transition={{ type: "spring", stiffness: 340, damping: 20, mass: 0.5 }}
      className={`group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full px-7 py-4 text-base font-medium will-change-transform ${
        loading ? "cursor-wait" : ""
      } ${base} ${className}`}
    >
      {/* světelný přejezd při hoveru */}
      {isPrimary && !loading && (
        <span className="pointer-events-none absolute inset-0 -translate-x-[130%] skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[130%]" />
      )}

      <span className={`relative z-10 inline-flex items-center gap-2.5 ${loading ? "opacity-0" : ""}`}>
        {children}
      </span>

      {loading && (
        <span className="absolute inset-0 z-10 flex items-center justify-center" aria-hidden>
          <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
            <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </span>
      )}

      {ripples.map((r) => (
        <span
          key={r.id}
          className={`pointer-events-none absolute z-0 h-3 w-3 rounded-full ${rippleColor}`}
          style={{ left: r.x, top: r.y, transform: "translate(-50%,-50%)", animation: "ripple 0.65s ease-out forwards" }}
        />
      ))}
    </motion.a>
  );
}
