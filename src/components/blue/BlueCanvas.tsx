"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import BlueScene from "@/components/blue/BlueScene";
import { scrollStore } from "@/lib/scroll-store";

function ScrollCamera() {
  const targetZ = useRef(9);

  useFrame((state, delta) => {
    const { progress } = scrollStore;
    const goal = 9 - progress * 5;
    targetZ.current += (goal - targetZ.current) * delta * 2;
    state.camera.position.z = targetZ.current;
    state.camera.position.y = progress * 0.8;
    state.camera.lookAt(0, 0, -2);
  });

  return null;
}

function BlueWorld() {
  return (
    <>
      <color attach="background" args={["#060b14"]} />
      <fog attach="fog" args={["#060b14", 8, 28]} />
      <ambientLight intensity={0.3} color="#1e3a8a" />
      <pointLight position={[3, 1, 2]} intensity={1.4} color="#60a5fa" distance={18} />
      <ScrollCamera />
      <BlueScene />
    </>
  );
}

export default function BlueCanvas() {
  return (
    <div className="blue-canvas-wrap" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 9], fov: 42 }}
        dpr={[1, 1.25]}
        frameloop="always"
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
        }}
      >
        <BlueWorld />
      </Canvas>
    </div>
  );
}
