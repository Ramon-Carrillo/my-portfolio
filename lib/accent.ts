/**
 * Accent-color palette for project cards and detail pages.
 *
 * Lives in `lib/` (not inside a Client Component file) so both server
 * and client rendering paths can import from it without Next.js
 * complaining about crossing the server/client boundary.
 */

const ACCENT_BASES = [
  "0.52 0.190 264", // royal blue  — matches design system --royal / --primary
  "0.65 0.115 292", // soft purple — secondary accent
  "0.58 0.092 196", // teal / cyan — highlight color
  "0.58 0.095 262", // cornflower blue
  "0.37 0.200 297", // deep indigo
  "0.70 0.080  70", // warm gold   — warm contrast break
] as const;

/** Deterministic, stable mapping: project id → accent index. */
export function accentIndex(id: string): number {
  let h = 0;
  for (const c of id) h = ((h * 31) + c.charCodeAt(0)) >>> 0;
  return h % ACCENT_BASES.length;
}

/** OKLCH base string (without alpha) for a given project id. */
export function getAccentBase(id: string): string {
  return ACCENT_BASES[accentIndex(id)];
}
