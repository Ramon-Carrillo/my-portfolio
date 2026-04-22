import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/posts";

/**
 * Custom OG card for the "Building a grounded RAG assistant" post.
 *
 * Matches the portfolio's root OG aesthetic (dark blue gradient,
 * decorative blobs) but uses the post title as the hero text and
 * surfaces the tech stack in the lower-right. When this post is
 * shared on LinkedIn / X / Slack, the preview shows the article
 * title, not the portfolio's generic landing card.
 */

const post = getPostBySlug("building-a-grounded-rag-assistant");

export const alt = post
  ? `${post.title} — a case study by Ramon Carrillo`
  : "Blog post by Ramon Carrillo";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Hex-equivalent design tokens (satori doesn't parse oklch())
const BG_DEEP = "#0b1020";
const BG_MID = "#1c2245";
const BG_SIDE = "#0a0d1c";
const ACCENT_BLUE = "#7b8cfc";
const ACCENT_BLUE_SOFT = "rgba(108, 123, 230, 0.45)";
const ACCENT_HAZE = "rgba(128, 141, 200, 0.30)";

export default function PostOpenGraphImage() {
  const title = post?.title ?? "Blog post";
  const tags = post?.tags.slice(0, 5) ?? [];

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
        {/* Ambient accents */}
        <div
          style={{
            position: "absolute",
            top: "-140px",
            right: "-140px",
            width: "480px",
            height: "480px",
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
            width: "340px",
            height: "340px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${ACCENT_HAZE} 0%, transparent 70%)`,
            display: "flex",
          }}
        />

        {/* Top row: attribution + post-type badge */}
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
          <span>Ramon Carrillo · ramoncarrillo.dev</span>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              padding: "6px 16px",
              borderRadius: "9999px",
              border: `1px solid ${ACCENT_BLUE}70`,
              background: "rgba(123, 140, 252, 0.15)",
              color: ACCENT_BLUE,
              letterSpacing: "0.15em",
              fontSize: "18px",
            }}
          >
            Case study
          </span>
        </div>

        {/* Middle: title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            maxWidth: "1000px",
          }}
        >
          <div
            style={{
              fontSize: "80px",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: "#fff",
            }}
          >
            {title}
          </div>
        </div>

        {/* Bottom: tag chips */}
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
    { ...size },
  );
}
