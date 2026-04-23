import type { Project } from "./types";

export const projects: Project[] = [
  {
    id: "google-maps-rag-assistant",
    title: "Google Maps RAG Assistant",
    description:
      "AI-powered developer support for Google Maps Platform. Every answer is grounded in official documentation with inline citations and a committed eval suite.",
    longDescription:
      "A production-grade RAG (Retrieval-Augmented Generation) assistant that answers developer questions about the Maps JavaScript API, Places, Routes, billing, and troubleshooting. Built with Claude Sonnet 4.6, voyage-code-3 embeddings, Neon pgvector, and the Vercel AI SDK. Features a committed 12-question eval suite with an LLM-as-judge scorer — the repo's git history shows a measured v1 → v2 → v3 iteration arc ending at 12/12 on the golden set. Every answer streams inline citations with cosine-similarity scores so users can verify the sources. Informed directly by a year of Tier 1 Google Maps Platform support at HCLTech.",
    highlights: [
      "Hybrid RAG: curated Neon pgvector corpus for common questions, Anthropic's managed web_search tool for long-tail questions not in the corpus — live against developers.google.com",
      "Two-stage retrieval: Voyage voyage-code-3 bi-encoder for recall, rerank-2 cross-encoder for precision, with graceful fallback to cosine when rate-limited",
      "Never hallucinates — adversarial questions (e.g. 'Holographic API pricing') are refused with cited reasoning, not fabricated",
      "Committed eval suite with LLM-as-judge scoring across 15 golden questions. Every run is time-stamped in git, documenting the v1 → v2 → v4 iteration arc",
      "Streams retrieved sources with similarity scores as first-class citizens in the UI — users can verify where every answer came from",
      "Informed by a year of real Google Maps Platform Tier 1 support experience at HCLTech",
    ],
    tags: [
      "Next.js 16",
      "TypeScript",
      "Claude Sonnet 4.6",
      "Vercel AI SDK",
      "Voyage Embeddings",
      "Neon Postgres",
      "pgvector",
      "RAG",
      "LLM-as-Judge Evals",
      "Tailwind CSS",
      "shadcn/ui",
    ],
    image: "/images/google-maps-rag.png",
    imageAlt:
      "Google Maps RAG Assistant landing page showing a chat interface with suggestion chips for Routes, Places, Billing, Debugging, Deprecations, and Getting Started categories.",
    href: "https://google-maps-rag-assistant.vercel.app",
    repo: "https://github.com/Ramon-Carrillo/google-maps-rag-assistant",
    caseStudySlug: "building-a-grounded-rag-assistant",
  },
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
];
