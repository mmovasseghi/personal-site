import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: 6,
          border: "1px solid #4338FF",
        }}
      >
        <div
          style={{
            color: "#00F5FF",
            fontSize: 14,
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
