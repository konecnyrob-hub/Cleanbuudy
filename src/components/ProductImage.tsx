"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  src: string;
  alt: string;
  ratio?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  imgClassName?: string;
  animate?: boolean;
  children?: ReactNode;
};

/**
 * Jednotná komponenta pro produktové fotografie.
 * Zástupný rámeček dokud fotka chybí/načítá se; vstupní zoom-in přes CSS
 * (IntersectionObserver, bez animačních knihoven).
 */
export default function ProductImage({
  src,
  alt,
  ratio = "4 / 5",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  className = "",
  imgClassName = "",
  animate = true,
  children,
}: Props) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [shown, setShown] = useState(!animate);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!animate) return;
    const el = ref.current;
    if (!el) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -60px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [animate]);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden bg-paper-2 ${animate ? "img-reveal" : ""} ${shown ? "img-reveal-in" : ""} ${className}`}
      style={{ aspectRatio: ratio }}
    >
      {/* zástupný rámeček */}
      <div
        className={`absolute inset-0 grid place-items-center bg-gradient-to-br from-paper-2 via-surface to-paper-2 transition-opacity duration-700 ${
          loaded ? "opacity-0" : "opacity-100"
        }`}
        aria-hidden
      >
        <div className="flex flex-col items-center gap-2 px-4 text-center text-faint">
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="5" width="18" height="14" rx="3" />
            <circle cx="12" cy="12" r="3.2" />
            <path d="M8 5l1.2-2h5.6L16 5" />
          </svg>
          <span className="max-w-[14rem] text-[0.7rem] font-medium uppercase tracking-[0.18em]">{alt}</span>
        </div>
      </div>

      {!failed && (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`object-cover transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"} ${imgClassName}`}
        />
      )}

      {children}
    </div>
  );
}
