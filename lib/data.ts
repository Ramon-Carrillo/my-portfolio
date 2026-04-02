import type { Experience, Project, Skill } from "./types";

export const projects: Project[] = [
  {
    id: "ecommerce-platform",
    title: "E-Commerce Platform",
    description:
      "Full-stack storefront with cart, checkout, and Stripe payments — optimised for performance and conversion.",
    longDescription:
      "A production-ready e-commerce platform built with Next.js App Router, featuring server-side cart management, optimistic UI updates, and a seamless Stripe checkout flow. The database layer uses Prisma ORM with PostgreSQL, with full-text search and faceted product filtering. Lighthouse scores 97+ across all categories.",
    tags: ["Next.js", "TypeScript", "Stripe", "PostgreSQL", "Prisma", "Tailwind CSS"],
    href: undefined,
    repo: undefined,
  },
  {
    id: "ai-task-manager",
    title: "AI Task Manager",
    description:
      "Intelligent task manager with GPT-powered prioritisation, natural language input, and smart scheduling.",
    longDescription:
      "An AI-first productivity app that uses OpenAI GPT-4 to parse natural language task input, auto-assign priorities, and suggest optimal scheduling based on deadlines and workload. Built on Next.js with real-time sync via Supabase Realtime. Features drag-and-drop Kanban boards, recurring tasks, and a distraction-free focus mode.",
    tags: ["Next.js", "OpenAI", "TypeScript", "Supabase", "Tailwind CSS", "Framer Motion"],
    href: undefined,
    repo: undefined,
  },
  {
    id: "accessible-dashboard",
    title: "Accessible Analytics Dashboard",
    description:
      "WCAG 2.1 AA compliant data-visualisation dashboard — screen-reader-first, keyboard navigable, fully responsive.",
    longDescription:
      "A data visualisation dashboard built accessibility-first: every chart has an accessible text summary, all interactions are fully keyboard navigable, and colour palettes pass APCA contrast ratios. Uses Recharts with custom accessible wrappers and aria-live regions for dynamic updates. Audited and certified WCAG 2.1 AA compliant.",
    tags: ["React", "TypeScript", "Recharts", "Accessibility", "ARIA", "Tailwind CSS"],
    href: undefined,
    repo: undefined,
  },
  {
    id: "social-analytics-tool",
    title: "Social Analytics Tool",
    description:
      "Multi-platform social media analytics with real-time trend detection, unified insights, and automated reports.",
    longDescription:
      "A unified analytics platform that aggregates data from X (Twitter), LinkedIn, and Instagram APIs. Features real-time trend detection via a Node.js event-driven pipeline, automated weekly PDF reports, and a customisable metrics dashboard. OAuth integration handles multi-account management across teams and organisations.",
    tags: ["Next.js", "Node.js", "TypeScript", "Chart.js", "REST APIs", "OAuth"],
    href: undefined,
    repo: undefined,
  },
  {
    id: "portfolio-builder",
    title: "Portfolio Builder",
    description:
      "No-code drag-and-drop portfolio builder with live preview, custom theming, and one-click Vercel deploy.",
    longDescription:
      "A visual portfolio builder for developers and designers. Features a drag-and-drop block editor built with @dnd-kit, real-time collaborative editing via Liveblocks, and 12 handcrafted themes. Generated sites are exported as static Next.js projects and deployed directly to Vercel via their Deploy API.",
    tags: ["Next.js", "React", "TypeScript", "Framer Motion", "@dnd-kit", "Liveblocks"],
    href: undefined,
    repo: undefined,
  },
  {
    id: "figma-to-code",
    title: "Figma-to-Code Workflow Tool",
    description:
      "CLI + web tool that converts Figma frames into clean, accessible React components with Tailwind CSS.",
    longDescription:
      "A developer tool that uses the Figma REST API to parse design tokens, component structures, and layout constraints, then generates production-quality React + Tailwind CSS code. The CLI supports watch mode for live sync during design handoff. Auto-generates Storybook stories and accessibility annotations derived from Figma's inspection data.",
    tags: ["Figma API", "TypeScript", "Node.js", "React", "Tailwind CSS", "CLI"],
    href: undefined,
    repo: undefined,
  },
];

export const experience: Experience[] = [
  {
    role: "Role Title",
    company: "Company Name",
    period: "Jan 2024 – Present",
    description: "What you built, owned, or improved.",
  },
];

export const skills: Skill[] = [
  { name: "TypeScript", category: "frontend" },
  { name: "React / Next.js", category: "frontend" },
  { name: "Tailwind CSS", category: "frontend" },
  { name: "Node.js", category: "backend" },
  { name: "PostgreSQL", category: "backend" },
  { name: "Git", category: "tools" },
];
