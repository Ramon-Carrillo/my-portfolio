import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Providers } from "@/components/providers";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Navbar } from "@/components/common/navbar";
import { Footer } from "@/components/common/footer";
import { projects } from "@/lib/data";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://ramoncarrillo.dev";

// Pitch-perfect meta description is a single sentence, ~140-160 chars,
// front-loaded with the search intent (name + role) and ending with a
// specific, concrete differentiator. Most SERP previews truncate at ~160.
const DESCRIPTION =
  "Ramon Carrillo — full-stack developer specialising in production-grade web apps with Next.js, TypeScript, and Claude. RAG systems, AI agents, and Stripe-powered storefronts, all shipped live.";

const SHORT_DESCRIPTION =
  "Full-stack developer specialising in Next.js, TypeScript, and Claude. RAG systems, AI agents, and Stripe-powered storefronts — all shipped live.";

// The OG-preview tool flagged a <40-char title. SERP tools consistently
// recommend 50-60 chars: long enough to carry a real value prop, short
// enough not to get truncated with an ellipsis. This lands at 58.
const TITLE_DEFAULT =
  "Ramon Carrillo · Full-Stack Developer — Next.js & Claude";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE_DEFAULT,
    template: "%s · Ramon Carrillo",
  },
  description: DESCRIPTION,
  // Keywords have near-zero direct SEO value today, but they're still
  // used by some aggregators and AI assistants. Keep the list tight and
  // honest — only terms the site actually demonstrates.
  keywords: [
    "Ramon Carrillo",
    "Full-Stack Developer",
    "Next.js",
    "React 19",
    "TypeScript",
    "Claude",
    "Anthropic",
    "Vercel AI SDK",
    "RAG",
    "Retrieval-Augmented Generation",
    "pgvector",
    "Neon Postgres",
    "Tailwind CSS",
    "Framer Motion",
    "Prisma",
    "Stripe",
    "Accessibility",
    "WCAG",
    "Portfolio",
  ],
  authors: [{ name: "Ramon Carrillo", url: SITE_URL }],
  creator: "Ramon Carrillo",
  publisher: "Ramon Carrillo",
  category: "technology",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    // `images` is intentionally omitted — the `app/opengraph-image.tsx`
    // file route auto-generates a correctly-sized 1200x630 image and
    // Next.js wires it into these meta tags at build time. Passing
    // `images` here would override the generated version.
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Ramon Carrillo — Portfolio",
    title: TITLE_DEFAULT,
    description: SHORT_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE_DEFAULT,
    description: SHORT_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // Add site verification codes here when you register for:
  //   - Google Search Console → verification.google
  //   - Bing Webmaster Tools → verification.other.bing
  // Leaving commented so the raw HTML stays clean until you have real codes.
  // verification: {
  //   google: "your-google-verification-token",
  // },
};

// Structured data (JSON-LD). We use a single @graph so Google can
// traverse Person → WebSite → ItemList of projects → each CreativeWork
// in one parse. The @id fields are anchor URLs that let schema objects
// reference each other without duplication.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Ramon Carrillo",
      url: SITE_URL,
      image: `${SITE_URL}/images/about-picture.JPG`,
      jobTitle: "Full-Stack Developer",
      description: SHORT_DESCRIPTION,
      sameAs: [
        "https://github.com/Ramon-Carrillo",
        "https://www.linkedin.com/in/ramon-carrillo/",
      ],
      knowsAbout: [
        "Next.js",
        "React",
        "TypeScript",
        "Node.js",
        "PostgreSQL",
        "Claude AI",
        "Retrieval-Augmented Generation",
        "Vector databases",
        "Stripe",
        "Web accessibility",
      ],
      hasOccupation: {
        "@type": "Occupation",
        name: "Full-Stack Developer",
        occupationalCategory: "15-1254 Web Developers",
        skills:
          "Next.js, TypeScript, Claude, RAG, Neon Postgres, pgvector, Vercel AI SDK, Stripe, Tailwind CSS, Accessibility (WCAG)",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Ramon Carrillo — Full-Stack Developer",
      description: DESCRIPTION,
      author: { "@id": `${SITE_URL}/#person` },
      inLanguage: "en-US",
    },
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#profile`,
      url: SITE_URL,
      mainEntity: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type": "ItemList",
      "@id": `${SITE_URL}/#projects`,
      name: "Projects by Ramon Carrillo",
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      numberOfItems: projects.length,
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        // `url` points at the portfolio's own detail page so Google
        // crawls us first (and gets richer structured data) before
        // optionally following through to the live demo via the
        // CreativeWork.sameAs field.
        url: `${SITE_URL}/projects/${project.id}`,
        item: {
          "@type": "CreativeWork",
          "@id": `${SITE_URL}/projects/${project.id}`,
          name: project.title,
          description: project.description,
          url: `${SITE_URL}/projects/${project.id}`,
          image: project.image ? `${SITE_URL}${project.image}` : undefined,
          author: { "@id": `${SITE_URL}/#person` },
          keywords: project.tags.join(", "),
          codeRepository: project.repo,
          // Live demo (if any) is a related external resource.
          sameAs: project.href ? [project.href] : undefined,
        },
      })),
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="flex min-h-full flex-col bg-background text-foreground"
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers>
          <SmoothScroll>
            <Navbar />
            <main className="flex-1 pt-14">{children}</main>
            <Footer />
          </SmoothScroll>
        </Providers>

        {/* Vercel Analytics — privacy-friendly, cookie-free page-view
            tracking. Speed Insights collects real-user Core Web Vitals
            (LCP, INP, CLS) so we can see how the site performs for
            actual visitors, not just synthetic Lighthouse runs. Both
            are no-ops in local dev and only report when deployed. */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
