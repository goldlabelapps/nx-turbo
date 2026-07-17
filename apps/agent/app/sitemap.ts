import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: "/", lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: "/Agent", lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: "/chat", lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: "/history", lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: "/settings", lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];
}
