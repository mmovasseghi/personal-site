import { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { sitePath } from "@/lib/site-path";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url.replace(/\/$/, "");
  const profileImage = `${base}${SITE.profileImage}`;

  return [
    {
      url: SITE.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      images: [profileImage],
    },
    {
      url: `${base}${sitePath("/resume/")}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      images: [profileImage],
    },
  ];
}
