"use client";

export default function AmbientGlow() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[2] overflow-hidden" aria-hidden>
      <div
        className="absolute -left-1/4 top-1/4 h-[500px] w-[500px] rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.35), transparent 70%)",
          animation: "float 8s ease-in-out infinite",
        }}
      />
      <div
        className="absolute -right-1/4 bottom-1/4 h-[400px] w-[400px] rounded-full opacity-15"
        style={{
          background:
            "radial-gradient(circle, rgba(129,140,248,0.28), transparent 70%)",
          animation: "float 10s ease-in-out infinite reverse",
        }}
      />
      <div
        className="absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 opacity-10"
        style={{
          background:
            "radial-gradient(ellipse, rgba(67,56,200,0.38), transparent 70%)",
        }}
      />
    </div>
  );
}
