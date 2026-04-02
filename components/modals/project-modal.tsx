"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import Image from "next/image";
import type { Project } from "@/lib/types";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { useLenisInstance } from "@/hooks/use-lenis-scroll";
import { getAccentBase } from "@/components/projects/project-card";
import { cn } from "@/lib/utils";

// ─── animation variants ───────────────────────────────────────────────────────

/** Full-screen overlay — pure opacity fade. */
const overlayVariants = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.22 } },
  exit:   { opacity: 0, transition: { duration: 0.18 } },
};

/** Panel — scale + vertical slide on top of the overlay fade. */
const panelVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 18 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      // Delay panel slightly so the backdrop darkens first
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
  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const lenis = useLenisInstance();

  useOutsideClick(panelRef, onClose);

  // Stop page scroll while modal is open
  useEffect(() => {
    if (project) {
      lenis?.stop();
      // Move focus to the close button when panel opens
      requestAnimationFrame(() => closeBtnRef.current?.focus());
    } else {
      lenis?.start();
    }
    return () => lenis?.start();
  }, [project, lenis]);

  // Keyboard: close on Escape
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
          {/* ── Backdrop ─────────────────────────────────────────────── */}
          <motion.div
            key="modal-backdrop"
            variants={overlayVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="fixed inset-0 z-50 bg-background/75 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* ── Scroll container — centres the panel, allows scrolling on small screens ── */}
          <motion.div
            key="modal-panel-wrapper"
            variants={overlayVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="fixed inset-0 z-50 overflow-y-auto px-4 py-8"
          >
            <div className="flex min-h-full items-center justify-center">
              {/* ── Panel ─────────────────────────────────────────────── */}
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
                  "relative w-full max-w-2xl overflow-hidden rounded-2xl",
                  "border border-border bg-card shadow-2xl shadow-black/60",
                )}
              >
                {/* ── Image / decorative header ─────────────────────── */}
                <div className="relative h-52 overflow-hidden">
                  {/* Layered earthy gradient placeholder */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `radial-gradient(ellipse at 60% 40%, ${o(base, 28)}, transparent 60%), ${o(base, 7)}`,
                      backgroundColor: o(base, 7),
                    }}
                  />
                  {/* Decorative circles */}
                  <div
                    className="absolute -right-10 -top-10 size-48 rounded-full"
                    style={{ backgroundColor: o(base, 18) }}
                  />
                  <div
                    className="absolute -bottom-4 left-16 size-24 rounded-full"
                    style={{ backgroundColor: o(base, 12) }}
                  />
                  <div
                    className="absolute right-24 top-8 size-10 rounded-full"
                    style={{ backgroundColor: o(base, 15) }}
                  />
                  <div
                    className="absolute left-8 top-8 size-4 rounded-full"
                    style={{ backgroundColor: o(base, 28) }}
                  />

                  {/* Real screenshot when available */}
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
                </div>

                {/* ── Content ───────────────────────────────────────── */}
                <div className="p-6 sm:p-8">

                  {/* Title row */}
                  <div className="flex items-start justify-between gap-4">
                    <h2
                      id="modal-title"
                      className="text-xl font-semibold leading-snug text-foreground sm:text-2xl"
                    >
                      {project.title}
                    </h2>
                    <button
                      ref={closeBtnRef}
                      onClick={onClose}
                      aria-label="Close modal"
                      className={cn(
                        "shrink-0 rounded-lg p-1.5 text-muted-foreground",
                        "transition-colors hover:bg-accent hover:text-foreground",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      )}
                    >
                      <X className="size-4" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Description */}
                  <p className="mt-4 text-sm leading-[1.85] text-muted-foreground">
                    {project.longDescription ?? project.description}
                  </p>

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

                  {/* ── CTA buttons ───────────────────────────────── */}
                  {(project.href || project.repo) && (
                    <div className="mt-7 flex flex-wrap gap-3">
                      {project.href && (
                        <a
                          href={project.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            "inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5",
                            "text-sm font-medium text-primary-foreground",
                            "transition-colors hover:bg-royal-hover",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                            "focus-visible:ring-offset-2 focus-visible:ring-offset-card",
                          )}
                        >
                          <ExternalLink className="size-4" aria-hidden="true" />
                          Live Demo
                        </a>
                      )}
                      {project.repo && (
                        <a
                          href={project.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            "inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5",
                            "text-sm font-medium text-foreground",
                            "transition-colors hover:border-primary/50 hover:bg-accent hover:text-primary",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                            "focus-visible:ring-offset-2 focus-visible:ring-offset-card",
                          )}
                        >
                          <FaGithub size={15} aria-hidden="true" />
                          View on GitHub
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
