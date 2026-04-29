export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  /**
   * Optional 3-5 bullet points of what makes this project noteworthy.
   * Rendered in the project modal as a "Why it matters" callout.
   * Use sparingly — only for projects where there's a genuine
   * differentiator worth highlighting.
   */
  highlights?: string[];
  tags: string[];
  image?: string;
  /**
   * Descriptive alt text for `image`. Falls back to
   * `"${title} — screenshot"` when absent. Providing a rich alt that
   * describes what's visible in the screenshot is better for screen
   * reader users than the generic fallback (WCAG 1.1.1).
   */
  imageAlt?: string;
  href?: string;
  repo?: string;
  /**
   * Optional slug of a blog post that serves as the case study for
   * this project. When set, renders a "Read the case study" CTA on
   * the project card and detail page, pointing at /blog/<caseStudySlug>.
   */
  caseStudySlug?: string;

  // Spanish (Mexican) translations. Optional so the data layer can be
  // filled in incrementally — `localizeProject` falls back to the
  // English field when a `_es` value is missing.
  title_es?: string;
  description_es?: string;
  longDescription_es?: string;
  highlights_es?: string[];
  imageAlt_es?: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface Skill {
  name: string;
  category: "frontend" | "backend" | "tools" | "other";
}

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

  // Spanish (Mexican) translations.
  title_es?: string;
  excerpt_es?: string;
  readingTime_es?: string;
}
