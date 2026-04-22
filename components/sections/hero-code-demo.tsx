"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Hero right-column visual. Replaces the previous Lottie astronaut
 * with a styled "terminal" card showing a real retrieval call from
 * the Google Maps RAG Assistant — code in, grounded sources out.
 *
 * Why this design:
 *   - Signals what I actually build, not a generic illustration.
 *   - The two-panel layout (code → result) reinforces the
 *     "measurable-quality" story: the code on top produces the scores
 *     on the bottom.
 *   - Motion is opt-in via prefers-reduced-motion — the whole card
 *     renders statically without any JS for users who've asked for it.
 *   - Syntax highlighting is hand-rolled with span classes. Zero
 *     dependencies, full control, and the bundle stays light.
 */

const RESULTS = [
  {
    score: 0.715,
    source: "Common Errors and Troubleshooting",
    // Width of the bar as a percentage of the track — not the raw
    // similarity, but scaled so the top result looks full and the
    // bottom one looks noticeably shorter.
    width: 100,
  },
  {
    score: 0.607,
    source: "Common Errors and Troubleshooting",
    width: 85,
  },
  {
    score: 0.589,
    source: "Maps JavaScript API Overview",
    width: 82,
  },
];

export function HeroCodeDemo() {
  const reduced = useReducedMotion() ?? false;

  // Variants are declared inline so the component stays self-contained.
  // The whole card fades up first; the result rows stagger in 0.8s later
  // to give the impression of retrieval completing after the query.
  const cardV = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        delay: 0.3,
      },
    },
  };

  const resultContainerV = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 1.1,
      },
    },
  };

  const resultRowV = {
    hidden: { opacity: 0, x: -8 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.35,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      },
    },
  };

  return (
    <motion.div
      initial={reduced ? false : "hidden"}
      animate={reduced ? false : "show"}
      variants={cardV}
      className="relative w-full max-w-md"
      aria-label="Code example: a retrieval call from the Google Maps RAG Assistant returning three grounded sources"
    >
      {/* Ambient glow behind the card — gives depth without adding weight */}
      <div
        aria-hidden="true"
        className="absolute -inset-4 -z-10 rounded-[2rem] opacity-40 blur-2xl"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, oklch(0.52 0.22 262 / 55%), transparent 65%)",
        }}
      />

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[rgba(15,19,42,0.72)] shadow-2xl shadow-black/50 backdrop-blur-sm">
        {/* ── Window chrome ─────────────────────────────────────────── */}
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-red-500/60" />
            <span className="size-2.5 rounded-full bg-yellow-500/60" />
            <span className="size-2.5 rounded-full bg-green-500/60" />
          </div>
          <div className="ml-3 font-mono text-[11px] text-white/40">
            retrieval-demo.ts
          </div>
        </div>

        {/* ── Code block ────────────────────────────────────────────── */}
        <pre
          className="overflow-x-auto px-5 py-4 font-mono text-[13px] leading-[1.8] text-white/85"
          aria-hidden="true"
        >
          <code>
            <span className="text-white/40">{`// Grounded answers — no hallucinations.`}</span>
            {"\n"}
            <span className="text-[#c586c0]">const</span>
            {" "}
            <span className="text-[#9cdcfe]">sources</span>
            {" "}
            <span className="text-white/60">=</span>
            {" "}
            <span className="text-[#c586c0]">await</span>
            {" "}
            <span className="text-[#dcdcaa]">retrieveRelevantDocs</span>
            <span className="text-white/60">(</span>
            {"\n  "}
            <span className="text-[#ce9178]">{`"How do I fix RefererNotAllowedMapError?"`}</span>
            {"\n"}
            <span className="text-white/60">);</span>
          </code>
        </pre>

        {/* ── Divider with an arrow that reinforces "input → output" ── */}
        <div className="flex items-center gap-3 border-y border-white/10 bg-white/[0.02] px-5 py-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
            retrieved
          </span>
          <span className="h-px flex-1 bg-white/10" aria-hidden="true" />
          <span className="font-mono text-[10px] text-white/30">
            cosine sim
          </span>
        </div>

        {/* ── Results ─────────────────────────────────────────────── */}
        <motion.ul
          variants={resultContainerV}
          initial={reduced ? false : "hidden"}
          animate={reduced ? false : "show"}
          className="space-y-3 px-5 py-4"
        >
          {RESULTS.map((r) => (
            <motion.li
              key={r.source + r.score}
              variants={resultRowV}
              className="flex items-center gap-3"
            >
              {/* Bar track + filled bar */}
              <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/5">
                <motion.span
                  initial={reduced ? false : { width: 0 }}
                  animate={reduced ? false : { width: `${r.width}%` }}
                  transition={{
                    duration: 0.55,
                    ease: [0.25, 0.46, 0.45, 0.94],
                    delay: 1.25,
                  }}
                  className="absolute inset-y-0 left-0 block rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, oklch(0.62 0.22 262), oklch(0.72 0.19 262))",
                  }}
                />
              </div>
              <span className="w-10 shrink-0 text-right font-mono text-[11px] tabular-nums text-white/70">
                {r.score.toFixed(3)}
              </span>
              <span className="w-28 shrink-0 truncate text-[11px] text-white/55">
                {r.source}
              </span>
            </motion.li>
          ))}
        </motion.ul>

        {/* ── Footer: summary with citation vibe ─────────────────── */}
        <div className="flex items-center gap-2 border-t border-white/10 px-5 py-3 text-[11px] text-white/55">
          <span
            aria-hidden="true"
            className="flex size-1.5 rounded-full bg-emerald-400"
          />
          3 sources retrieved · grounded &amp; cited
        </div>
      </div>
    </motion.div>
  );
}
