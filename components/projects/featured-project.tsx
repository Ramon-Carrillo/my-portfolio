"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ExternalLink, Sparkles } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import type { Project } from "@/lib/types";
import { getAccentBase } from "@/lib/accent";
import { cn } from "@/lib/utils";

function o(base: string, alpha?: number) {
  return alpha !== undefined
    ? `oklch(${base} / ${alpha}%)`
    : `oklch(${base})`;
}

/**
 * Featured project card — renders a single project in a full-width,
 * hero-style layout above the regular projects grid. Used to draw
 * attention to the strongest case study (currently the Google Maps
 * RAG Assistant).
 *
 * Structure differs from the regular ProjectCard in a few deliberate ways:
 *   - Two-column layout on desktop (image | text) to give more room
 *     for a long description and inline CTAs.
 *   - Dedicated "Featured case study" badge with an icon.
 *   - External links (live demo + repo) are inline buttons, not
 *     hover-only icons — discoverable at a glance.
 *   - Whole card is still a single Link to the detail page via an
 *     `inset-0` overlay; the inline CTAs sit above it with z-20.
 */

const FADE_UP = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

const VP = { once: true, margin: "-80px" } as const;

interface FeaturedProjectProps {
  project: Project;
}

export function FeaturedProject({ project }: FeaturedProjectProps) {
  const reduced = useReducedMotion() ?? false;
  const base = getAccentBase(project.id);

  return (
    <motion.article
      initial={reduced ? false : "hidden"}
      whileInView="show"
      viewport={VP}
      variants={FADE_UP}
      className={cn(
        "group relative mb-10 overflow-hidden rounded-2xl border border-border bg-card",
        "transition-[border-color,box-shadow] duration-300",
        "hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10"
      )}
    >
      {/* Link overlay — covers the whole card for one-click nav */}
      <Link
        href={`/projects/${project.id}`}
        aria-label={`View case study: ${project.title}`}
        className={cn(
          "absolute inset-0 z-10",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "rounded-2xl"
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] md:gap-0">
        {/* ── Image column ─────────────────────────────────────────── */}
        <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[340px]">
          {/* Gradient background */}
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse at 68% 30%, ${o(base, 22)}, transparent 65%), ${o(base, 5)}`,
              backgroundColor: o(base, 5),
            }}
          />
          {/* Decorative circles */}
          <div
            className="absolute -right-12 -top-12 size-48 rounded-full"
            style={{ backgroundColor: o(base, 22) }}
          />
          <div
            className="absolute bottom-6 left-12 size-24 rounded-full"
            style={{ backgroundColor: o(base, 12) }}
          />
          <div
            className="absolute right-20 top-16 size-10 rounded-full"
            style={{ backgroundColor: o(base, 16) }}
          />

          {project.image && (
            <Image
              src={project.image}
              alt={`${project.title} screenshot`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          )}
        </div>

        {/* ── Text column ──────────────────────────────────────────── */}
        <div className="flex flex-col justify-center p-6 sm:p-8 md:p-10">
          {/* Featured badge */}
          <div className="mb-4 inline-flex items-center gap-2 self-start rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-primary">
            <Sparkles className="size-3" aria-hidden="true" />
            Featured case study
          </div>

          <div className="flex items-start justify-between gap-3">
            <h3 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              {project.title}
            </h3>
            <ArrowUpRight
              className="size-5 shrink-0 text-primary opacity-60 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </div>

          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>

          {/* Tech tags — show up to 6 on featured (vs 4 on regular card) */}
          <ul className="mt-5 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 6).map((tag) => (
              <li
                key={tag}
                className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
              >
                {tag}
              </li>
            ))}
            {project.tags.length > 6 && (
              <li className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                +{project.tags.length - 6}
              </li>
            )}
          </ul>

          {/* Inline CTAs — above the overlay thanks to z-20 */}
          <div className="relative z-20 mt-6 flex flex-wrap gap-2">
            {project.href && (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                aria-label={`Live demo — ${project.title}`}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5",
                  "text-xs font-medium text-muted-foreground",
                  "transition-colors hover:border-primary/50 hover:text-primary",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                )}
              >
                <ExternalLink className="size-3" aria-hidden="true" />
                Live demo
              </a>
            )}
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                aria-label={`Source code — ${project.title}`}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5",
                  "text-xs font-medium text-muted-foreground",
                  "transition-colors hover:border-primary/50 hover:text-primary",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                )}
              >
                <FaGithub size={12} aria-hidden="true" />
                Source
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
