import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Global MDX components for the blog.
 *
 * Every block-level markdown element gets a Tailwind-styled wrapper
 * here so `.mdx` post files can stay purely content-focused — no
 * per-post className plumbing. Typography tuned to match the rest of
 * the portfolio (inter-ish sans, leading-relaxed, muted-foreground for
 * body text).
 *
 * Next.js automatically calls this on every MDX file rendered by the
 * app router. Required file location: project root, named exactly
 * `mdx-components.tsx`.
 */
const components: MDXComponents = {
  // ── Headings ─────────────────────────────────────────────────────
  h1: ({ children, ...props }) => (
    <h1
      className="mt-12 mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2
      className="mt-12 mb-3 text-2xl font-bold tracking-tight text-foreground"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3
      className="mt-8 mb-2 text-xl font-semibold tracking-tight text-foreground"
      {...props}
    >
      {children}
    </h3>
  ),
  h4: ({ children, ...props }) => (
    <h4 className="mt-6 mb-2 text-base font-semibold text-foreground" {...props}>
      {children}
    </h4>
  ),

  // ── Body text ────────────────────────────────────────────────────
  p: ({ children, ...props }) => (
    <p
      className="my-5 text-[15px] leading-[1.75] text-muted-foreground"
      {...props}
    >
      {children}
    </p>
  ),

  // ── Lists ────────────────────────────────────────────────────────
  ul: ({ children, ...props }) => (
    <ul
      className="my-5 ml-5 list-disc space-y-2 text-[15px] leading-[1.75] text-muted-foreground marker:text-primary/50"
      {...props}
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol
      className="my-5 ml-5 list-decimal space-y-2 text-[15px] leading-[1.75] text-muted-foreground marker:text-primary/50"
      {...props}
    >
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="pl-1" {...props}>
      {children}
    </li>
  ),

  // ── Links ────────────────────────────────────────────────────────
  // Internal `/path` links route through Next.js. External links get
  // target=_blank + rel=noopener.
  //
  // If the MDX author passes a custom className (e.g. to render a
  // button/pill inside a post), their className wins — we don't
  // clobber it with the default underline-link styling. This is what
  // lets things like `<a className="bg-primary ...">Live demo</a>`
  // render as a proper primary button instead of primary-on-primary
  // underlined text.
  //
  // Bare markdown links (`[text](url)`) don't pass className, so they
  // get our default underlined-primary style.
  a: ({ href = "", children, className, ...props }) => {
    const isInternal = href.startsWith("/") || href.startsWith("#");
    const finalClassName =
      className ??
      cn(
        "font-medium text-primary underline decoration-primary/30 underline-offset-4",
        "transition-colors hover:decoration-primary"
      );
    if (isInternal) {
      return (
        <Link href={href} className={finalClassName}>
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={finalClassName}
        {...props}
      >
        {children}
      </a>
    );
  },

  // ── Code (inline + block) ────────────────────────────────────────
  code: ({ children, className, ...props }) => {
    // Fenced code blocks arrive wrapped in <pre><code class="language-xxx">.
    // The <pre> element styling (below) handles the block case; here we
    // only style inline code (no `language-` class).
    const isBlock = typeof className === "string" && className.startsWith("language-");
    if (isBlock) {
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    }
    return (
      <code
        className="rounded bg-muted px-1.5 py-0.5 text-[13px] font-mono text-foreground"
        {...props}
      >
        {children}
      </code>
    );
  },
  pre: ({ children, ...props }) => (
    <pre
      className={cn(
        "my-6 overflow-x-auto rounded-lg border border-border bg-card p-4",
        "text-[13px] leading-[1.6] text-foreground/90"
      )}
      {...props}
    >
      {children}
    </pre>
  ),

  // ── Blockquote ───────────────────────────────────────────────────
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="my-6 border-l-2 border-primary/50 pl-4 text-[15px] italic leading-[1.75] text-foreground/80"
      {...props}
    >
      {children}
    </blockquote>
  ),

  // ── Horizontal rule ──────────────────────────────────────────────
  hr: (props) => <hr className="my-10 border-border" {...props} />,

  // ── Tables ───────────────────────────────────────────────────────
  table: ({ children, ...props }) => (
    <div className="my-6 overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-[13px]" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }) => (
    <thead className="bg-muted/40 text-left" {...props}>
      {children}
    </thead>
  ),
  th: ({ children, ...props }) => (
    <th
      className="border-b border-border px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td className="border-b border-border px-4 py-2.5 last:border-0" {...props}>
      {children}
    </td>
  ),
  tr: ({ children, ...props }) => (
    <tr className="last:[&>td]:border-0" {...props}>
      {children}
    </tr>
  ),

  // ── Images ───────────────────────────────────────────────────────
  img: ({ src = "", alt = "", ...props }) => (
    // MDX ships standard HTML <img> tags; wrap in Next/Image when the
    // src is a local asset so we get automatic optimization.
    <Image
      src={src as string}
      alt={alt}
      width={1200}
      height={630}
      className="my-6 rounded-lg border border-border"
      {...props}
    />
  ),

  // ── Strong + emphasis ────────────────────────────────────────────
  strong: ({ children, ...props }) => (
    <strong className="font-semibold text-foreground" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }) => (
    <em className="italic" {...props}>
      {children}
    </em>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
