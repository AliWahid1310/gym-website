import { MetadataRoute } from "next";

// Crawl instructions for Googlebot, Bingbot, and localized search engines
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: "https://powerfitzone.com/sitemap.xml",
  };
}
