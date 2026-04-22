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
