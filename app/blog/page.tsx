import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllPosts, formatPublishedDate } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Long-form case studies and engineering notes by Ramon Carrillo — RAG systems, AI agents, Next.js, and shipping real production web apps.",
  alternates: {
    canonical: "https://ramoncarrillo.dev/blog",
  },
  openGraph: {
    title: "Blog · Ramon Carrillo",
    description:
      "Case studies and engineering notes on RAG, Claude, Next.js, and production web apps.",
    url: "https://ramoncarrillo.dev/blog",
    type: "website",
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <>
      {/* Heading */}
      <header className="mb-12">
        <p className="mb-3 text-xs font-medium uppercase tracking-widest text-primary">
          Writing
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Blog
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
          Long-form case studies and engineering notes on what I ship. Each
          post traces a real project — the decisions, the failures, and what
          the eval data said.
        </p>
      </header>

      {/* Posts list */}
      {posts.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No posts yet. Come back soon.
        </p>
      ) : (
        <ul className="space-y-8">
          {posts.map((post) => (
            <li key={post.slug}>
              <article className="group relative">
                <Link
                  href={`/blog/${post.slug}`}
                  className="focus-visible:outline-none"
                  aria-label={`Read: ${post.title}`}
                >
                  {/* Click target spans the whole card via ::after — lets
                      tag chips below remain un-clickable decoratively. */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-lg transition-colors group-hover:bg-accent/30"
                  />

                  <div className="relative flex flex-col gap-2 p-4">
                    {/* Meta row */}
                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <time dateTime={post.publishedAt}>
                        {formatPublishedDate(post.publishedAt)}
                      </time>
                      <span aria-hidden="true">·</span>
                      <span>{post.readingTime}</span>
                      {post.projectSlug && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="rounded-full border bg-card px-2 py-0.5 text-[11px] font-medium">
                            Case study
                          </span>
                        </>
                      )}
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-2xl">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {post.excerpt}
                    </p>

                    {/* Tags + read link */}
                    <div className="mt-2 flex items-center justify-between gap-3">
                      <ul className="flex flex-wrap gap-1.5">
                        {post.tags.slice(0, 4).map((tag) => (
                          <li
                            key={tag}
                            className="rounded-md bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-primary opacity-70 transition-opacity group-hover:opacity-100">
                        Read
                        <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
