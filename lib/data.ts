import type { Project } from "./types";

export const projects: Project[] = [
  {
    id: "chimneys-plus",
    title: "Chimneys Plus",
    description:
      "Responsive marketing website for a chimney and fireplace services company — clean design, fast performance, and easy contact flows.",
    longDescription:
      "A marketing website for a local chimney and fireplace service provider. Built to establish a trustworthy online presence with a service showcase, responsive layout, and contact/booking flows. Focused on performance and SEO to help the business get found and convert visitors into leads.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "shadcn/ui", "Responsive Design", "SEO"],
    image: "/images/chimneys-plus.png",
    href: "https://chimneys-plus.vercel.app/",
    repo: "https://github.com/Ramon-Carrillo/chimneys-plus",
  },
  {
    id: "ecommerce-platform",
    title: "E-Commerce Platform",
    description:
      "Full-stack storefront with cart, checkout, and Stripe payments — optimised for performance and conversion.",
    longDescription:
      "A production-ready e-commerce platform built with Next.js App Router, featuring server-side cart management, optimistic UI updates, and a seamless Stripe checkout flow. The database layer uses Prisma ORM with PostgreSQL, with full-text search and faceted product filtering. Lighthouse scores 97+ across all categories.",
    tags: ["Next.js 16", "React 19", "TypeScript", "Stripe", "PostgreSQL", "Prisma", "Tailwind CSS", "Framer Motion", "React Hook Form", "Zod", "shadcn/ui"],
    image: "/images/e-commerce.png",
    href: "https://lumina-store-ooik-jgh01rsyc-thewiscokid81-8404s-projects.vercel.app",
    repo: "https://github.com/Ramon-Carrillo/lumina-store",
  },
  {
    id: "eco-shop",
    title: "EcoShop",
    description:
      "Sustainable e-commerce storefront with an AI-powered customer support agent built on Claude.",
    longDescription:
      "A sustainable products storefront featuring an AI support agent built with Vercel AI SDK and Claude Sonnet. The agent manages order lookups, return eligibility, billing breakdowns, product discovery with sustainability scores, and customer de-escalation. It utilizes streaming responses, chain-of-thought reasoning, seven Prisma-based database tools, and robust security guardrails like rate limiting and prompt injection protection.",
    tags: ["Next.js", "TypeScript", "Claude AI", "Vercel AI SDK", "Prisma", "PostgreSQL", "Tailwind CSS", "Framer Motion", "Zod"],
    image: "/images/ecoshop.png",
    href: "https://ecoshop-coral.vercel.app/",
    repo: "https://github.com/Ramon-Carrillo/eco_shop",
  },
  {
    id: "ai-task-manager",
    title: "AI Task Manager",
    description:
      "Intelligent task manager with GPT-powered prioritisation, natural language input, and smart scheduling.",
    longDescription:
      "An AI-first productivity app that uses OpenAI GPT-4 to parse natural language task input, auto-assign priorities, and suggest optimal scheduling based on deadlines and workload. Built on Next.js with real-time sync via Supabase Realtime. Features drag-and-drop Kanban boards, recurring tasks, and a distraction-free focus mode.",
    tags: ["Next.js", "React", "TypeScript", "OpenAI GPT-4", "Supabase Realtime", "Tailwind CSS", "Framer Motion", "Zod"],
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
    tags: ["React", "TypeScript", "Recharts", "Tailwind CSS", "WCAG 2.1 AA", "Accessibility", "ARIA"],
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
    tags: ["Next.js", "Node.js", "TypeScript", "Chart.js", "REST APIs", "OAuth 2.0", "PostgreSQL", "PDF Generation"],
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
    tags: ["Figma API", "TypeScript", "Node.js", "React", "Tailwind CSS", "CLI", "Storybook"],
    href: undefined,
    repo: undefined,
  },
];

