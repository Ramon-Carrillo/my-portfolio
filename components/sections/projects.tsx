"use client";

import { motion, useReducedMotion } from "framer-motion";
import { projects } from "@/lib/data";
import { ProjectsGrid } from "@/components/projects/projects-grid";

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

const VP = { once: true, margin: "-80px" } as const;

export function Projects() {
  const reduced = useReducedMotion() ?? false;

  return (
    <section id="projects" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">

        {/* ── Heading ── */}
        <motion.div
          initial={reduced ? false : "hidden"}
          whileInView="show"
          viewport={VP}
          variants={FADE_UP}
          className="mb-12 flex items-center gap-4"
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Projects
          </h2>
          <div className="h-px flex-1 bg-border" aria-hidden="true" />
        </motion.div>

        {/* ── Grid ── */}
        <motion.div
          initial={reduced ? false : "hidden"}
          whileInView="show"
          viewport={VP}
          variants={FADE_UP}
        >
          <ProjectsGrid projects={projects} />
        </motion.div>

      </div>
    </section>
  );
}
