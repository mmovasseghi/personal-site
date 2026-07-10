"use client";

import { UI } from "@/lib/constants";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body style={{ background: "#06070B", color: "#e8eaed", margin: 0 }}>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "monospace",
            textAlign: "center",
            padding: "2rem",
          }}
        >
          <p style={{ fontSize: "4rem", color: "rgba(0,245,255,0.3)" }}>ERR</p>
          <h1 style={{ fontSize: "1.5rem", marginTop: "1.5rem" }}>
            {UI.criticalError}
          </h1>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: "2rem",
              padding: "0.75rem 2rem",
              background: "rgba(67,56,255,0.2)",
              border: "1px solid rgba(0,245,255,0.3)",
              color: "#00F5FF",
              cursor: "pointer",
              fontFamily: "monospace",
              fontSize: "0.75rem",
              letterSpacing: "0.1em",
            }}
          >
            {UI.restart}
          </button>
        </div>
      </body>
    </html>
  );
}
