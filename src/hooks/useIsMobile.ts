"use client";

import { useEffect, useState } from "react";

export function useIsMobile(breakpoint = 768): boolean {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const coarse = window.matchMedia("(pointer: coarse)");

    const update = () => setMobile(mq.matches || coarse.matches);
    update();

    mq.addEventListener("change", update);
    coarse.addEventListener("change", update);
    return () => {
      mq.removeEventListener("change", update);
      coarse.removeEventListener("change", update);
    };
  }, [breakpoint]);

  return mobile;
}
