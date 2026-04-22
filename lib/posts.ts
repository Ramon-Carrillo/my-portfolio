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

export interface Post {
  /** URL slug — must match the folder name under app/blog/. */
  slug: string;
  /** Full post title. */
  title: string;
  /** One- or two-sentence summary for the index page and SEO. */
  excerpt: string;
  /** ISO 8601 date (YYYY-MM-DD). */
  publishedAt: string;
  /** Optional: last substantive update date. */
  updatedAt?: string;
  /** Human-readable reading estimate (e.g., "12 min read"). */
  readingTime: string;
  /** Short tags shown on the index card and used in JSON-LD keywords. */
  tags: string[];
  /**
   * Optional: the project this post is a case study for. Lets us render
   * a "Case study for: <project>" chip on the index card and link back
   * to the project page.
   */
  projectSlug?: string;
}

export const posts: Post[] = [
  {
    slug: "building-a-grounded-rag-assistant",
    title: "Building a grounded RAG assistant",
    excerpt:
      "What it took to build a Google Maps RAG chatbot that doesn't hallucinate — eval-driven iteration, two-stage retrieval, and the pivot to hybrid RAG with agentic web search.",
    publishedAt: "2026-04-22",
    readingTime: "12 min read",
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
