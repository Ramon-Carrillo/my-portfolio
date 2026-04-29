import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { ArrowLeft } from "lucide-react";
import { getPostBySlug } from "@/lib/posts";
import {
  LOCALE_COOKIE,
  dict,
  formatPublishedDateLocalized,
  localizePost,
  resolveLocale,
} from "@/lib/i18n";
import EnContent from "./content.en.mdx";
import EsContent from "./content.es.mdx";

const SLUG = "shipping-wcag-aa-checklist";
const post = getPostBySlug(SLUG)!;

export const metadata: Metadata = {
  title: post.title,
  description: post.excerpt,
  alternates: {
    canonical: `https://ramoncarrillo.dev/blog/${post.slug}`,
  },
  openGraph: {
    type: "article",
    url: `https://ramoncarrillo.dev/blog/${post.slug}`,
    title: `${post.title} · Ramon Carrillo`,
    description: post.excerpt,
    publishedTime: post.publishedAt,
    authors: ["Ramon Carrillo"],
    tags: post.tags,
  },
  twitter: {
    card: "summary_large_image",
    title: post.title,
    description: post.excerpt,
  },
};

export default async function Page() {
  const cookieStore = await cookies();
  const locale = resolveLocale(cookieStore.get(LOCALE_COOKIE)?.value);
  const t = dict[locale];
  const localized = localizePost(post, locale);
  const Content = locale === "es" ? EsContent : EnContent;

  return (
    <>
      {/* ───── Back link ───── */}
      <Link
        href="/blog"
        className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
        {t.blog.allPosts}
      </Link>

      {/* ───── Header ───── */}
      <header className="mt-8 mb-10 border-b border-border pb-8">
        <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <time dateTime={localized.publishedAt}>
            {formatPublishedDateLocalized(localized.publishedAt, locale)}
          </time>
          <span aria-hidden="true">·</span>
          <span>{localized.readingTime}</span>
          <span aria-hidden="true">·</span>
          <span className="rounded-full border bg-card px-2 py-0.5 font-medium">
            {t.blog.checklistChip}
          </span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
          {localized.title}
        </h1>

        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          {localized.excerpt}
        </p>
      </header>

      {/* ───── Body ───── */}
      <Content />
    </>
  );
}
