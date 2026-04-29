import type { Project } from "./types";

export const projects: Project[] = [
  {
    id: "google-maps-rag-assistant",
    title: "Google Maps RAG Assistant",
    title_es: "Asistente RAG para Google Maps",
    description:
      "AI-powered developer support for Google Maps Platform. Every answer is grounded in official documentation with inline citations and a committed eval suite.",
    description_es:
      "Soporte para desarrolladores con IA para Google Maps Platform. Cada respuesta tiene fundamento en la documentación oficial, con citas en línea y una suite de evaluaciones versionada.",
    longDescription:
      "A production-grade RAG (Retrieval-Augmented Generation) assistant that answers developer questions about the Maps JavaScript API, Places, Routes, billing, and troubleshooting. Built with Claude Sonnet 4.6, voyage-code-3 embeddings, Neon pgvector, and the Vercel AI SDK. Features a committed 12-question eval suite with an LLM-as-judge scorer — the repo's git history shows a measured v1 → v2 → v3 iteration arc ending at 12/12 on the golden set. Every answer streams inline citations with cosine-similarity scores so users can verify the sources. Informed directly by a year of Tier 1 Google Maps Platform support at HCLTech.",
    longDescription_es:
      "Un asistente RAG (Retrieval-Augmented Generation) de nivel productivo que responde preguntas de desarrolladores sobre la Maps JavaScript API, Places, Routes, facturación y troubleshooting. Construido con Claude Sonnet 4.6, embeddings voyage-code-3, Neon pgvector y el Vercel AI SDK. Incluye una suite de 12 preguntas evaluada con LLM-as-judge — el historial de git muestra el arco medido v1 → v2 → v3 hasta llegar a 12/12 en el set dorado. Cada respuesta emite citas en línea con puntajes de similitud coseno, para que cualquiera pueda verificar las fuentes. Está informado directamente por un año de soporte Tier 1 a Google Maps Platform en HCLTech.",
    highlights: [
      "Hybrid RAG: curated Neon pgvector corpus for common questions, Anthropic's managed web_search tool for long-tail questions not in the corpus — live against developers.google.com",
      "Two-stage retrieval: Voyage voyage-code-3 bi-encoder for recall, rerank-2 cross-encoder for precision, with graceful fallback to cosine when rate-limited",
      "Never hallucinates — adversarial questions (e.g. 'Holographic API pricing') are refused with cited reasoning, not fabricated",
      "Committed eval suite with LLM-as-judge scoring across 15 golden questions. Every run is time-stamped in git, documenting the v1 → v2 → v4 iteration arc",
      "Streams retrieved sources with similarity scores as first-class citizens in the UI — users can verify where every answer came from",
      "Informed by a year of real Google Maps Platform Tier 1 support experience at HCLTech",
    ],
    highlights_es: [
      "RAG híbrido: corpus curado en Neon pgvector para las preguntas comunes y la herramienta web_search administrada de Anthropic para las preguntas de cola larga que no están en el corpus — en vivo contra developers.google.com",
      "Recuperación en dos etapas: bi-encoder voyage-code-3 para recall y cross-encoder rerank-2 para precisión, con fallback elegante a coseno cuando hay rate limit",
      "No alucina — preguntas adversariales (por ejemplo, 'precios de la Holographic API') se rechazan con razonamiento citado, no inventado",
      "Suite de evaluaciones versionada con calificación LLM-as-judge en 15 preguntas doradas. Cada corrida queda con timestamp en git, documentando el arco v1 → v2 → v4",
      "Las fuentes recuperadas se transmiten con sus puntajes de similitud como ciudadanos de primera clase en la UI — cualquiera puede verificar de dónde sale cada respuesta",
      "Construido con base en un año real de soporte Tier 1 a Google Maps Platform en HCLTech",
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
    imageAlt_es:
      "Página de inicio del Asistente RAG para Google Maps mostrando una interfaz de chat con chips de sugerencias para las categorías Routes, Places, Facturación, Depuración, Deprecaciones y Primeros pasos.",
    href: "https://google-maps-rag-assistant.vercel.app",
    repo: "https://github.com/Ramon-Carrillo/google-maps-rag-assistant",
    caseStudySlug: "building-a-grounded-rag-assistant",
  },
  {
    id: "chimneys-plus",
    title: "Chimneys Plus",
    title_es: "Chimneys Plus",
    description:
      "Responsive marketing website for a chimney and fireplace services company — clean design, fast performance, and easy contact flows.",
    description_es:
      "Sitio web responsivo de marketing para una empresa de servicios de chimeneas — diseño limpio, buen rendimiento y flujos de contacto sencillos.",
    longDescription:
      "A marketing website for a local chimney and fireplace service provider. Built to establish a trustworthy online presence with a service showcase, responsive layout, and contact/booking flows. Focused on performance and SEO to help the business get found and convert visitors into leads.",
    longDescription_es:
      "Sitio web de marketing para un proveedor local de servicios de chimeneas. Construido para establecer una presencia en línea confiable, con un escaparate de servicios, layout responsivo y flujos de contacto / agendamiento. Enfocado en rendimiento y SEO para que el negocio sea encontrado y convierta visitantes en prospectos.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "shadcn/ui", "Responsive Design", "SEO"],
    image: "/images/chimneys-plus.png",
    href: "https://chimneys-plus.vercel.app/",
    repo: "https://github.com/Ramon-Carrillo/chimneys-plus",
  },
  {
    id: "ecommerce-platform",
    title: "E-Commerce Platform",
    title_es: "Plataforma de E-Commerce",
    description:
      "Full-stack storefront with cart, checkout, and Stripe payments — optimised for performance and conversion.",
    description_es:
      "Tienda full-stack con carrito, checkout y pagos con Stripe — optimizada para rendimiento y conversión.",
    longDescription:
      "A production-ready e-commerce platform built with Next.js App Router, featuring server-side cart management, optimistic UI updates, and a seamless Stripe checkout flow. The database layer uses Prisma ORM with PostgreSQL, with full-text search and faceted product filtering. Lighthouse scores 97+ across all categories.",
    longDescription_es:
      "Plataforma de e-commerce lista para producción, construida con el App Router de Next.js. Maneja el carrito en el servidor, hace updates optimistas en la UI y tiene un flujo de checkout fluido con Stripe. La capa de datos usa Prisma ORM con PostgreSQL, con búsqueda full-text y filtros facetados de productos. Lighthouse arriba de 97 en todas las categorías.",
    tags: ["Next.js 16", "React 19", "TypeScript", "Stripe", "PostgreSQL", "Prisma", "Tailwind CSS", "Framer Motion", "React Hook Form", "Zod", "shadcn/ui"],
    image: "/images/e-commerce.png",
    href: "https://lumina-store-rden.vercel.app/",
    repo: "https://github.com/Ramon-Carrillo/lumina-store",
  },
  {
    id: "eco-shop",
    title: "EcoShop",
    title_es: "EcoShop",
    description:
      "Sustainable e-commerce storefront with an AI-powered customer support agent built on Claude.",
    description_es:
      "Tienda de e-commerce sustentable con un agente de soporte al cliente impulsado por Claude.",
    longDescription:
      "A sustainable products storefront featuring an AI support agent built with Vercel AI SDK and Claude Sonnet. The agent manages order lookups, return eligibility, billing breakdowns, product discovery with sustainability scores, and customer de-escalation. It utilizes streaming responses, chain-of-thought reasoning, seven Prisma-based database tools, and robust security guardrails like rate limiting and prompt injection protection.",
    longDescription_es:
      "Tienda de productos sustentables con un agente de soporte impulsado por el Vercel AI SDK y Claude Sonnet. El agente busca órdenes, valida elegibilidad de devoluciones, explica desglose de cobros, ayuda a descubrir productos con puntaje de sustentabilidad y desescala a clientes molestos. Usa respuestas en streaming, razonamiento chain-of-thought, siete herramientas de base de datos sobre Prisma y guardrails de seguridad robustos como rate limiting y protección contra prompt injection.",
    tags: ["Next.js", "TypeScript", "Claude AI", "Vercel AI SDK", "Prisma", "PostgreSQL", "Tailwind CSS", "Framer Motion", "Zod"],
    image: "/images/ecoshop.png",
    href: "https://ecoshop-coral.vercel.app/",
    repo: "https://github.com/Ramon-Carrillo/eco_shop",
  },
];
