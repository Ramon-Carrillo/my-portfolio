import type { MetadataRoute } from "next";

const SITE_URL = "https://ramoncarrillo.dev";

/**
 * Sitemap for ramoncarrillo.dev.
 *
 * This is a single-page portfolio, so we enumerate the major in-page
 * anchors. Search engines don't index fragment URLs the same as unique
 * pages, but declaring them signals site structure and helps with rich
 * results for "jump links" in the SERP.
 *
 * `lastModified` uses `new Date()` so every deploy produces a fresh
 * timestamp — acceptable for a portfolio that updates organically.
 * Swap to commit-time if/when precise freshness matters.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/#projects`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/#about`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/#contact`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];
}
