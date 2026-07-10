import { ImageResponse } from "next/og";
import { SITE } from "@/lib/constants";

export const dynamic = "force-static";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${SITE.name} — ${SITE.title}`;

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background:
            "linear-gradient(135deg, #06070B 0%, #090B12 50%, #0a0f1a 100%)",
        }}
      >
        <div
          style={{
            fontSize: 28,
            color: "#00F5FF",
            fontFamily: "monospace",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
          }}
        >
          Cyber Botanical Laboratory
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 64,
            fontWeight: 700,
            color: "#ffffff",
          }}
        >
          {SITE.name}
        </div>
        <div
          style={{
            marginTop: 16,
            fontSize: 32,
            color: "rgba(255,255,255,0.5)",
          }}
        >
          {SITE.title}
        </div>
        <div style={{ marginTop: 40, fontSize: 28, color: "#4338FF" }}>
          Building systems, not just software.
        </div>
      </div>
    ),
    { ...size }
  );
}
