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
  href?: string;
  repo?: string;
  /**
   * Optional slug of a blog post that serves as the case study for
   * this project. When set, renders a "Read the case study" CTA on
   * the project card and detail page, pointing at /blog/<caseStudySlug>.
   */
  caseStudySlug?: string;
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
