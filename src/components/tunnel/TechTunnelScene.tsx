"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollStore } from "@/lib/scroll-store";
import {
  TECH_TUNNEL_NODES,
  cameraZFromProgress,
  TUNNEL_END_Z,
  type TechTunnelNode,
} from "@/lib/tech-tunnel";
import { TUNNEL_RING_CHARS, TUNNEL_WALL_CHARS } from "@/lib/hacker-glyphs";

const textureCache = new Map<string, THREE.CanvasTexture>();

function getTextTexture(text: string, bright = true, ghost = false): THREE.CanvasTexture {
  const key = `text-${text}-${bright}-${ghost}`;
  const cached = textureCache.get(key);
  if (cached) return cached;

  const canvas = document.createElement("canvas");
  canvas.width = ghost ? 384 : 512;
  canvas.height = ghost ? 64 : 96;
  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (ghost) {
    ctx.fillStyle = "rgba(147, 197, 253, 0.55)";
    ctx.font = '400 15px "JetBrains Mono", monospace';
  } else {
    ctx.fillStyle = bright ? "#bfdbfe" : "#60a5fa";
    ctx.font = '600 26px "JetBrains Mono", monospace';
  }

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);

  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  textureCache.set(key, tex);
  return tex;
}

function getGlyphTexture(char: string, bright = false): THREE.CanvasTexture {
  const key = `${char}-${bright}`;
  const cached = textureCache.get(key);
  if (cached) return cached;

  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d")!;

  ctx.clearRect(0, 0, 64, 64);
  ctx.fillStyle = bright ? "#bfdbfe" : "#60a5fa";
  ctx.font = `bold ${char.length > 2 ? 20 : 34}px "JetBrains Mono", monospace`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(char, 32, 32);

  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  textureCache.set(key, tex);
  return tex;
}

const CYBER_GRID_VERT = `
  varying vec2 vUv;
  varying vec3 vPos;
  void main() {
    vUv = uv;
    vPos = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const CYBER_GRID_FRAG = `
  uniform float uOffset;
  uniform vec3 uColor;
  uniform vec3 uGlow;
  uniform float uScan;
  varying vec2 vUv;
  varying vec3 vPos;
  void main() {
    vec2 cell = floor(vPos.xz * vec2(0.55, 0.18) + vec2(0.0, uOffset));
    float hash = fract(sin(dot(cell, vec2(127.1, 311.7))) * 43758.5453);
    float bit = step(0.55, hash);
    float gx = abs(fract(vPos.x * 0.4) - 0.5);
    float gz = abs(fract(vPos.z * 0.14 + uOffset) - 0.5);
    float line = min(gx, gz);
    float grid = smoothstep(0.035, 0.0, line);
    float scan = smoothstep(0.48, 0.5, fract(vUv.y * 8.0 - uScan)) * 0.12;
    float edge = smoothstep(0.0, 0.12, vUv.y) * (1.0 - smoothstep(0.88, 1.0, vUv.y));
    float alpha = (grid * 0.45 + bit * 0.2 + scan) * edge;
    vec3 col = mix(uColor, uGlow, grid + bit * 0.5 + scan);
    gl_FragColor = vec4(col, alpha * 0.6);
  }
`;

function useCyberGridMaterial(base: string, glow: string) {
  return useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uOffset: { value: 0 },
          uColor: { value: new THREE.Color(base) },
          uGlow: { value: new THREE.Color(glow) },
          uScan: { value: 0 },
        },
        vertexShader: CYBER_GRID_VERT,
        fragmentShader: CYBER_GRID_FRAG,
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
    [base, glow]
  );
}

function TunnelFloor() {
  const mat = useCyberGridMaterial("#060d18", "#2563eb");

  useFrame(({ clock }) => {
    const camZ = cameraZFromProgress(scrollStore.progress);
    mat.uniforms.uOffset.value = -camZ * 0.1;
    mat.uniforms.uScan.value = clock.elapsedTime * 0.4;
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.6, -58]} material={mat}>
      <planeGeometry args={[28, 210, 1, 1]} />
    </mesh>
  );
}

function TunnelWall({ side }: { side: -1 | 1 }) {
  const mat = useCyberGridMaterial("#040a12", "#1d4ed8");

  useFrame(({ clock }) => {
    const camZ = cameraZFromProgress(scrollStore.progress);
    mat.uniforms.uOffset.value = -camZ * 0.08;
    mat.uniforms.uScan.value = clock.elapsedTime * 0.35 + side;
  });

  return (
    <mesh
      rotation={[0, side * Math.PI / 2, 0]}
      position={[side * 6.8, 1.2, -58]}
      material={mat}
    >
      <planeGeometry args={[210, 13, 1, 1]} />
    </mesh>
  );
}

function TunnelCeiling() {
  const mat = useCyberGridMaterial("#030810", "#1e3a8a");

  useFrame(({ clock }) => {
    const camZ = cameraZFromProgress(scrollStore.progress);
    mat.uniforms.uOffset.value = -camZ * 0.09;
    mat.uniforms.uScan.value = clock.elapsedTime * 0.3;
  });

  return (
    <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 7.5, -58]} material={mat}>
      <planeGeometry args={[28, 210, 1, 1]} />
    </mesh>
  );
}

/** حلقه تونل — دایره واقعی در صفحه XY (محور تونل = Z) */
function SymbolRing({
  z,
  radius,
  count = 32,
  bright = false,
  seed = 0,
  spin = 0.04,
  binaryOnly = false,
}: {
  z: number;
  radius: number;
  count?: number;
  bright?: boolean;
  seed?: number;
  spin?: number;
  binaryOnly?: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const items = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2;
      const char = binaryOnly
        ? i % 2 === 0
          ? "0"
          : "1"
        : TUNNEL_RING_CHARS[(i + seed) % TUNNEL_RING_CHARS.length];
      return {
        char,
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        tex: getGlyphTexture(char, bright),
      };
    });
  }, [count, radius, bright, seed, binaryOnly]);

  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.z = clock.elapsedTime * spin;
    }
  });

  const spriteSize = bright ? 0.42 : 0.34;

  return (
    <group ref={group} position={[0, 0.4, z]}>
      {items.map((item, i) => (
        <sprite
          key={`${z}-${seed}-${i}`}
          position={[item.x, item.y, 0]}
          scale={[spriteSize, spriteSize, 1]}
        >
          <spriteMaterial
            map={item.tex}
            transparent
            opacity={bright ? 0.9 : 0.62}
            depthWrite={false}
            toneMapped={false}
          />
        </sprite>
      ))}
    </group>
  );
}

/** امضای محو انتهای تونل — فقط نزدیک ۱۰۰٪ اسکرول دیده می‌شود */
function TunnelVanishCredit() {
  const matRef = useRef<THREE.SpriteMaterial>(null);
  const tex = useMemo(() => getTextTexture("dev by mmovasseghi", false, true), []);

  useFrame(() => {
    const p = scrollStore.progress;
    const fade = Math.max(0, Math.min(1, (p - 0.94) / 0.06));
    const eased = fade * fade;
    if (matRef.current) {
      matRef.current.opacity = eased * 0.12;
    }
  });

  return (
    <group position={[0, 0.25, TUNNEL_END_Z - 10]}>
      <sprite scale={[1.6, 0.36, 1]}>
        <spriteMaterial
          ref={matRef}
          map={tex}
          transparent
          opacity={0}
          depthWrite={false}
          toneMapped={false}
        />
      </sprite>
    </group>
  );
}

function SymbolTunnelRings() {
  const rings = useMemo(() => {
    const items: { z: number; r: number; bright: boolean; seed: number }[] = [];
    for (let z = 2; z > -135; z -= 2.8) {
      const idx = Math.abs(Math.round(z));
      const depth = idx / 135;
      items.push({
        z,
        r: 2.6 + depth * 0.8,
        bright: idx % 12 === 0,
        seed: idx * 3,
      });
    }
    return items;
  }, []);

  return (
    <group>
      {rings.map((ring) => (
        <SymbolRing
          key={ring.z}
          z={ring.z}
          radius={ring.r}
          count={ring.bright ? 44 : 36}
          bright={ring.bright}
          seed={ring.seed}
          spin={ring.bright ? 0.06 : 0.035}
          binaryOnly
        />
      ))}
    </group>
  );
}

function WallBinaryColumns() {
  const columns = useMemo(() => {
    const items: { z: number; side: -1 | 1; y: number; char: string }[] = [];
    for (let z = 0; z > -138; z -= 3) {
      for (let row = 0; row < 8; row++) {
        const char = TUNNEL_WALL_CHARS[(z + row) % 2 === 0 ? 0 : 1];
        items.push({
          z,
          side: row % 2 === 0 ? -1 : 1,
          y: -1.8 + row * 1.1,
          char,
        });
      }
    }
    return items;
  }, []);

  return (
    <group>
      {columns.map((col, i) => (
        <sprite
          key={i}
          position={[col.side * 5.6, col.y, col.z]}
          scale={[0.28, 0.28, 1]}
        >
          <spriteMaterial
            map={getGlyphTexture(col.char)}
            transparent
            opacity={0.3}
            depthWrite={false}
            toneMapped={false}
          />
        </sprite>
      ))}
    </group>
  );
}

function TechPortal({ node }: { node: TechTunnelNode }) {
  const isFinale = node.isFinale === true;

  const color = node.color;
  const outerR = isFinale ? 2.9 : 2.6;
  const seed = Math.abs(node.z) * 2;

  return (
    <group position={[0, 0.4, node.z]}>
      <mesh>
        <sphereGeometry args={[isFinale ? 3.2 : 3, 12, 12]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={isFinale ? 0.03 : 0.035}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      <SymbolRing
        z={0}
        radius={outerR}
        count={isFinale ? 38 : 36}
        bright={false}
        seed={seed}
        spin={isFinale ? 0.04 : 0.05}
        binaryOnly
      />
      <SymbolRing
        z={0}
        radius={outerR * 0.72}
        count={isFinale ? 24 : 22}
        bright={false}
        seed={seed + 11}
        spin={-0.05}
        binaryOnly
      />
    </group>
  );
}

function TunnelDust({ count = 380 }: { count?: number }) {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = 0.8 + Math.random() * 4.8;
      arr[i * 3] = Math.cos(angle) * r;
      arr[i * 3 + 1] = (Math.random() - 0.2) * 7;
      arr[i * 3 + 2] = -Math.random() * 135 - 4;
    }
    return arr;
  }, [count]);

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, [positions]);

  return (
    <points geometry={geo}>
      <pointsMaterial
        size={0.05}
        color="#38bdf8"
        transparent
        opacity={0.55}
        depthWrite={false}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function WireframeDebris() {
  const items = useMemo(() => {
    const glyphs = ["0", "1", "{", "}", "[", "]", "<", ">", "/", "*"];
    const list: { z: number; x: number; y: number; char: string }[] = [];
    for (let z = -8; z > -130; z -= 11) {
      list.push({
        z,
        x: Math.sin(z * 0.3) * 4.2,
        y: 1 + (Math.abs(z) % 5),
        char: glyphs[Math.abs(z) % glyphs.length],
      });
    }
    return list;
  }, []);

  return (
    <group>
      {items.map((item, i) => (
        <sprite
          key={i}
          position={[item.x, item.y, item.z]}
          scale={[0.5, 0.5, 1]}
        >
          <spriteMaterial
            map={getGlyphTexture(item.char)}
            transparent
            opacity={0.35}
            depthWrite={false}
            toneMapped={false}
          />
        </sprite>
      ))}
    </group>
  );
}

export default function TechTunnelScene({ mobile = false }: { mobile?: boolean }) {
  const fogColor = useMemo(() => new THREE.Color("#020617"), []);

  return (
    <group>
      <fog attach="fog" args={[fogColor, 8, 65]} />
      <ambientLight intensity={0.2} color="#1e3a8a" />
      <pointLight position={[0, 3, -15]} intensity={1.8} color="#60a5fa" distance={45} />
      <pointLight position={[0, -1, -50]} intensity={1} color="#38bdf8" distance={35} />

      <TunnelFloor />
      <TunnelCeiling />
      <TunnelWall side={-1} />
      <TunnelWall side={1} />
      <SymbolTunnelRings />
      <TunnelVanishCredit />
      {!mobile && <WallBinaryColumns />}
      <WireframeDebris />
      <TunnelDust count={mobile ? 180 : 320} />

      {TECH_TUNNEL_NODES.map((node) => (
        <TechPortal key={node.id} node={node} />
      ))}
    </group>
  );
}
