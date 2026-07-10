"use client";

import { motion } from "framer-motion";
import { SITE } from "@/lib/constants";

interface LogoProps {
  size?: number;
  showLabel?: boolean;
  className?: string;
}

export default function Logo({
  size = 44,
  showLabel = false,
  className = "",
}: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <motion.div
          className="absolute inset-0 rounded-xl"
          animate={{
            boxShadow: [
              "0 0 20px rgba(0,245,255,0.25)",
              "0 0 40px rgba(67,56,255,0.35)",
              "0 0 20px rgba(0,245,255,0.25)",
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          className="relative z-10"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4338FF" />
              <stop offset="50%" stopColor="#00F5FF" />
              <stop offset="100%" stopColor="#45FFB2" />
            </linearGradient>
          </defs>
          <rect
            x="4"
            y="4"
            width="56"
            height="56"
            rx="14"
            fill="#090B12"
            stroke="url(#logoGrad)"
            strokeWidth="1.5"
          />
          <polygon
            points="32,14 48,24 48,44 32,54 16,44 16,24"
            stroke="url(#logoGrad)"
            strokeWidth="1.2"
            fill="rgba(67,56,255,0.12)"
          />
          <path
            d="M32 22 L40 36 L24 36 Z"
            stroke="#00F5FF"
            strokeWidth="1.5"
            fill="rgba(0,245,255,0.15)"
          />
          <circle cx="32" cy="32" r="2.5" fill="#45FFB2" />
          <path
            d="M32 10 L32 6 M32 58 L32 54 M10 32 L6 32 M58 32 L54 32"
            stroke="#4338FF"
            strokeWidth="1"
            opacity="0.5"
          />
        </svg>
      </div>

      {showLabel && (
        <div className="min-w-0 leading-tight">
          <span className="font-mono text-sm font-bold tracking-normal text-cyan sm:text-base">
            {SITE.shortName}
          </span>
          <span className="fa-text mt-0.5 block text-[10px] font-medium leading-5 text-white/50 sm:text-[11px]">
            {SITE.nameFa}
          </span>
        </div>
      )}
    </div>
  );
}
