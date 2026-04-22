import { ImageResponse } from "next/og";
import { projects } from "@/lib/data";

/**
 * Per-project Open Graph card at `/projects/[slug]/opengraph-image`.
 *
 * When a project URL is shared on LinkedIn, X, Slack, iMessage, etc.,
 * Next.js serves the image from this route — each project gets its own
 * card with its own name, description, and tag chips.
 *
 * Generated at build time for every slug returned by
 * `generateStaticParams`, so there's zero runtime cost.
 *
 * Matches the root /opengraph-image aesthetic (dark blue gradient,
 * decorative blobs) for visual consistency across shared URLs.
 */

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.id }));
}

export function generateImageMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const project = projects.find((p) => p.id === params.slug);
  return [
    {
      contentType: "image/png",
      size,
      id: project?.id ?? "default",
      alt: project
        ? `${project.title} — project by Ramon Carrillo`
        : "Project by Ramon Carrillo",
    },
  ];
}

// Hex-equivalent design tokens (satori doesn't support oklch())
const BG_DEEP = "#0b1020";
const BG_MID = "#1c2245";
const BG_SIDE = "#0a0d1c";
const ACCENT_BLUE = "#7b8cfc";
const ACCENT_BLUE_SOFT = "rgba(108, 123, 230, 0.45)";
const ACCENT_HAZE = "rgba(128, 141, 200, 0.30)";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProjectOpenGraphImage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);

  // Unknown slug: fall back to a generic card rather than 500'ing
  const title = project?.title ?? "Project";
  const description =
    project?.description ?? "A project by Ramon Carrillo.";
  const tags = project?.tags.slice(0, 5) ?? [];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: `linear-gradient(145deg, ${BG_DEEP} 0%, ${BG_MID} 45%, ${BG_SIDE} 100%)`,
          fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif",
          color: "#fff",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative accent blobs */}
        <div
          style={{
            position: "absolute",
            top: "-140px",
            right: "-140px",
            width: "460px",
            height: "460px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${ACCENT_BLUE_SOFT} 0%, transparent 70%)`,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            left: "-100px",
            width: "320px",
            height: "320px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${ACCENT_HAZE} 0%, transparent 70%)`,
            display: "flex",
          }}
        />

        {/* Top: attribution + site URL */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "22px",
            fontWeight: 500,
            color: "rgba(255, 255, 255, 0.65)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          <span>Ramon Carrillo</span>
          <span>ramoncarrillo.dev</span>
        </div>

        {/* Middle: project title + description */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            maxWidth: "1000px",
          }}
        >
          <div
            style={{
              fontSize: "84px",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: "#fff",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: "28px",
              fontWeight: 400,
              color: "rgba(255, 255, 255, 0.72)",
              letterSpacing: "0.005em",
              lineHeight: 1.4,
              // Truncate visually in case a description wraps too long
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {description}
          </div>
        </div>

        {/* Bottom: tag chips (up to 5) */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          {tags.map((tag, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "8px 18px",
                borderRadius: "9999px",
                border: `1px solid ${ACCENT_BLUE}50`,
                background: "rgba(123, 140, 252, 0.12)",
                fontSize: "22px",
                fontWeight: 500,
                color: ACCENT_BLUE,
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
