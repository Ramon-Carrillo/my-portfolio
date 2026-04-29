import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { ArrowRight } from "lucide-react";
import { getAllPosts } from "@/lib/posts";
import {
  LOCALE_COOKIE,
  dict,
  formatPublishedDateLocalized,
  localizePost,
  resolveLocale,
} from "@/lib/i18n";

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

export default async function BlogIndexPage() {
  const cookieStore = await cookies();
  const locale = resolveLocale(cookieStore.get(LOCALE_COOKIE)?.value);
  const t = dict[locale];
  const rawPosts = getAllPosts();

  return (
    <>
      {/* Heading */}
      <header className="mb-12">
        <p className="mb-3 text-xs font-medium uppercase tracking-widest text-primary">
          {t.blog.eyebrow}
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          {t.blog.title}
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
          {t.blog.lead}
        </p>
      </header>

      {/* Posts list */}
      {rawPosts.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          {t.blog.noPosts}
        </p>
      ) : (
        <ul className="space-y-8">
          {rawPosts.map((rawPost) => {
            const post = localizePost(rawPost, locale);
            return (
              <li key={post.slug}>
                <article className="group relative">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="focus-visible:outline-none"
                    aria-label={t.blog.readAria(post.title)}
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
                          {formatPublishedDateLocalized(post.publishedAt, locale)}
                        </time>
                        <span aria-hidden="true">·</span>
                        <span>{post.readingTime}</span>
                        {post.projectSlug && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="rounded-full border bg-card px-2 py-0.5 text-[11px] font-medium">
                              {t.blog.caseStudyChip}
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
                          {t.blog.read}
                          <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </article>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
