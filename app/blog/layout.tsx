import type { ReactNode } from "react";

/**
 * Blog section layout. Gives every post + the index a consistent
 * container width, vertical rhythm, and "content-first" background.
 * Applies to `app/blog/page.tsx` and every `app/blog/<slug>/page.mdx`.
 */
export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
      {children}
    </section>
  );
}
