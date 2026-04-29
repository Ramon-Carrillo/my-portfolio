/**
 * i18n — bilingual support (English + Mexican Spanish).
 *
 * The site reads the locale from a cookie at request time. Default
 * locale is Spanish so a first-time visitor lands on the Spanish
 * version; the navbar toggle flips it and persists the choice.
 *
 * SEO metadata (`<title>`, descriptions, OG, JSON-LD) intentionally
 * stays English — the toggle is a per-visitor UI preference, not a
 * separate locale route. A proper route-based i18n (`/en`, `/es`)
 * would replace this when search-engine ranking matters in both
 * languages.
 */

import type { Project, Post } from "./types";

export const LOCALES = ["en", "es"] as const;
export type Locale = (typeof LOCALES)[number];

/** Default locale when no cookie is present. */
export const DEFAULT_LOCALE: Locale = "es";

/** Cookie name for the persisted locale choice. */
export const LOCALE_COOKIE = "locale";

export function isLocale(value: unknown): value is Locale {
  return value === "en" || value === "es";
}

/** Coerce any incoming string into a valid Locale, falling back to default. */
export function resolveLocale(value: unknown): Locale {
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

// ─── Dictionary ──────────────────────────────────────────────────────────────

export const dict = {
  en: {
    common: {
      skipLink: "Skip to main content",
    },
    nav: {
      about: "About",
      projects: "Projects",
      blog: "Blog",
      contact: "Contact",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      primaryNav: "Primary navigation",
      mobileNav: "Mobile navigation",
      langToggle: "Switch to Spanish",
      langCode: "EN",
    },
    hero: {
      hello: "Hello, I'm",
      role: "Full-Stack Developer",
      tagline:
        "I build production-grade web apps with Next.js, TypeScript, and Claude — grounded AI, Stripe-powered checkouts, and accessible interfaces that actually ship.",
      viewProjects: "View Projects",
      readBlog: "Read the blog",
      contact: "Contact",
      scrollToAbout: "Scroll to about section",
      codeDemoAria:
        "Code example: a retrieval call from the Google Maps RAG Assistant returning three grounded sources",
      codeDemoComment: "// Grounded answers — no hallucinations.",
      codeDemoQuery: '"How do I fix RefererNotAllowedMapError?"',
      codeDemoRetrieved: "retrieved",
      codeDemoCosine: "cosine sim",
      codeDemoSummary: "3 sources retrieved · grounded & cited",
    },
    about: {
      heading: "About",
      photoAlt: "Ramon Carrillo, Full-Stack Developer",
      stackHeading: "Tech Stack",
      stackAria: "Technologies I work with",
      bio: [
        "I'm a full-stack developer who came into engineering from the other side of the support phone. I spent a year at HCLTech as a Tier 1 Google Maps Platform support engineer — every day, I helped developers debug `RefererNotAllowedMapError`, untangle billing credits, and migrate off deprecated APIs.",
        "That experience shaped how I build. I've seen exactly what breaks in production and how it feels when it does, so I write code with real users in mind: clear error states, grounded AI answers instead of confident hallucinations, citations where they matter, and accessibility treated as a baseline — not a retrofit.",
        "Today I focus on production-grade web apps with Next.js, TypeScript, and Claude — including RAG systems, AI agents, and Stripe-powered storefronts. Most of my recent work is shipped live with committed eval suites so quality isn't a vibe, it's a number.",
      ],
    },
    projects: {
      heading: "Projects",
      featuredBadge: "Featured case study",
      readCaseStudy: "Read the case study",
      liveDemo: "Live demo",
      source: "Source",
      viewSource: "View source",
      concept: "Concept",
      viewCaseStudyAria: "View case study",
      readCaseStudyAria: "Read the case study",
      liveDemoAria: "Live demo",
      sourceAria: "Source code",
      backToProjects: "All projects",
      aboutThisProject: "About this project",
      whyItMatters: "Why it matters",
      stack: "Stack",
      stackAria: "Technology stack",
      screenshotFallback: "screenshot",
      mainScreenshotFallback: "main screenshot",
    },
    contact: {
      heading: "Contact",
      leadIn: "Have a project in mind or just want to say hello?",
      name: "Name",
      email: "Email",
      message: "Message",
      send: "Send message",
      sending: "Sending…",
      successToast: "Message sent! I'll get back to you soon.",
      genericError: "Failed to send message. Please try again.",
      validation: {
        nameRequired: "Name is required",
        emailInvalid: "Invalid email address",
        messageMin: "Message must be at least 10 characters",
      },
    },
    footer: {
      tagline:
        "Production-grade web apps with Next.js, TypeScript, and Claude — all shipped live.",
      quickLinks: "Quick Links",
      connect: "Connect",
      copyright: (year: number) =>
        `© ${year} Ramon Carrillo. All rights reserved.`,
      madeWith: "Made with",
      love: "love",
      using: "using Next.js & Tailwind CSS",
      footerNav: "Footer navigation",
    },
    blog: {
      eyebrow: "Writing",
      title: "Blog",
      lead:
        "Long-form case studies and engineering notes on what I ship. Each post traces a real project — the decisions, the failures, and what the eval data said.",
      noPosts: "No posts yet. Come back soon.",
      allPosts: "All posts",
      caseStudyChip: "Case study",
      checklistChip: "Checklist",
      read: "Read",
      readAria: (title: string) => `Read: ${title}`,
    },
    notFound: {
      heading: "No relevant documentation was found for this query.",
      body: "That page doesn't exist — it may have moved, or you followed a broken link. Try one of the links below.",
      backHome: "Back home",
      browseProjects: "Browse projects",
    },
  },

  es: {
    common: {
      skipLink: "Saltar al contenido principal",
    },
    nav: {
      about: "Acerca de",
      projects: "Proyectos",
      blog: "Blog",
      contact: "Contacto",
      openMenu: "Abrir menú",
      closeMenu: "Cerrar menú",
      primaryNav: "Navegación principal",
      mobileNav: "Navegación móvil",
      langToggle: "Cambiar a inglés",
      langCode: "ES",
    },
    hero: {
      hello: "Hola, soy",
      role: "Desarrollador Full-Stack",
      tagline:
        "Construyo aplicaciones web de nivel productivo con Next.js, TypeScript y Claude — IA con fundamentos, pagos con Stripe e interfaces accesibles que de verdad llegan a producción.",
      viewProjects: "Ver proyectos",
      readBlog: "Leer el blog",
      contact: "Contacto",
      scrollToAbout: "Bajar a la sección Acerca de",
      codeDemoAria:
        "Ejemplo de código: una llamada de recuperación del Google Maps RAG Assistant que regresa tres fuentes con fundamento",
      codeDemoComment: "// Respuestas con fundamento — sin alucinaciones.",
      codeDemoQuery: '"¿Cómo arreglo RefererNotAllowedMapError?"',
      codeDemoRetrieved: "recuperadas",
      codeDemoCosine: "sim. coseno",
      codeDemoSummary: "3 fuentes recuperadas · con fundamento y citadas",
    },
    about: {
      heading: "Acerca de",
      photoAlt: "Ramon Carrillo, Desarrollador Full-Stack",
      stackHeading: "Stack técnico",
      stackAria: "Tecnologías con las que trabajo",
      bio: [
        "Soy un desarrollador full-stack que llegó a la ingeniería desde el otro lado del teléfono de soporte. Pasé un año en HCLTech como ingeniero de soporte Tier 1 para Google Maps Platform — todos los días ayudaba a desarrolladores a depurar `RefererNotAllowedMapError`, a desenredar créditos de facturación y a migrar fuera de APIs deprecadas.",
        "Esa experiencia moldeó la manera en que construyo. He visto exactamente qué se rompe en producción y cómo se siente cuando pasa, así que escribo código pensando en personas reales: estados de error claros, respuestas de IA con fundamento en lugar de alucinaciones seguras de sí mismas, citas donde importan y accesibilidad como base — no como un parche al final.",
        "Hoy me enfoco en aplicaciones web de nivel productivo con Next.js, TypeScript y Claude — incluyendo sistemas RAG, agentes de IA y tiendas con pagos de Stripe. La mayor parte de mi trabajo reciente está desplegado en vivo con suites de evaluación versionadas, para que la calidad no sea una sensación: sea un número.",
      ],
    },
    projects: {
      heading: "Proyectos",
      featuredBadge: "Caso de estudio destacado",
      readCaseStudy: "Leer el caso de estudio",
      liveDemo: "Demo en vivo",
      source: "Código",
      viewSource: "Ver código",
      concept: "Concepto",
      viewCaseStudyAria: "Ver caso de estudio",
      readCaseStudyAria: "Leer el caso de estudio",
      liveDemoAria: "Demo en vivo",
      sourceAria: "Código fuente",
      backToProjects: "Todos los proyectos",
      aboutThisProject: "Sobre este proyecto",
      whyItMatters: "Por qué importa",
      stack: "Stack",
      stackAria: "Stack tecnológico",
      screenshotFallback: "captura de pantalla",
      mainScreenshotFallback: "captura principal",
    },
    contact: {
      heading: "Contacto",
      leadIn: "¿Tienes un proyecto en mente o nada más quieres saludar?",
      name: "Nombre",
      email: "Correo",
      message: "Mensaje",
      send: "Enviar mensaje",
      sending: "Enviando…",
      successToast: "¡Mensaje enviado! Te contesto pronto.",
      genericError: "No se pudo enviar el mensaje. Inténtalo de nuevo.",
      validation: {
        nameRequired: "El nombre es obligatorio",
        emailInvalid: "Correo inválido",
        messageMin: "El mensaje debe tener al menos 10 caracteres",
      },
    },
    footer: {
      tagline:
        "Aplicaciones web de nivel productivo con Next.js, TypeScript y Claude — todas desplegadas en vivo.",
      quickLinks: "Enlaces rápidos",
      connect: "Conecta",
      copyright: (year: number) =>
        `© ${year} Ramon Carrillo. Todos los derechos reservados.`,
      madeWith: "Hecho con",
      love: "cariño",
      using: "usando Next.js y Tailwind CSS",
      footerNav: "Navegación del pie de página",
    },
    blog: {
      eyebrow: "Escritos",
      title: "Blog",
      lead:
        "Casos de estudio extensos y notas de ingeniería sobre lo que envío a producción. Cada post recorre un proyecto real — las decisiones, los tropiezos y lo que dijeron los datos de evaluación.",
      noPosts: "Aún no hay posts. Vuelve pronto.",
      allPosts: "Todos los posts",
      caseStudyChip: "Caso de estudio",
      checklistChip: "Checklist",
      read: "Leer",
      readAria: (title: string) => `Leer: ${title}`,
    },
    notFound: {
      heading: "No se encontró documentación relevante para esta consulta.",
      body: "Esta página no existe — puede que se haya movido o que hayas seguido un enlace roto. Prueba con uno de los enlaces de abajo.",
      backHome: "Volver al inicio",
      browseProjects: "Ver proyectos",
    },
  },
};

// Widen literals with `typeof dict.en` (no `as const` on the dict
// itself) so both locales unify under the same shape — narrow string
// literals would make Spanish strings non-assignable to the English
// shape and vice-versa.
export type Dict = (typeof dict)["en"];

/** Get the dictionary for a locale. */
export function t(locale: Locale): Dict {
  return dict[locale];
}

// ─── Project / Post localization helpers ─────────────────────────────────────

/**
 * Returns a project view-model with text fields swapped to the given
 * locale. Falls back to English fields when a Spanish field is missing
 * — useful while the data layer is being filled in.
 */
export function localizeProject(
  project: Project,
  locale: Locale,
): {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  highlights?: string[];
  imageAlt?: string;
  tags: string[];
  image?: string;
  href?: string;
  repo?: string;
  caseStudySlug?: string;
} {
  if (locale === "en") {
    return {
      id: project.id,
      title: project.title,
      description: project.description,
      longDescription: project.longDescription,
      highlights: project.highlights,
      imageAlt: project.imageAlt,
      tags: project.tags,
      image: project.image,
      href: project.href,
      repo: project.repo,
      caseStudySlug: project.caseStudySlug,
    };
  }

  return {
    id: project.id,
    title: project.title_es ?? project.title,
    description: project.description_es ?? project.description,
    longDescription: project.longDescription_es ?? project.longDescription,
    highlights: project.highlights_es ?? project.highlights,
    imageAlt: project.imageAlt_es ?? project.imageAlt,
    tags: project.tags,
    image: project.image,
    href: project.href,
    repo: project.repo,
    caseStudySlug: project.caseStudySlug,
  };
}

/** Returns the post's title / excerpt in the given locale, with fallback. */
export function localizePost(post: Post, locale: Locale): {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  updatedAt?: string;
  readingTime: string;
  tags: string[];
  projectSlug?: string;
} {
  if (locale === "en") {
    return {
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      publishedAt: post.publishedAt,
      updatedAt: post.updatedAt,
      readingTime: post.readingTime,
      tags: post.tags,
      projectSlug: post.projectSlug,
    };
  }
  return {
    slug: post.slug,
    title: post.title_es ?? post.title,
    excerpt: post.excerpt_es ?? post.excerpt,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
    readingTime: post.readingTime_es ?? post.readingTime,
    tags: post.tags,
    projectSlug: post.projectSlug,
  };
}

/** Format a published-at ISO date for the active locale. */
export function formatPublishedDateLocalized(iso: string, locale: Locale): string {
  const tag = locale === "es" ? "es-MX" : "en-US";
  return new Date(iso + "T00:00:00Z").toLocaleDateString(tag, {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
