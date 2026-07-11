export interface TechTunnelNode {
  id: string;
  name: string;
  layer: string;
  layerLabel: string;
  color: string;
  z: number;
  short?: string;
  glyph?: string;
  isFinale?: boolean;
}

export const TUNNEL_START_Z = 10;
export const TUNNEL_END_Z = -128;
export const TUNNEL_LENGTH = TUNNEL_START_Z - TUNNEL_END_Z;

/** مسیر تکنولوژی — از پایه تا افق آینده */
export const TECH_TUNNEL_NODES: TechTunnelNode[] = [
  { id: "linux", name: "Linux", layer: "core", layerLabel: "زیرساخت", color: "#fbbf24", z: -4, short: "OS" },
  { id: "python", name: "Python", layer: "core", layerLabel: "زیرساخت", color: "#3776ab", z: -12 },
  { id: "javascript", name: "JavaScript", layer: "core", layerLabel: "زیرساخت", color: "#f7df1e", z: -20, short: "JS" },
  { id: "typescript", name: "TypeScript", layer: "core", layerLabel: "زیرساخت", color: "#3178c6", z: -28, short: "TS" },

  { id: "fastapi", name: "FastAPI", layer: "backend", layerLabel: "بک‌اند", color: "#009688", z: -36 },
  { id: "aspnet", name: "ASP.NET", layer: "backend", layerLabel: "بک‌اند", color: "#512bd4", z: -44 },
  { id: "postgres", name: "PostgreSQL", layer: "backend", layerLabel: "بک‌اند", color: "#336791", z: -52, short: "PG" },
  { id: "redis", name: "Redis", layer: "backend", layerLabel: "بک‌اند", color: "#dc382d", z: -58 },
  { id: "rest", name: "REST API", layer: "backend", layerLabel: "بک‌اند", color: "#22d3ee", z: -64 },

  { id: "react", name: "React", layer: "frontend", layerLabel: "فرانت‌اند", color: "#61dafb", z: -72 },
  { id: "nextjs", name: "Next.js", layer: "frontend", layerLabel: "فرانت‌اند", color: "#e2e8f0", z: -80 },
  { id: "docker", name: "Docker", layer: "infra", layerLabel: "زیرساخت سرور", color: "#2496ed", z: -88 },
  { id: "nginx", name: "Nginx", layer: "infra", layerLabel: "زیرساخت سرور", color: "#009639", z: -94 },
  { id: "cicd", name: "CI/CD", layer: "infra", layerLabel: "زیرساخت سرور", color: "#a78bfa", z: -100 },

  { id: "telegram", name: "Telegram", layer: "product", layerLabel: "محصول", color: "#2aabee", z: -106 },
  { id: "miniapp", name: "Mini App", layer: "product", layerLabel: "محصول", color: "#38bdf8", z: -112 },
  { id: "automation", name: "Automation", layer: "product", layerLabel: "محصول", color: "#34d399", z: -118 },

  { id: "go", name: "Go", layer: "horizon", layerLabel: "افق", color: "#00add8", z: -122, glyph: "go" },
  { id: "rust", name: "Rust", layer: "horizon", layerLabel: "افق", color: "#f74c00", z: -126, glyph: "fn" },
  {
    id: "credits",
    name: "dev by mmovasseghi",
    layer: "credits",
    layerLabel: "ساخته‌شده",
    color: "#60a5fa",
    z: -128,
    short: "DEV",
    glyph: "</>",
    isFinale: true,
  },
];

export function cameraZFromProgress(progress: number) {
  return TUNNEL_START_Z - progress * TUNNEL_LENGTH;
}

export function getTunnelState(progress: number) {
  const cameraZ = cameraZFromProgress(progress);
  const passed = TECH_TUNNEL_NODES.filter((n) => cameraZ < n.z);
  const upcoming = TECH_TUNNEL_NODES.filter((n) => cameraZ >= n.z);

  let current: TechTunnelNode | null = null;
  let minDist = Infinity;

  for (const node of TECH_TUNNEL_NODES) {
    const dist = Math.abs(cameraZ - node.z);
    if (dist < minDist && dist < 5) {
      minDist = dist;
      current = node;
    }
  }

  const next =
    upcoming.length > 0
      ? upcoming.reduce((nearest, n) => (n.z > nearest.z ? n : nearest))
      : null;

  const layer = current?.layer ?? passed[passed.length - 1]?.layer ?? "core";
  const layerLabel =
    current?.layerLabel ??
    passed[passed.length - 1]?.layerLabel ??
    TECH_TUNNEL_NODES[0].layerLabel;

  const layerIndex = ["core", "backend", "frontend", "infra", "product", "horizon", "credits"].indexOf(layer);
  const layerProgress = Math.max(0, Math.min(1, (layerIndex + 1) / 7));

  return {
    cameraZ,
    current,
    next,
    passed,
    layer,
    layerLabel,
    layerProgress,
    progressPct: Math.round(progress * 100),
  };
}

export function nodeScreenDepth(cameraZ: number, nodeZ: number) {
  const dist = nodeZ - cameraZ;
  return Math.max(0, Math.min(1, 1 - dist / 40));
}
