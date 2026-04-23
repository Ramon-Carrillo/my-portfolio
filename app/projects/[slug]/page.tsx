import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, BookOpen } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { projects } from "@/lib/data";
import { getAccentBase } from "@/lib/accent";
import { cn } from "@/lib/utils";

/**
 * Dynamic project detail route — `/projects/[slug]`.
 *
 * We statically generate one page per project at build time via
 * `generateStaticParams`, and produce per-project SEO metadata via
 * `generateMetadata`. Next 16 passes `params` as a Promise; it must be
 * awaited in both the page component and the metadata function.
 *
 * Each page replaces the previous modal-only surface and gives every
 * project its own shareable URL, unique title/description, and rich
 * Open Graph card (see ./opengraph-image.tsx).
 */

interface PageProps {
  params: Promise<{ slug: string }>;
}

// ─── Static params ─────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.id }));
}

// ─── Per-project metadata ─────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);

  if (!project) {
    return { title: "Project not found" };
  }

  const url = `https://ramoncarrillo.dev/projects/${project.id}`;

  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: `${project.title} · Ramon Carrillo`,
      description: project.description,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} · Ramon Carrillo`,
      description: project.description,
    },
  };
}

// ─── Accent helper — same palette as the card ─────────────────────────────────

function o(base: string, alpha: number) {
  return `oklch(${base} / ${alpha}%)`;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);

  if (!project) notFound();

  const base = getAccentBase(project.id);
  const hasLinks = project.href || project.repo;

  // Per-page JSON-LD — a focused CreativeWork with Person author reference.
  // Lives on the detail page so Google has a direct link between each
  // shareable project URL and its structured metadata.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `https://ramoncarrillo.dev/projects/${project.id}`,
    name: project.title,
    description: project.longDescription ?? project.description,
    url: `https://ramoncarrillo.dev/projects/${project.id}`,
    image: project.image
      ? `https://ramoncarrillo.dev${project.image}`
      : undefined,
    codeRepository: project.repo,
    keywords: project.tags.join(", "),
    author: {
      "@type": "Person",
      "@id": "https://ramoncarrillo.dev/#person",
      name: "Ramon Carrillo",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="mx-auto max-w-3xl px-6 pb-24 pt-12">
        {/* ── Back link ── */}
        <Link
          href="/#projects"
          className={cn(
            "group inline-flex items-center gap-2 text-sm text-muted-foreground",
            "transition-colors hover:text-primary",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            "focus-visible:rounded focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          )}
        >
          <ArrowLeft
            className="size-4 transition-transform group-hover:-translate-x-0.5"
            aria-hidden="true"
          />
          All projects
        </Link>

        {/* ── Hero image (or accent placeholder if no screenshot) ── */}
        <div
          className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-2xl border border-border"
          style={{
            background: `radial-gradient(ellipse at 68% 30%, ${o(base, 22)}, transparent 65%), ${o(base, 5)}`,
          }}
        >
          {/* Decorative accent circles — match the card aesthetic */}
          <div
            className="absolute -right-10 -top-10 size-48 rounded-full"
            style={{ backgroundColor: o(base, 20) }}
            aria-hidden="true"
          />
          <div
            className="absolute bottom-8 left-12 size-20 rounded-full"
            style={{ backgroundColor: o(base, 12) }}
            aria-hidden="true"
          />

          {project.image && (
            <Image
              src={project.image}
              alt={`${project.title} — main screenshot`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          )}
        </div>

        {/* ── Title + description ── */}
        <header className="mt-10">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {project.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            {project.description}
          </p>

          {/* Primary CTAs — prominent links to live + source */}
          {hasLinks && (
            <div className="mt-6 flex flex-wrap gap-3">
              {project.href && (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5",
                    "text-sm font-medium text-primary-foreground",
                    "transition-colors hover:bg-primary/90",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    "focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  )}
                >
                  <ExternalLink className="size-4" aria-hidden="true" />
                  Live demo
                </a>
              )}
              {project.caseStudySlug && (
                <Link
                  href={`/blog/${project.caseStudySlug}`}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-lg border border-primary/40 bg-primary/5 px-5 py-2.5",
                    "text-sm font-medium text-foreground",
                    "transition-colors hover:border-primary/70 hover:bg-primary/10",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    "focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  )}
                >
                  <BookOpen className="size-4 text-primary" aria-hidden="true" />
                  Read the case study
                </Link>
              )}
              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5",
                    "text-sm font-medium text-foreground",
                    "transition-colors hover:border-primary/50 hover:text-primary",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    "focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  )}
                >
                  <FaGithub size={15} aria-hidden="true" />
                  View source
                </a>
              )}
            </div>
          )}
        </header>

        {/* ── Long description ── */}
        {project.longDescription && (
          <section className="mt-10">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              About this project
            </h2>
            <p className="mt-3 text-base leading-[1.85] text-muted-foreground">
              {project.longDescription}
            </p>
          </section>
        )}

        {/* ── Highlights — only for projects with an opted-in "why it matters" list ── */}
        {project.highlights && project.highlights.length > 0 && (
          <section className="mt-10 rounded-xl border border-border/60 bg-card/60 p-6">
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-primary">
              Why it matters
            </h2>
            <ul className="space-y-3">
              {project.highlights.map((point, i) => (
                <li
                  key={i}
                  className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* ── Tech stack ── */}
        {project.tags.length > 0 && (
          <section className="mt-10">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Stack
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2" aria-label="Technology stack">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-lg border border-border bg-background px-3 py-1 text-xs font-medium text-foreground"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* ── Footer: back to all projects ── */}
        <div className="mt-16 border-t border-border pt-8">
          <Link
            href="/#projects"
            className={cn(
              "group inline-flex items-center gap-2 text-sm text-muted-foreground",
              "transition-colors hover:text-primary",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              "focus-visible:rounded focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            )}
          >
            <ArrowLeft
              className="size-4 transition-transform group-hover:-translate-x-0.5"
              aria-hidden="true"
            />
            All projects
          </Link>
        </div>
      </article>
    </>
  );
}
