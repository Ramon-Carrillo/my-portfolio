"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

// ─── content ─────────────────────────────────────────────────────────────────

const BIO = [
  "I'm a full-stack developer who came into engineering from the other side of the support phone. I spent a year at HCLTech as a Tier 1 Google Maps Platform support engineer — every day, I helped developers debug `RefererNotAllowedMapError`, untangle billing credits, and migrate off deprecated APIs.",
  "That experience shaped how I build. I've seen exactly what breaks in production and how it feels when it does, so I write code with real users in mind: clear error states, grounded AI answers instead of confident hallucinations, citations where they matter, and accessibility treated as a baseline — not a retrofit.",
  "Today I focus on production-grade web apps with Next.js, TypeScript, and Claude — including RAG systems, AI agents, and Stripe-powered storefronts. Most of my recent work is shipped live with committed eval suites so quality isn't a vibe, it's a number.",
] as const;

const STACK = [
  "TypeScript",
  "Next.js / React",
  "Tailwind CSS",
  "Node.js",
  "PostgreSQL",
  "Prisma",
  "Stripe",
  "Claude / Anthropic",
  "Vercel AI SDK",
  "RAG & pgvector",
  "Accessibility",
] as const;

// ─── animation variants ───────────────────────────────────────────────────────
// Children that carry only `variants` (no animate / whileInView of their own)
// automatically inherit the parent's animation state — this is what makes
// staggerChildren work correctly with whileInView.

/** Parent: triggers once on viewport entry, staggers children. */
const STAGGER = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.05 } },
};

/** Paragraph child: slides up and fades in. */
const PARA = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

/** Chip parent: faster stagger for the grid. */
const CHIP_GRID = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045, delayChildren: 0.1 } },
};

/** Chip child: scale + fade gives a distinct "pop" from the text entries. */
const CHIP = {
  hidden: { opacity: 0, scale: 0.82 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.32,
      ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number], // gentle spring overshoot
    },
  },
};

/** Single element: plain fade-up, used for standalone items. */
const FADE_UP = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

// Shared viewport config — triggers once, 80 px before the element
// fully enters the screen so the animation is already running on arrival.
const VP = { once: true, margin: "-80px" } as const;

// ─── component ───────────────────────────────────────────────────────────────

export function About() {
  const reduced = useReducedMotion() ?? false;

  return (
    <section id="about" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[280px_1fr] lg:gap-16">

          {/* ── Photo placeholder ── */}
          {/* Replace the inner div with <Image> once you have a real photo:
              import Image from "next/image"
              <Image src="/photo.jpg" alt="Ramon" fill className="object-cover object-top" /> */}
          <motion.div
            initial={reduced ? false : "hidden"}
            whileInView="show"
            viewport={VP}
            variants={FADE_UP}
            className="mx-auto w-full max-w-[280px] lg:sticky lg:top-24"
          >
            <div className="relative w-full overflow-hidden rounded-2xl border border-border bg-card" style={{ aspectRatio: "3/4" }}>
              <Image
                src="/images/about-picture.JPG"
                alt="Ramon Carrillo, Full-Stack Developer"
                fill
                sizes="280px"
                className="object-cover"
                style={{ objectPosition: "10% top" }}
              />
            </div>
          </motion.div>

          {/* ── Text content ── */}
          <div>

        {/* ── Heading ── */}
        <motion.div
          initial={reduced ? false : "hidden"}
          whileInView="show"
          viewport={VP}
          variants={FADE_UP}
          className="mb-12 flex items-center gap-4"
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            About
          </h2>
          <div className="h-px flex-1 bg-border" aria-hidden="true" />
        </motion.div>

        {/* ── Bio ── */}
        <motion.div
          initial={reduced ? false : "hidden"}
          whileInView="show"
          viewport={VP}
          variants={STAGGER}
          className="mb-12 space-y-5"
        >
          {BIO.map((paragraph, i) => (
            <motion.p
              key={i}
              variants={PARA}
              className="text-base leading-[1.85] text-muted-foreground"
            >
              {paragraph}
            </motion.p>
          ))}
        </motion.div>

        {/* ── Divider ── */}
        <motion.div
          initial={reduced ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VP}
          transition={{ duration: 0.6 }}
          className="mb-10 h-px bg-border"
          aria-hidden="true"
        />

        {/* ── Tech Stack ── */}
        <motion.div
          initial={reduced ? false : "hidden"}
          whileInView="show"
          viewport={VP}
          variants={FADE_UP}
          className="mb-6"
        >
          <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Tech Stack
          </h3>
        </motion.div>

        <motion.ul
          initial={reduced ? false : "hidden"}
          whileInView="show"
          viewport={VP}
          variants={CHIP_GRID}
          className="flex flex-wrap gap-2"
          aria-label="Technologies I work with"
        >
          {STACK.map((item) => (
            <motion.li
              key={item}
              variants={CHIP}
              className={cn(
                "cursor-default rounded-lg border border-border bg-card",
                "px-3.5 py-1.5 text-sm font-medium text-foreground",
                "transition-colors duration-200",
                "hover:border-primary/50 hover:bg-primary/5 hover:text-primary",
              )}
            >
              {item}
            </motion.li>
          ))}
        </motion.ul>

          </div>{/* end text column */}
        </div>{/* end grid */}
      </div>
    </section>
  );
}
