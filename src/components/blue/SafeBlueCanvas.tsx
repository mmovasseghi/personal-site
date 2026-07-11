"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";
import dynamic from "next/dynamic";

const BlueCanvas = dynamic(() => import("@/components/blue/BlueCanvas"), {
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
    console.warn("[WebGL] background disabled:", error.message, info.componentStack);
  }

  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}

export default function SafeBlueCanvas() {
  return (
    <WebGLErrorBoundary>
      <BlueCanvas />
    </WebGLErrorBoundary>
  );
}
