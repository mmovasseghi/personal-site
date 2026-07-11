"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import TechTunnelScene from "@/components/tunnel/TechTunnelScene";
import { scrollStore } from "@/lib/scroll-store";
import { cameraZFromProgress } from "@/lib/tech-tunnel";
import { useIsMobile } from "@/hooks/useIsMobile";

/** دوربین مستقیم به اسکرول وصل — بدون لگ و احساس سقوط */
function TunnelCamera() {
  const invalidate = useThree((s) => s.invalidate);

  useFrame((state) => {
    const camZ = cameraZFromProgress(scrollStore.progress);

    state.camera.position.set(0, 0.12, camZ);
    state.camera.lookAt(0, 0.08, camZ - 32);

    const persp = state.camera as THREE.PerspectiveCamera;
    persp.fov = 62;
    persp.updateProjectionMatrix();
    invalidate();
  });

  return null;
}

export default function TunnelCanvas() {
  const mobile = useIsMobile();
  const camZ = useRef(10);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onVis = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  return (
    <div className={`tunnel-canvas-wrap${mobile ? " tunnel-canvas-wrap--mobile" : ""}`} aria-hidden>
      <Canvas
        camera={{ position: [0, 0.12, camZ.current], fov: 62, near: 0.1, far: 110 }}
        dpr={mobile ? [1, 1] : [1, 1.3]}
        frameloop={visible ? "demand" : "never"}
        gl={{
          antialias: !mobile,
          alpha: false,
          powerPreference: "high-performance",
        }}
      >
        <color attach="background" args={["#020617"]} />
        <TunnelCamera />
        <TechTunnelScene mobile={mobile} />
      </Canvas>
    </div>
  );
}
