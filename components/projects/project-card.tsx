"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import Image from "next/image";
import type { Project } from "@/lib/types";
import { cn } from "@/lib/utils";

// ─── accent palette ───────────────────────────────────────────────────────────
// Each value is an OKLCH base string (no alpha). Alpha is applied at usage sites
// so the same hue can appear at different strengths across the card.
// Lightness values sit in the 0.52–0.70 range so they stay visible on the
// deep dark background (oklch 0.07) even at low alpha.

const ACCENT_BASES = [
  "0.52 0.190 264", // royal blue  — matches design system --royal / --primary
  "0.65 0.115 292", // soft purple — secondary accent
  "0.58 0.092 196", // teal / cyan — highlight color
  "0.58 0.095 262", // cornflower blue
  "0.37 0.200 297", // deep indigo
  "0.70 0.080  70", // warm gold   — warm contrast break
] as const;

/** Build an `oklch(…)` string with an optional % alpha. */
function o(base: string, alpha?: number) {
  return alpha !== undefined
    ? `oklch(${base} / ${alpha}%)`
    : `oklch(${base})`;
}

/** Deterministic, stable mapping: project id → accent index. */
export function accentIndex(id: string): number {
  let h = 0;
  for (const c of id) h = ((h * 31) + c.charCodeAt(0)) >>> 0;
  return h % ACCENT_BASES.length;
}

export function getAccentBase(id: string) {
  return ACCENT_BASES[accentIndex(id)];
}

// ─── Framer Motion variants ───────────────────────────────────────────────────
// Variant propagation: the parent sets `whileHover="hovered"` and ALL children
// with matching variant keys (`rest` / `hovered`) respond automatically —
// no useState, no event handlers needed for the child animations.

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
      // Stagger the icon buttons on enter — first icon at 70 ms, second at 140 ms
      staggerChildren: 0.07,
    },
  },
};

const overlayVariants = {
  rest:    { opacity: 0 },
  hovered: { opacity: 1, transition: { duration: 0.18 } },
};

const iconVariants = {
  rest: { opacity: 0, scale: 0.78, y: 6 },
  hovered: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.22,
      ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number], // spring pop
    },
  },
};

// ─── component ────────────────────────────────────────────────────────────────

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export function ProjectCard({ project, onSelect }: ProjectCardProps) {
  const base     = getAccentBase(project.id);
  const hasLinks = project.href || project.repo;

  return (
    <motion.article
      variants={cardVariants}
      initial="rest"
      whileHover="hovered"
      role="button"
      tabIndex={0}
      onClick={() => onSelect(project)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(project);
        }
      }}
      aria-label={`View details for ${project.title}`}
      className={cn(
        "group cursor-pointer overflow-hidden rounded-xl border border-border bg-card",
        "transition-[border-color,box-shadow] duration-300",
        "hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      )}
    >
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

        {/* Floating decorative circles — each at a different size and position */}
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
            alt={`${project.title} screenshot`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        )}

        {/* ── Hover overlay — Live Demo + GitHub icons ── */}
        {hasLinks && (
          <motion.div
            variants={overlayVariants}
            className="pointer-events-none absolute inset-0 flex items-end justify-end gap-2 p-3"
            style={{
              background:
                "linear-gradient(to top, oklch(0 0 0 / 35%) 0%, transparent 55%)",
            }}
          >
            {project.href && (
              <motion.a
                variants={iconVariants}
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Live demo — ${project.title}`}
                onClick={(e) => e.stopPropagation()}
                className={cn(
                  "pointer-events-auto inline-flex size-9 items-center justify-center rounded-lg",
                  "bg-background/90 text-foreground backdrop-blur-sm",
                  "transition-colors hover:bg-primary hover:text-primary-foreground",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                )}
              >
                <ExternalLink className="size-4" aria-hidden="true" />
              </motion.a>
            )}
            {project.repo && (
              <motion.a
                variants={iconVariants}
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`GitHub — ${project.title}`}
                onClick={(e) => e.stopPropagation()}
                className={cn(
                  "pointer-events-auto inline-flex size-9 items-center justify-center rounded-lg",
                  "bg-background/90 text-foreground backdrop-blur-sm",
                  "transition-colors hover:bg-primary hover:text-primary-foreground",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                )}
              >
                <FaGithub size={15} aria-hidden="true" />
              </motion.a>
            )}
          </motion.div>
        )}
      </div>

      {/* ── Text content ─────────────────────────────────────────────────── */}
      <div className="p-5">
        <h3 className="font-semibold text-foreground">{project.title}</h3>
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
