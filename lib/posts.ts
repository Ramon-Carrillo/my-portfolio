/**
 * Blog post metadata registry.
 *
 * Each entry here corresponds to an MDX file at
 * `app/blog/<slug>/page.mdx`. The MDX file holds the post content;
 * this registry holds the metadata used by the blog index, sitemap,
 * and JSON-LD. Having a single source of truth for post metadata
 * keeps things simple — no filesystem scanning at runtime.
 *
 * To add a new post:
 *   1. Create `app/blog/<slug>/page.mdx` with the content
 *   2. Optionally add `app/blog/<slug>/opengraph-image.tsx` for a
 *      custom OG card (falls back to the portfolio default if absent)
 *   3. Add an entry to the `posts` array below
 */

import type { Post } from "./types";

export type { Post };

export const posts: Post[] = [
  {
    slug: "shipping-wcag-aa-checklist",
    title: "The WCAG 2.1 AA checklist I run on every project",
    title_es: "La checklist WCAG 2.1 AA que aplico en cada proyecto",
    excerpt:
      "A practical, ordered checklist for shipping accessible Next.js + Tailwind projects — landmarks, skip links, keyboard support, contrast, reflow, and forms — distilled from auditing four live sites in one morning.",
    excerpt_es:
      "Una checklist práctica y ordenada para enviar proyectos accesibles con Next.js + Tailwind — landmarks, skip links, soporte de teclado, contraste, reflujo y formularios — destilada tras auditar cuatro sitios en una mañana.",
    publishedAt: "2026-04-22",
    readingTime: "10 min read",
    readingTime_es: "10 min de lectura",
    tags: ["Accessibility", "WCAG", "Next.js", "Tailwind", "Frontend"],
  },
  {
    slug: "building-a-grounded-rag-assistant",
    title: "Building a grounded RAG assistant",
    title_es: "Construyendo un asistente RAG con fundamento",
    excerpt:
      "What it took to build a Google Maps RAG chatbot that doesn't hallucinate — eval-driven iteration, two-stage retrieval, and the pivot to hybrid RAG with agentic web search.",
    excerpt_es:
      "Lo que hizo falta para construir un chatbot RAG sobre Google Maps que no alucina — iteración guiada por evaluaciones, recuperación en dos etapas y el giro hacia RAG híbrido con búsqueda web agéntica.",
    publishedAt: "2026-04-22",
    readingTime: "12 min read",
    readingTime_es: "12 min de lectura",
    tags: ["RAG", "Claude", "Evals", "Next.js", "pgvector"],
    projectSlug: "google-maps-rag-assistant",
  },
];

/** Sort posts newest-first for the index. */
export function getAllPosts(): Post[] {
  return [...posts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

/** Look up a single post by slug. Returns `undefined` if not found. */
export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

/**
 * Human-readable date for display on post pages.
 * Example: "April 22, 2026"
 */
export function formatPublishedDate(iso: string): string {
  return new Date(iso + "T00:00:00Z").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
