"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollStore, type ScrollPhase } from "@/lib/scroll-store";

const PHASE_OFFSET: Record<ScrollPhase, { x: number; y: number; z: number }> = {
  hero: { x: 2.8, y: 0.2, z: -2 },
  about: { x: -2.5, y: -0.3, z: -3 },
  skills: { x: 0, y: 0.5, z: -4 },
  tech: { x: 0.8, y: 0.35, z: -4.2 },
  work: { x: 2.2, y: -0.4, z: -3.5 },
  experience: { x: 1.8, y: -0.2, z: -3.2 },
  resume: { x: -1.2, y: 0.1, z: -2.8 },
  contact: { x: -2, y: 0, z: -2.5 },
};

const CORE_VERT = `
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;

const CORE_FRAG = `
  uniform float uTime;
  uniform float uPulse;
  uniform float uHue;
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    float fresnel = pow(1.0 - abs(dot(vNormal, vView)), 2.5);
    float pulse = 0.88 + sin(uTime * 1.8) * 0.08 * uPulse;
    vec3 inner = vec3(0.1 + uHue * 0.1, 0.35, 0.65 + uHue * 0.15);
    vec3 outer = vec3(0.4, 0.7, 1.0);
    vec3 col = mix(inner, outer, fresnel) * pulse;
    gl_FragColor = vec4(col, fresnel * 0.8 + 0.08);
  }
`;

function BlueRing({
  radius,
  tilt,
  color,
  speed,
  opacity = 0.7,
}: {
  radius: number;
  tilt: [number, number, number];
  color: string;
  speed: number;
  opacity?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const curve = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 72; i++) {
      const a = (i / 72) * Math.PI * 2;
      pts.push(
        new THREE.Vector3(
          Math.cos(a) * radius,
          Math.sin(a) * radius * 0.22,
          Math.sin(a) * radius * 0.08
        )
      );
    }
    return new THREE.CatmullRomCurve3(pts, true);
  }, [radius]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z = state.clock.elapsedTime * speed;
  });

  return (
    <group rotation={tilt}>
      <mesh ref={ref}>
        <tubeGeometry args={[curve, 72, 0.009, 5, true]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={opacity}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

export default function BlueScene() {
  const target = useRef(new THREE.Vector3());
  const current = useRef(new THREE.Vector3());

  const coreMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uPulse: { value: 1 },
          uHue: { value: 0 },
        },
        vertexShader: CORE_VERT,
        fragmentShader: CORE_FRAG,
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
      }),
    []
  );

  const shellGeo = useMemo(() => new THREE.IcosahedronGeometry(1.2, 1), []);
  const shellEdges = useMemo(
    () => new THREE.EdgesGeometry(shellGeo, 15),
    [shellGeo]
  );

  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const { progress, phase } = scrollStore;
    const t = state.clock.elapsedTime;
    const offset = PHASE_OFFSET[phase];

    target.current.set(offset.x, offset.y, offset.z);
    current.current.lerp(target.current, delta * 2.2);

    coreMat.uniforms.uTime.value = t;
    coreMat.uniforms.uPulse.value = 0.35 + progress * 0.65;
    coreMat.uniforms.uHue.value =
      phase === "skills" ? 0.3 : phase === "work" ? 0.15 : 0;

    if (group.current) {
      group.current.position.copy(current.current);
      group.current.rotation.y = t * 0.05 + progress * Math.PI * 0.5;
      group.current.rotation.x = Math.sin(t * 0.2) * 0.08;
    }
  });

  const ringOpacity = 0.35 + scrollStore.progress * 0.25;

  return (
    <group ref={group}>
      <mesh material={coreMat}>
        <icosahedronGeometry args={[0.48, 3]} />
      </mesh>
      <lineSegments geometry={shellEdges}>
        <lineBasicMaterial
          color="#60a5fa"
          transparent
          opacity={0.4}
          depthWrite={false}
          toneMapped={false}
        />
      </lineSegments>
      <BlueRing
        radius={1.45}
        tilt={[0.5, 0, 0.15]}
        color="#3b82f6"
        speed={0.1}
        opacity={ringOpacity}
      />
      <BlueRing
        radius={1.85}
        tilt={[1.0, 0.25, 0]}
        color="#38bdf8"
        speed={-0.07}
        opacity={ringOpacity * 0.7}
      />
    </group>
  );
}
