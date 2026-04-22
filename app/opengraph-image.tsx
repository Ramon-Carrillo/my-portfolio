import { ImageResponse } from "next/og";

/**
 * Dynamic Open Graph / Twitter card image for the portfolio.
 *
 * Colocating this file as `opengraph-image.tsx` at the app root tells
 * Next.js to serve it at /opengraph-image and auto-wire it into the
 * page's <meta property="og:image"> and <meta name="twitter:image"> —
 * no manual `images: [...]` entries needed in layout.tsx.
 *
 * Size is fixed at the spec-recommended 1200x630 so LinkedIn, Facebook,
 * X, Slack, iMessage, and Discord all render a large preview.
 *
 * Implementation note: ImageResponse is powered by satori, which renders
 * a subset of CSS and does NOT support modern color spaces like
 * `oklch()` or `color-mix()`. We use hex/rgba throughout, hand-matched
 * to the site's OKLCH design tokens in globals.css.
 */

export const alt =
  "Ramon Carrillo — Full-Stack Developer building with Next.js and Claude";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Hand-matched hex equivalents of our OKLCH design tokens
const BG_DEEP = "#0b1020";       // matches oklch(0.09 0.030 264)
const BG_MID = "#1c2245";        // matches oklch(0.17 0.065 258)
const BG_SIDE = "#0a0d1c";       // matches oklch(0.09 0.022 270)
const ACCENT_BLUE = "#7b8cfc";   // matches oklch(0.72 0.19 262)
const ACCENT_BLUE_SOFT = "rgba(108, 123, 230, 0.45)";
const ACCENT_HAZE = "rgba(128, 141, 200, 0.30)";
const DOT_GREEN = "#34d399";     // availability indicator

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: `linear-gradient(145deg, ${BG_DEEP} 0%, ${BG_MID} 45%, ${BG_SIDE} 100%)`,
          fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif",
          color: "#fff",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative accent blobs — match the project card aesthetic */}
        <div
          style={{
            position: "absolute",
            top: "-120px",
            right: "-120px",
            width: "420px",
            height: "420px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${ACCENT_BLUE_SOFT} 0%, transparent 70%)`,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            left: "-80px",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${ACCENT_HAZE} 0%, transparent 70%)`,
            display: "flex",
          }}
        />

        {/* Top: domain pill with live-dot indicator */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "10px 20px",
            borderRadius: "9999px",
            border: "1px solid rgba(255, 255, 255, 0.18)",
            background: "rgba(255, 255, 255, 0.06)",
            fontSize: "22px",
            fontWeight: 500,
            color: "rgba(255, 255, 255, 0.85)",
            alignSelf: "flex-start",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        >
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: DOT_GREEN,
              display: "flex",
            }}
          />
          ramoncarrillo.dev
        </div>

        {/* Middle: name + role */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div
            style={{
              fontSize: "132px",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1,
              color: "#fff",
            }}
          >
            Ramon Carrillo
          </div>
          <div
            style={{
              fontSize: "40px",
              fontWeight: 400,
              color: "rgba(255, 255, 255, 0.65)",
              letterSpacing: "0.01em",
            }}
          >
            Full-Stack Developer
          </div>
        </div>

        {/* Bottom: tech tagline */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: "28px",
            fontWeight: 500,
            color: "rgba(255, 255, 255, 0.8)",
          }}
        >
          <span style={{ color: ACCENT_BLUE }}>Next.js</span>
          <span style={{ color: "rgba(255, 255, 255, 0.25)" }}>·</span>
          <span>TypeScript</span>
          <span style={{ color: "rgba(255, 255, 255, 0.25)" }}>·</span>
          <span style={{ color: ACCENT_BLUE }}>Claude</span>
          <span style={{ color: "rgba(255, 255, 255, 0.25)" }}>·</span>
          <span>RAG</span>
          <span style={{ color: "rgba(255, 255, 255, 0.25)" }}>·</span>
          <span>Stripe</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
