import { ImageResponse } from "next/og";
import { SITE } from "@/lib/constants";

export const dynamic = "force-static";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${SITE.name} — ${SITE.title}`;

export default function OgImage() {
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
          background: "linear-gradient(135deg, #06070B 0%, #090B12 50%, #0a0f1a 100%)",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: 600,
            height: 400,
            background: "radial-gradient(circle, rgba(67,56,255,0.25), transparent 70%)",
          }}
        />
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
            lineHeight: 1.1,
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
        <div
          style={{
            marginTop: 40,
            fontSize: 28,
            color: "#4338FF",
          }}
        >
          Building systems, not just software.
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 60,
            right: 80,
            fontSize: 48,
            color: "rgba(0,245,255,0.3)",
            fontFamily: "monospace",
          }}
        >
          MSM
        </div>
      </div>
    ),
    { ...size }
  );
}
