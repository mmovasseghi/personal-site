import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "محمد سینا موثقی نژاد — برنامه‌نویس",
    short_name: "mmovasseghi",
    description: "وب‌سایت شخصی محمد سینا موثقی نژاد",
    start_url: "/",
    display: "standalone",
    background_color: "#06070B",
    theme_color: "#4338FF",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
