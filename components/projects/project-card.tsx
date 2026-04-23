"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import type { Project } from "@/lib/types";
import { getAccentBase } from "@/lib/accent";
import { cn } from "@/lib/utils";

/** Build an `oklch(…)` string with an optional % alpha. */
function o(base: string, alpha?: number) {
  return alpha !== undefined
    ? `oklch(${base} / ${alpha}%)`
    : `oklch(${base})`;
}

// ─── Framer Motion variants ───────────────────────────────────────────────────
// Parent propagates `whileHover="hovered"` to children — no per-child state.

const cardVariants = {
  rest: {
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
  hovered: {
    y: -5,
    transition: {
      duration: 0.35,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

const arrowVariants = {
  rest: { opacity: 0, scale: 0.8, x: -4 },
  hovered: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      duration: 0.22,
      ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
    },
  },
};

// ─── component ────────────────────────────────────────────────────────────────

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
}

/**
 * Project card. The whole card is a single `<Link>` to the project's
 * detail page at `/projects/[slug]`. We intentionally don't render
 * external links (live demo / GitHub) directly on the card anymore —
 * those are prominent CTAs on the detail page. This keeps the card
 * markup clean (no nested anchors) and routes all discovery traffic
 * through the project page first, which is better for both SEO and
 * the story that page is meant to tell.
 */
export function ProjectCard({ project, priority }: ProjectCardProps) {
  const base = getAccentBase(project.id);
  const hasLinks = project.href || project.repo;

  return (
    <motion.article
      variants={cardVariants}
      initial="rest"
      whileHover="hovered"
      className={cn(
        "group relative overflow-hidden rounded-xl border border-border bg-card",
        "transition-[border-color,box-shadow] duration-300",
        "hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10",
        "focus-within:border-primary/50"
      )}
    >
      {/* Link overlay — `after` pseudo covers the card for one-click nav
          without nesting anchors. The rest of the card is purely visual. */}
      <Link
        href={`/projects/${project.id}`}
        aria-label={`View case study: ${project.title}`}
        className={cn(
          "absolute inset-0 z-10",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "rounded-xl"
        )}
      />

      {/* ── Image / decorative placeholder ─────────────────────────────────── */}
      <div className="relative h-44 overflow-hidden">
        {/* Layered gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 68% 30%, ${o(base, 22)}, transparent 65%), ${o(base, 5)}`,
            backgroundColor: o(base, 5),
          }}
        />

        {/* Floating decorative circles */}
        <div
          className="absolute -right-8 -top-8 size-32 rounded-full"
          style={{ backgroundColor: o(base, 22) }}
        />
        <div
          className="absolute bottom-4 left-8 size-14 rounded-full"
          style={{ backgroundColor: o(base, 12) }}
        />
        <div
          className="absolute right-14 top-10 size-7 rounded-full"
          style={{ backgroundColor: o(base, 16) }}
        />
        <div
          className="absolute left-4 top-4 size-3 rounded-full"
          style={{ backgroundColor: o(base, 25) }}
        />

        {/* Real screenshot — rendered on top when `project.image` is provided */}
        {project.image && (
          <Image
            src={project.image}
            alt={project.imageAlt ?? `${project.title} — screenshot`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={priority}
          />
        )}

        {/* Concept badge — shown when project has no live link or repo */}
        {!hasLinks && (
          <span className="absolute left-3 top-3 z-[5] rounded-md bg-background/80 px-2 py-0.5 text-xs font-medium text-muted-foreground backdrop-blur-sm">
            Concept
          </span>
        )}
      </div>

      {/* ── Text content ─────────────────────────────────────────────────── */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold text-foreground">{project.title}</h3>
          <motion.span
            variants={arrowVariants}
            aria-hidden="true"
            className="shrink-0 text-primary"
          >
            <ArrowUpRight className="size-4" />
          </motion.span>
        </div>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        {/* Tags — show max 4, then a "+N" count badge */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
              +{project.tags.length - 4}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}
