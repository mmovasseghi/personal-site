import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { SITE } from "@/lib/constants";

export const dynamic = "force-static";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "محمد سینا موثقی نژاد — برنامه‌نویس و توسعه‌دهنده نرم‌افزار در تهران";

export default async function TwitterImage() {
  const vazirBold = await readFile(
    join(process.cwd(), "src/app/fonts/Vazirmatn-Bold.ttf")
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 80,
          background:
            "linear-gradient(135deg, #06070B 0%, #090B12 50%, #0a0f1a 100%)",
        }}
      >
        <div
          style={{
            fontSize: 26,
            color: "#00F5FF",
            fontFamily: "monospace",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
          }}
        >
          mmovasseghi.dev
        </div>
        <div
          style={{
            marginTop: 32,
            fontSize: 76,
            fontWeight: 700,
            color: "#ffffff",
            fontFamily: "Vazirmatn",
            direction: "rtl",
            textAlign: "center",
          }}
        >
          محمد سینا موثقی نژاد
        </div>
        <div
          style={{
            marginTop: 20,
            fontSize: 36,
            color: "rgba(165,180,252,0.85)",
            fontFamily: "Vazirmatn",
            direction: "rtl",
          }}
        >
          برنامه‌نویس و توسعه‌دهنده نرم‌افزار
        </div>
        <div
          style={{
            marginTop: 36,
            fontSize: 26,
            color: "rgba(0,245,255,0.7)",
            fontFamily: "monospace",
          }}
        >
          {`${SITE.titleEn} — Tehran, Iran`}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Vazirmatn",
          data: vazirBold,
          weight: 700,
          style: "normal",
        },
      ],
    }
  );
}
