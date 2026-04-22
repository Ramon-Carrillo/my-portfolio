"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import type { Project } from "@/lib/types";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { useLenisInstance } from "@/hooks/use-lenis-scroll";
import { getAccentBase } from "@/lib/accent";
import { cn } from "@/lib/utils";

// ─── animation variants ───────────────────────────────────────────────────────

const overlayVariants = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.22 } },
  exit:   { opacity: 0, transition: { duration: 0.18 } },
};

const panelVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 18 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      delay: 0.04,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: 18,
    transition: {
      duration: 0.22,
      ease: [0.55, 0, 1, 0.45] as [number, number, number, number],
    },
  },
};

// ─── helpers ─────────────────────────────────────────────────────────────────

function o(base: string, alpha: number) {
  return `oklch(${base} / ${alpha}%)`;
}

// ─── component ────────────────────────────────────────────────────────────────

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const panelRef    = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const lenis       = useLenisInstance();

  useOutsideClick(panelRef, onClose);

  // Stop page scroll while modal is open
  useEffect(() => {
    if (project) {
      lenis?.stop();
      requestAnimationFrame(() => closeBtnRef.current?.focus());
    } else {
      lenis?.start();
    }
    return () => lenis?.start();
  }, [project, lenis]);

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (project) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [project, onClose]);

  const base = project ? getAccentBase(project.id) : "";

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* ── Backdrop ── */}
          <motion.div
            key="modal-backdrop"
            variants={overlayVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="fixed inset-0 z-50 bg-background/75 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* ── Outer positioner — centres the panel without scrolling itself ── */}
          <motion.div
            key="modal-panel-wrapper"
            variants={overlayVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="fixed inset-0 z-50 flex items-end justify-center px-4 pb-4 sm:items-center sm:py-8"
          >
            {/* ── Panel — flex column, capped height, only content scrolls ── */}
            <motion.div
              variants={panelVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              className={cn(
                "flex w-full max-w-2xl flex-col overflow-hidden rounded-2xl",
                "max-h-[92dvh] sm:max-h-[85dvh]",
                "border border-border bg-card shadow-2xl shadow-black/60",
              )}
            >
              {/* ── Image header — pinned, never scrolls ── */}
              <div className="relative h-40 shrink-0 sm:h-52">
                {/* Gradient background */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(ellipse at 60% 40%, ${o(base, 28)}, transparent 60%), ${o(base, 7)}`,
                    backgroundColor: o(base, 7),
                  }}
                />
                {/* Decorative circles */}
                <div className="absolute -right-10 -top-10 size-48 rounded-full" style={{ backgroundColor: o(base, 18) }} />
                <div className="absolute -bottom-4 left-16 size-24 rounded-full"  style={{ backgroundColor: o(base, 12) }} />
                <div className="absolute right-24 top-8 size-10 rounded-full"     style={{ backgroundColor: o(base, 15) }} />
                <div className="absolute left-8 top-8 size-4 rounded-full"        style={{ backgroundColor: o(base, 28) }} />

                {project.image && (
                  <Image
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 672px) 100vw, 672px"
                    priority
                  />
                )}

                {/* Close button — always visible, pinned to top-right of image */}
                <button
                  ref={closeBtnRef}
                  onClick={onClose}
                  aria-label="Close modal"
                  className={cn(
                    "absolute right-3 top-3 z-10 rounded-lg p-1.5",
                    "bg-background/80 text-foreground backdrop-blur-sm",
                    "transition-colors hover:bg-background hover:text-primary",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  )}
                >
                  <X className="size-4" aria-hidden="true" />
                </button>
              </div>

              {/* ── Scrollable content ── */}
              <div className="overflow-y-auto overscroll-contain p-6 sm:p-8">

                <h2
                  id="modal-title"
                  className="text-xl font-semibold leading-snug text-foreground sm:text-2xl"
                >
                  {project.title}
                </h2>

                {/* Description */}
                <p className="mt-4 text-sm leading-[1.85] text-muted-foreground">
                  {project.longDescription ?? project.description}
                </p>

                {/* Highlights — "why it matters" callout. Only rendered
                    for projects that opt in via the `highlights` field,
                    so less-featured projects stay visually lighter. */}
                {project.highlights && project.highlights.length > 0 && (
                  <div className="mt-6 rounded-xl border border-border/60 bg-background/60 p-4">
                    <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
                      Why it matters
                    </h3>
                    <ul className="space-y-2">
                      {project.highlights.map((point, i) => (
                        <li
                          key={i}
                          className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-primary"
                          />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tech stack badges */}
                {project.tags.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg border border-border bg-background px-3 py-1 text-xs font-medium text-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}


                {/* Bottom breathing room */}
                <div className="h-2" />
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
