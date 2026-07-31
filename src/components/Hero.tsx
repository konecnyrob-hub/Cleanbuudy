"use client";

import Image from "next/image";
import { useMemo, useRef, type CSSProperties } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useVelocity,
  useScroll,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import MagneticButton from "./MagneticButton";
import BuyButton from "./BuyButton";
import { images, priceLabel } from "@/lib/product";

/* pružiny s váhou (ambient život hera) */
const SPRING_FOLLOW = { stiffness: 90, damping: 20, mass: 0.7 } as const;
const SPRING_SPOT = { stiffness: 110, damping: 20, mass: 0.5 } as const;
const SPRING_SCROLL = { stiffness: 80, damping: 26, restDelta: 0.0004 } as const;

/* deterministický PRNG → žádný hydration mismatch */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function Hero() {
  const reduce = !!useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  /* kurzor */
  const nx = useMotionValue(0.5);
  const ny = useMotionValue(0.5);
  const pxv = useMotionValue(0);
  const pyv = useMotionValue(0);
  const nxs = useSpring(nx, SPRING_FOLLOW);
  const nys = useSpring(ny, SPRING_FOLLOW);
  const pxs = useSpring(pxv, SPRING_SPOT);
  const pys = useSpring(pyv, SPRING_SPOT);

  function onMove(e: React.MouseEvent) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    nx.set((e.clientX - r.left) / r.width);
    ny.set((e.clientY - r.top) / r.height);
    pxv.set(e.clientX - r.left);
    pyv.set(e.clientY - r.top);
  }

  /* parallaxy vrstev */
  const l2x = useTransform(nxs, [0, 1], [30, -30]);
  const l2y = useTransform(nys, [0, 1], [20, -20]);
  const l3x = useTransform(nxs, [0, 1], [-18, 18]);
  const l3y = useTransform(nys, [0, 1], [-14, 14]);
  const l4x = useTransform(nxs, [0, 1], [12, -12]);

  /* produkt: náklon, záře, odlesk */
  const rotY = useTransform(nxs, [0, 1], [11, -11]);
  const rotX = useTransform(nys, [0, 1], [-8, 8]);
  const glowX = useTransform(nxs, [0, 1], [-30, 30]);
  const glowY = useTransform(nys, [0, 1], [-20, 20]);
  const shadowX = useTransform(nxs, [0, 1], [16, -16]);
  const reflX = useTransform(nxs, [0, 1], ["-24%", "24%"]);
  const nxVel = useVelocity(nxs);
  const reflOpacityRaw = useTransform(nxVel, (v) => Math.min(0.8, 0.3 + Math.abs(v) * 0.16));
  const reflOpacity = useSpring(reflOpacityRaw, { stiffness: 90, damping: 26 });

  /* spotlight */
  const spotX = useTransform(pxs, (v) => v - 320);
  const spotY = useTransform(pys, (v) => v - 320);

  /* máslově plynulý scroll */
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const prog = useSpring(scrollYProgress, SPRING_SCROLL);
  const contentY = useTransform(prog, [0, 1], [0, -100]);
  const contentOpacity = useTransform(prog, [0, 0.55], [1, 0]);
  const prodScale = useTransform(prog, [0, 1], [1, 1.24]);
  const prodScrollY = useTransform(prog, [0, 1], [0, -46]);
  const particlesOpacity = useTransform(prog, [0, 0.8], [0.55, 1]);

  /* částice */
  const motes = useMemo(() => {
    const rand = mulberry32(20260725);
    return Array.from({ length: 14 }, (_, i) => ({
      id: i,
      left: rand() * 100,
      top: rand() * 100,
      size: 2 + rand() * 3,
      dur: 10 + rand() * 12,
      delay: rand() * 8,
      opacity: 0.08 + rand() * 0.16,
    }));
  }, []);

  return (
    <section
      id="top"
      ref={ref}
      onMouseMove={onMove}
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-white"
    >
      {/* VRSTVA 1 — pohyblivý gradient */}
      <div className="anim-gradient pointer-events-none absolute -inset-[15%] -z-50 bg-[radial-gradient(60%_60%_at_30%_25%,var(--color-sky-soft),transparent_60%),radial-gradient(50%_50%_at_75%_70%,#eef3fb,transparent_60%),linear-gradient(180deg,#ffffff,var(--color-mist))]" />

      {/* VRSTVA 2 — rozmazané kruhy */}
      <motion.div style={{ x: l2x, y: l2y }} className="pointer-events-none absolute inset-0 -z-40 will-change-transform">
        <div className="absolute left-[12%] top-[18%] h-80 w-80 rounded-full bg-sky-glow opacity-60 blur-[110px]" />
        <div className="absolute right-[10%] top-[26%] h-72 w-72 rounded-full bg-[#e7ecf6] opacity-70 blur-[120px]" />
        <div className="absolute bottom-[8%] left-1/2 h-72 w-96 -translate-x-1/2 rounded-full bg-sky-soft opacity-70 blur-[120px]" />
      </motion.div>

      {/* VRSTVA 4 — světelné paprsky */}
      <motion.div style={{ x: l4x }} className="pointer-events-none absolute inset-0 -z-30 overflow-hidden will-change-transform">
        <div className="anim-ray absolute -top-1/4 left-[20%] h-[150%] w-40 bg-gradient-to-b from-white/70 via-sky-soft/40 to-transparent blur-2xl" />
        <div className="anim-ray absolute -top-1/4 left-[58%] h-[150%] w-28 bg-gradient-to-b from-white/60 via-white/20 to-transparent blur-2xl [animation-delay:-6s]" />
      </motion.div>

      {/* VRSTVA 3 — částice */}
      <motion.div
        style={{ x: l3x, y: l3y, opacity: reduce ? 0.5 : particlesOpacity }}
        className="pointer-events-none absolute inset-0 -z-20 will-change-transform"
      >
        {motes.map((m) => (
          <span
            key={m.id}
            className="absolute rounded-full bg-sky-deep will-change-transform"
            style={{
              left: `${m.left}%`,
              top: `${m.top}%`,
              width: m.size,
              height: m.size,
              opacity: m.opacity,
              animation: reduce ? "none" : `moteDrift ${m.dur}s ease-in-out ${m.delay}s infinite`,
            }}
          />
        ))}
      </motion.div>

      {/* spotlight */}
      {!reduce && (
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <motion.div
            style={{ x: spotX, y: spotY }}
            className="absolute left-0 top-0 h-[640px] w-[640px] rounded-full bg-[radial-gradient(circle,rgba(160,190,255,0.16),transparent_60%)] will-change-transform"
          />
        </div>
      )}

      {/* OBSAH */}
      <motion.div
        style={{ y: reduce ? undefined : contentY, opacity: reduce ? undefined : contentOpacity }}
        className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center gap-5 px-6 pt-24 pb-20 text-center sm:gap-6 sm:pt-28"
      >
        {/* eyebrow */}
        <span
          className="hero-reveal inline-flex items-center gap-2 rounded-full border border-line-2 bg-white/55 px-4 py-1.5 text-xs font-medium tracking-wide text-ink-2 backdrop-blur-md"
          style={{ "--hr-delay": "0.05s" } as CSSProperties}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-sky-deep" />
          Představujeme Cleaner
        </span>

        {/* hlavní nadpis — extra bold, druhá řádka v modrém gradientu */}
        <h1
          className="hero-reveal text-balance text-5xl font-black leading-[1.02] tracking-[-0.03em] text-ink sm:text-6xl lg:text-7xl"
          style={{ "--hr-delay": "0.25s" } as CSSProperties}
        >
          Nejchytřejší způsob, jak mít
          <br />
          <span className="bg-gradient-to-b from-[#3f6ae6] to-[#6f97f0] bg-clip-text text-transparent">
            čistý stůl.
          </span>
        </h1>

        {/* produkt */}
        <ProductStage
          reduce={reduce}
          rotX={rotX}
          rotY={rotY}
          reflX={reflX}
          reflOpacity={reflOpacity}
          glowX={glowX}
          glowY={glowY}
          shadowX={shadowX}
          prodScale={reduce ? undefined : prodScale}
          prodScrollY={reduce ? undefined : prodScrollY}
        />

        {/* subheadline */}
        <p
          className="hero-reveal max-w-[700px] text-base leading-relaxed text-muted sm:text-lg"
          style={{ "--hr-delay": "0.5s" } as CSSProperties}
        >
          Stolní vysavač do dlaně, který drobky, prach i nečistoty zvládne
          jediným stiskem — tiše, elegantně a bez kabelů.
        </p>

        {/* CTA */}
        <div
          className="hero-reveal flex flex-col items-center gap-3 sm:flex-row"
          style={{ "--hr-delay": "0.62s" } as CSSProperties}
        >
          <BuyButton variant="primary" className="!px-8 !py-[18px] !text-[1.02rem]">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <circle cx="9" cy="20" r="1.4" />
              <circle cx="18" cy="20" r="1.4" />
              <path d="M2 3h3l2.2 12.2a1.5 1.5 0 0 0 1.5 1.3h8.3a1.5 1.5 0 0 0 1.5-1.2L21 7H6" />
            </svg>
            Objednat nyní – {priceLabel}
          </BuyButton>
          <MagneticButton href="#how" variant="ghost" className="!px-8 !py-[18px] !text-[1.02rem]">
            Jak to funguje
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </MagneticButton>
        </div>
      </motion.div>

      {/* scroll cue */}
      <a
        href="#how"
        aria-label="Posunout níže"
        className="hero-reveal absolute inset-x-0 bottom-6 z-10 mx-auto flex w-fit flex-col items-center gap-1.5 text-muted"
        style={{ "--hr-delay": "0.8s" } as CSSProperties}
      >
        <span className="text-[0.7rem] uppercase tracking-[0.2em]">Objevte více</span>
        <span className="anim-arrow flex h-9 w-6 items-start justify-center rounded-full border border-line-2 pt-1.5">
          <span className="h-2 w-1 rounded-full bg-ink/50" />
        </span>
      </a>

      {/* morph do další sekce */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-40 bg-gradient-to-b from-transparent to-paper" />
    </section>
  );
}

/* ---------- produkt: probuzení + scroll + float + tilt ---------- */
function ProductStage({
  reduce,
  rotX,
  rotY,
  reflX,
  reflOpacity,
  glowX,
  glowY,
  shadowX,
  prodScale,
  prodScrollY,
}: {
  reduce: boolean;
  rotX: MotionValue<number>;
  rotY: MotionValue<number>;
  reflX: MotionValue<string>;
  reflOpacity: MotionValue<number>;
  glowX: MotionValue<number>;
  glowY: MotionValue<number>;
  shadowX: MotionValue<number>;
  prodScale?: MotionValue<number>;
  prodScrollY?: MotionValue<number>;
}) {
  return (
    <div className="relative flex w-full items-center justify-center [perspective:1300px]">
      {/* modrá záře + bílý světelný bazén */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <motion.div
          style={{ x: glowX, y: glowY }}
          className="anim-glow absolute h-[180%] w-[180%] rounded-full bg-[radial-gradient(circle,var(--color-sky-glow),transparent_60%)] blur-3xl will-change-transform"
        />
        <div className="absolute h-[168%] w-[168%] rounded-full bg-[radial-gradient(circle,#ffffff_58%,rgba(255,255,255,0.75)_72%,transparent_86%)] blur-2xl" />
      </div>

      {/* stín reagující na náklon + vznášení */}
      <div className="pointer-events-none absolute inset-x-0 bottom-[6%] flex justify-center">
        <motion.div
          aria-hidden
          style={{ x: reduce ? undefined : shadowX }}
          animate={reduce ? undefined : { scaleX: [1, 0.86, 1], opacity: [0.28, 0.15, 0.28] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          className="h-5 w-[42%] rounded-[50%] bg-ink/25 blur-2xl will-change-transform"
        />
      </div>

      {/* PROBUZENÍ: jemný zoom-out (produkt je vidět hned) */}
      <div className="hero-wake relative">
        {/* scroll */}
        <motion.div style={{ scale: prodScale, y: prodScrollY }}>
          {/* organické vznášení */}
          <motion.div
            animate={reduce ? undefined : { y: [0, -16, 0], rotate: [-1, 1.2, -1] }}
            transition={{
              y: { duration: 5.5, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 8.5, repeat: Infinity, ease: "easeInOut" },
            }}
            className="will-change-transform"
          >
            {/* náklon za myší */}
            <motion.div style={{ rotateX: rotX, rotateY: rotY }} className="relative [transform-style:preserve-3d] will-change-transform">
              <div className="relative aspect-square h-[clamp(240px,40vh,460px)] w-auto">
                <Image
                  src={images.hero}
                  alt="Stolní vysavač Cleaner"
                  fill
                  priority
                  sizes="(max-width: 768px) 80vw, 420px"
                  className="select-none object-contain"
                  draggable={false}
                />

                {/* PROBUZENÍ OČÍ: skla zhasnou → rozsvítí se zleva doprava */}
                <span className="eye" style={{ left: "40%", top: "41%", "--cover-delay": "0.3s", "--glow-delay": "0.35s" } as CSSProperties}>
                  <span className="eye-glow" />
                  <span className="eye-cover" />
                </span>
                <span className="eye" style={{ left: "53%", top: "41%", "--cover-delay": "0.45s", "--glow-delay": "0.5s" } as CSSProperties}>
                  <span className="eye-glow" />
                  <span className="eye-cover" />
                </span>

                {/* odlesk — pozice dle kurzoru, jas dle rychlosti */}
                {!reduce && (
                  <motion.div style={{ x: reflX, opacity: reflOpacity }} className="pointer-events-none absolute inset-0 mix-blend-overlay">
                    <div className="absolute inset-y-0 left-1/2 w-1/3 -translate-x-1/2 skew-x-12 bg-gradient-to-r from-transparent via-white/70 to-transparent" />
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
