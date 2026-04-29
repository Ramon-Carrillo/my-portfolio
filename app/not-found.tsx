import Link from "next/link";
import { cookies } from "next/headers";
import { ArrowLeft, Home, FolderOpen } from "lucide-react";
import { LOCALE_COOKIE, dict, resolveLocale } from "@/lib/i18n";

/**
 * Custom 404 page. Next.js renders this whenever a route can't be
 * matched OR when any server component calls `notFound()`.
 *
 * Structure mirrors the rest of the site (centered hero, primary +
 * secondary CTAs) so a mis-typed URL doesn't feel like hitting a
 * different site. Framer-motion is intentionally avoided here — 404
 * pages should load instantly without client-side JS booting first.
 */

export const metadata = {
  title: "404 — Page not found",
  description:
    "That page couldn't be found. Head back home or browse my project case studies.",
};

export default async function NotFound() {
  const cookieStore = await cookies();
  const locale = resolveLocale(cookieStore.get(LOCALE_COOKIE)?.value);
  const t = dict[locale];

  return (
    <section
      className="flex min-h-[calc(100vh-3.5rem-1px)] flex-col items-center justify-center px-6 py-24 text-center"
      // -3.5rem matches the navbar pt-14 in layout; -1px covers the border
    >
      {/* Error code — large and decorative */}
      <p
        aria-hidden="true"
        className="font-mono text-[96px] font-bold leading-none tracking-tighter text-primary/20 sm:text-[128px]"
      >
        404
      </p>

      <h1 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        {t.notFound.heading}
      </h1>

      <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
        {t.notFound.body}
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <Home className="size-4" aria-hidden="true" />
          {t.notFound.backHome}
        </Link>

        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary/50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <FolderOpen className="size-4" aria-hidden="true" />
          {t.notFound.browseProjects}
        </Link>
      </div>

      {/* Subtle back-link for keyboard users */}
      <Link
        href="/"
        className="mt-10 inline-flex items-center gap-1.5 text-xs text-muted-foreground/80 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:underline"
      >
        <ArrowLeft className="size-3" aria-hidden="true" />
        ramoncarrillo.dev
      </Link>
    </section>
  );
}
