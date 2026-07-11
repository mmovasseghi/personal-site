"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";
import dynamic from "next/dynamic";

const TunnelCanvas = dynamic(() => import("@/components/tunnel/TunnelCanvas"), {
  ssr: false,
});

class WebGLErrorBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.warn("[Tunnel] WebGL disabled:", error.message, info.componentStack);
  }

  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}

export default function SafeTunnelCanvas() {
  return (
    <WebGLErrorBoundary>
      <TunnelCanvas />
    </WebGLErrorBoundary>
  );
}
