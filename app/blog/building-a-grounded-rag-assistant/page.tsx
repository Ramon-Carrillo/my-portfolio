import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
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

const SLUG = "building-a-grounded-rag-assistant";
// Non-null assertion is safe — the slug is fixed and registered in lib/posts.
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

  // Localized inline labels for the action buttons that live in the
  // page chrome (architecture link doesn't translate — it's the page
  // name on the live demo).
  const actionLabels = {
    architecture: locale === "es" ? "Arquitectura" : "Architecture",
  };

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
            {t.blog.caseStudyChip}
          </span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
          {localized.title}
        </h1>

        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          {localized.excerpt}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          <a
            href="https://google-maps-rag-assistant.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-lg border border-primary/40 bg-primary/5 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/70 hover:bg-primary/10"
          >
            <ExternalLink className="size-4 text-primary" />
            {t.projects.liveDemo}
          </a>
          <a
            href="https://github.com/Ramon-Carrillo/google-maps-rag-assistant"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary"
          >
            <FaGithub size={14} />
            {t.projects.source}
          </a>
          <a
            href="https://google-maps-rag-assistant.vercel.app/architecture"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary"
          >
            {actionLabels.architecture}
          </a>
        </div>
      </header>

      {/* ───── Body ───── */}
      <Content />
    </>
  );
}
