"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

// ─── content ─────────────────────────────────────────────────────────────────

const BIO = [
  "Hi, I'm Ramon — a passionate full-stack developer focused on building clean, accessible, and performant web applications.",
  "I love turning ideas into reality using modern technologies like Next.js, React, TypeScript, and Node.js. With a strong eye for UI design and deep attention to accessibility & SEO, I create digital experiences that are both beautiful and user-friendly.",
  "When I'm not coding, I'm exploring new tools, experimenting with AI, or refining designs in Figma. Always learning, always shipping.",
] as const;

const STACK = [
  "TypeScript",
  "React / Next.js",
  "Tailwind CSS",
  "Framer Motion",
  "Node.js",
  "PostgreSQL",
  "Prisma",
  "Stripe",
  "Supabase",
  "OpenAI",
  "Zod",
  "React Hook Form",
  "shadcn/ui",
  "Recharts",
  "Figma API",
  "Storybook",
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
                src="/images/about-picutre.JPG"
                alt="Ramon"
                fill
                className="object-cover"
                style={{ objectPosition: "10% top" }}
                priority
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
