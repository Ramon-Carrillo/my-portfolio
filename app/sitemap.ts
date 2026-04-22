import type { MetadataRoute } from "next";
import { projects } from "@/lib/data";
import { getAllPosts } from "@/lib/posts";

const SITE_URL = "https://ramoncarrillo.dev";

/**
 * Sitemap for ramoncarrillo.dev.
 *
 * Declares:
 *   - the home page (top priority)
 *   - in-page section anchors (for jump-link SERPs)
 *   - one full URL per project detail page
 *
 * Regenerated on every build so `lastModified` reflects deploy time.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const home: MetadataRoute.Sitemap = [
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

  const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${SITE_URL}/projects/${project.id}`,
    lastModified: now,
    // Projects are richer case-study pages — worth crawling periodically
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const blogPages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/blog`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    ...getAllPosts().map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      // Use post date as lastModified; updatedAt if present, else published
      lastModified: new Date(
        (post.updatedAt ?? post.publishedAt) + "T00:00:00Z",
      ),
      changeFrequency: "yearly" as const,
      priority: 0.9,
    })),
  ];

  return [...home, ...projectPages, ...blogPages];
}
