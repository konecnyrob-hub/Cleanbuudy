"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useState, type ReactNode } from "react";

type Props = {
  /** cesta z /public, např. images.hero ("/images/hero.webp") */
  src: string;
  /** popis fotky – slouží i jako popisek v prázdném rámečku a pro SEO/přístupnost */
  alt: string;
  /** poměr stran, např. "4 / 5", "1 / 1", "4 / 3" */
  ratio?: string;
  priority?: boolean;
  sizes?: string;
  /** třídy vnějšího rámečku (zaoblení, stín…) */
  className?: string;
  /** třídy samotného obrázku (např. hover zoom) */
  imgClassName?: string;
  /** vstupní animace při scrollu (výchozí zapnuto) */
  animate?: boolean;
  /** obsah nad fotkou – odznaky, gradienty apod. */
  children?: ReactNode;
};

/**
 * Jednotná komponenta pro VŠECHNY produktové fotografie.
 * Dokud v /public/images/ chybí soubor, zobrazí elegantní zástupný rámeček.
 * Po vložení fotky se snímek plynule načte a rozanimuje – kód se nemění.
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
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={`relative overflow-hidden bg-paper-2 ${className}`}
      style={{ aspectRatio: ratio }}
      initial={animate ? { opacity: 0, scale: reduce ? 1 : 1.06 } : false}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] as const }}
    >
      {/* zástupný rámeček – zobrazí se, dokud fotka chybí nebo se načítá */}
      <div
        className={`absolute inset-0 grid place-items-center bg-gradient-to-br from-paper-2 via-surface to-paper-2 transition-opacity duration-700 ${
          loaded ? "opacity-0" : "opacity-100"
        }`}
        aria-hidden
      >
        <div className="flex flex-col items-center gap-2 px-4 text-center text-faint">
          <svg
            viewBox="0 0 24 24"
            className="h-7 w-7"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="5" width="18" height="14" rx="3" />
            <circle cx="12" cy="12" r="3.2" />
            <path d="M8 5l1.2-2h5.6L16 5" />
          </svg>
          <span className="max-w-[14rem] text-[0.7rem] font-medium uppercase tracking-[0.18em]">
            {alt}
          </span>
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
          className={`object-cover transition-opacity duration-700 ${
            loaded ? "opacity-100" : "opacity-0"
          } ${imgClassName}`}
        />
      )}

      {children}
    </motion.div>
  );
}
