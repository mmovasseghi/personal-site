import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#06070B",
          borderRadius: 32,
          border: "2px solid #4338FF",
        }}
      >
        <div
          style={{
            color: "#00F5FF",
            fontSize: 72,
            fontFamily: "monospace",
            fontWeight: 700,
          }}
        >
          M
        </div>
      </div>
    ),
    { ...size }
  );
}
