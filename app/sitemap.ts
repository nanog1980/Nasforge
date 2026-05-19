import type { MetadataRoute } from "next";
import { getRootSlugs, getSectionSlugs } from "@/lib/content";

const BASE = "https://nasforge.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [
    {
      url: `${BASE}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE}/contact`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  for (const slug of getRootSlugs()) {
    if (slug === "accueil") continue;
    entries.push({
      url: `${BASE}/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: slug === "partie-materielle" || slug === "partie-logicielle" ? 0.9 : 0.7,
    });
  }

  for (const section of ["partie-materielle", "partie-logicielle"]) {
    for (const slug of getSectionSlugs(section)) {
      entries.push({
        url: `${BASE}/${section}/${slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  }

  return entries;
}
