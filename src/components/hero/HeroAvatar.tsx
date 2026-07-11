"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cinematicEase } from "@/lib/motion";

export default function HeroAvatar({ active }: { active: boolean }) {
  const r = 108;
  const c = 2 * Math.PI * r;

  return (
    <div className="hero-avatar">
      <div className="hero-avatar__hud hero-avatar__hud--tl ltr-block">SYS_OK</div>
      <div className="hero-avatar__hud hero-avatar__hud--tr ltr-block">0x7F3A</div>
      <div className="hero-avatar__hud hero-avatar__hud--bl ltr-block">NODE_LIVE</div>
      <div className="hero-avatar__hud hero-avatar__hud--br ltr-block">SIG++</div>

      <div className="hero-avatar__rings">
        <motion.div
          className="hero-avatar__ring hero-avatar__ring--dash"
          animate={active ? { rotate: -360 } : {}}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="hero-avatar__ring hero-avatar__ring--mid"
          animate={active ? { rotate: 360 } : {}}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="hero-avatar__ring hero-avatar__ring--pulse"
          animate={
            active
              ? { scale: [1, 1.05, 1], opacity: [0.35, 0.7, 0.35] }
              : { scale: 1, opacity: 0.2 }
          }
          transition={{ duration: 2.4, repeat: Infinity }}
        />

        <svg className="hero-avatar__progress" viewBox="0 0 240 240" aria-hidden>
          <circle cx="120" cy="120" r={r} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="2.5" />
          <motion.circle
            cx="120"
            cy="120"
            r={r}
            fill="none"
            stroke="url(#heroAvatarGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={c}
            initial={{ strokeDashoffset: c }}
            animate={active ? { strokeDashoffset: c * 0.12 } : { strokeDashoffset: c }}
            transition={{ duration: 1.4, ease: cinematicEase }}
            style={{ transformOrigin: "center", rotate: -90 }}
          />
          <defs>
            <linearGradient id="heroAvatarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4338FF" />
              <stop offset="50%" stopColor="#00F5FF" />
              <stop offset="100%" stopColor="#45FFB2" />
            </linearGradient>
          </defs>
        </svg>

        <motion.div
          className="hero-avatar__sweep"
          animate={active ? { rotate: 360 } : {}}
          transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <motion.div
        className="hero-avatar__frame"
        initial={{ scale: 0.85, opacity: 0 }}
        animate={active ? { scale: 1, opacity: 1 } : { scale: 0.85, opacity: 0.4 }}
        transition={{ duration: 0.85, ease: cinematicEase }}
      >
        <div className="hero-avatar__img-wrap">
          <Image
            src="/images/mohammad-sina-movaseghi-nezhad.png"
            alt="عکس محمد سینا موثقی نژاد — برنامه‌نویس و توسعه‌دهنده نرم‌افزار در تهران"
            width={200}
            height={200}
            className="hero-avatar__img"
            priority
          />
          <div className="hero-avatar__img-tint" aria-hidden />
          <div className="hero-avatar__scanline" aria-hidden />
        </div>
      </motion.div>

      <p className="hero-avatar__caption ltr-block">
        <span className="hero-avatar__caption-prompt">sina@node</span>
        <span className="hero-avatar__caption-sep">:</span>
        <span className="hero-avatar__caption-cmd">whoami</span>
        <span className="hero-avatar__caption-out">→ ONLINE</span>
      </p>
    </div>
  );
}
