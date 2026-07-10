"use client";

import { type ComponentType } from "react";
import { motion } from "framer-motion";

/* ── نمادهای هخامنشی و ساسانی ── */

function Faravahar({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 140" className={className} fill="none" aria-hidden>
      <path className="heritage-fill" d="M60 8 C45 8 35 18 35 32 C35 42 42 50 52 54 L52 68 L48 72 L60 82 L72 72 L68 68 L68 54 C78 50 85 42 85 32 C85 18 75 8 60 8Z" />
      <path className="heritage-stroke" d="M60 8 C45 8 35 18 35 32 C35 42 42 50 52 54 L52 68 L48 72 L60 82 L72 72 L68 68 L68 54 C78 50 85 42 85 32 C85 18 75 8 60 8Z" />
      <path className="heritage-stroke" d="M60 82 L60 118 M42 118 L78 118" />
      <path className="heritage-stroke" d="M20 55 C35 48 45 52 52 58 M100 55 C85 48 75 52 68 58" />
      <circle className="heritage-stroke" cx="60" cy="32" r="6" />
      <path className="heritage-stroke" d="M54 32 L66 32" />
    </svg>
  );
}

function Palmette({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 120" className={className} fill="none" aria-hidden>
      <path className="heritage-fill" d="M50 70 C30 65 15 50 20 30 C25 15 40 20 50 45 C60 20 75 15 80 30 C85 50 70 65 50 70Z" />
      <path className="heritage-stroke" d="M50 110 L50 70 M50 70 C30 65 15 50 20 30 C25 15 40 20 50 45 C60 20 75 15 80 30 C85 50 70 65 50 70" />
      <path className="heritage-stroke" d="M50 55 C38 48 32 38 35 28 C38 18 45 22 50 35 M50 55 C62 48 68 38 65 28 C62 18 55 22 50 35" />
      <path className="heritage-stroke" d="M35 95 L65 95" />
    </svg>
  );
}

function SassanianRoundel({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden>
      <circle className="heritage-fill" cx="50" cy="50" r="42" />
      <circle className="heritage-stroke" cx="50" cy="50" r="42" />
      <circle className="heritage-stroke" cx="50" cy="50" r="28" />
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i * Math.PI) / 4;
        return (
          <line
            key={i}
            className="heritage-stroke"
            x1={50 + Math.cos(a) * 20}
            y1={50 + Math.sin(a) * 20}
            x2={50 + Math.cos(a) * 38}
            y2={50 + Math.sin(a) * 38}
          />
        );
      })}
      <circle className="heritage-stroke" cx="50" cy="50" r="8" />
    </svg>
  );
}

function PersepolisBull({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 100" className={className} fill="none" aria-hidden>
      <path className="heritage-fill" d="M30 75 C25 60 28 45 40 35 C52 25 70 25 85 32 C95 38 100 50 98 65 C96 78 88 85 75 88 L55 75 Z" />
      <path className="heritage-stroke" d="M30 75 C25 60 28 45 40 35 C52 25 70 25 85 32 C95 38 100 50 98 65 C96 78 88 85 75 88 L65 88 L55 75 Z" />
      <path className="heritage-stroke" d="M40 35 C35 25 38 15 48 12 C55 10 58 18 52 28 M85 32 C90 22 88 12 78 10 C70 8 68 16 72 26" />
      <path className="heritage-stroke" d="M55 75 L55 55 L75 55 L75 75" />
      <circle className="heritage-stroke" cx="48" cy="48" r="3" />
      <circle className="heritage-stroke" cx="78" cy="48" r="3" />
      <path className="heritage-stroke" d="M20 80 L120 80" />
    </svg>
  );
}

function GirihStar({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden>
      <polygon className="heritage-fill" points="50,5 61,38 95,38 68,59 79,91 50,72 21,91 32,59 5,38 39,38" />
      <polygon className="heritage-stroke" points="50,5 61,38 95,38 68,59 79,91 50,72 21,91 32,59 5,38 39,38" />
      <polygon className="heritage-stroke" points="50,22 58,45 82,45 63,58 71,81 50,68 29,81 37,58 18,45 42,45" />
      <circle className="heritage-stroke" cx="50" cy="50" r="6" />
    </svg>
  );
}

function WingedDisk({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 80" className={className} fill="none" aria-hidden>
      <ellipse className="heritage-fill" cx="80" cy="40" rx="18" ry="22" />
      <ellipse className="heritage-stroke" cx="80" cy="40" rx="18" ry="22" />
      <path className="heritage-stroke" d="M62 40 C40 30 15 25 8 40 C15 55 40 50 62 40 M98 40 C120 30 145 25 152 40 C145 55 120 50 98 40" />
      <path className="heritage-stroke" d="M80 18 L80 8 M80 62 L80 72 M70 72 L90 72" />
    </svg>
  );
}

function Lamassu({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 140" className={className} fill="none" aria-hidden>
      <path className="heritage-fill" d="M35 95 C30 80 32 60 45 48 C55 38 70 38 80 45 C90 52 95 65 92 80 C90 92 82 100 70 102 L50 102 Z" />
      <path className="heritage-stroke" d="M35 95 C30 80 32 60 45 48 C55 38 70 38 80 45 C90 52 95 65 92 80 C90 92 82 100 70 102 L50 102 Z" />
      <path className="heritage-stroke" d="M45 48 C42 35 48 22 58 18 C65 15 68 25 64 38" />
      <path className="heritage-stroke" d="M10 70 C25 55 35 58 42 65 M110 70 C95 55 85 58 78 65" />
      <path className="heritage-stroke" d="M55 102 L55 115 L75 115 L75 102" />
      <path className="heritage-stroke" d="M50 60 L70 60" />
      <circle className="heritage-stroke" cx="52" cy="52" r="2.5" />
    </svg>
  );
}

function ColumnCapital({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 130" className={className} fill="none" aria-hidden>
      <path className="heritage-fill" d="M20 30 C20 15 35 8 50 8 C65 8 80 15 80 30 L80 45 L20 45 Z" />
      <path className="heritage-stroke" d="M20 30 C20 15 35 8 50 8 C65 8 80 15 80 30 L80 45 L20 45 Z" />
      <path className="heritage-stroke" d="M25 45 L25 55 C30 50 40 48 50 48 C60 48 70 50 75 55 L75 45" />
      <path className="heritage-stroke" d="M42 48 L42 38 M58 48 L58 38" />
      <path className="heritage-stroke" d="M35 55 L35 120 M65 55 L65 120" />
      <path className="heritage-stroke" d="M30 120 L70 120" />
      <line className="heritage-stroke" x1="50" y1="55" x2="50" y2="120" />
    </svg>
  );
}

function CuneiformBand({ className = "" }: { className?: string }) {
  const wedges = [12, 28, 44, 60, 76, 92, 108, 124, 140, 156, 172, 188];
  return (
    <svg viewBox="0 0 200 40" className={className} fill="none" aria-hidden>
      <line className="heritage-stroke" x1="4" y1="35" x2="196" y2="35" />
      {wedges.map((x, i) => (
        <path
          key={i}
          className="heritage-stroke"
          d={`M${x} 35 L${x + (i % 2 === 0 ? 8 : 6)} ${i % 3 === 0 ? 12 : 18} L${x + 14} 35`}
        />
      ))}
    </svg>
  );
}

function SassanianCrown({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 80" className={className} fill="none" aria-hidden>
      <path className="heritage-fill" d="M10 55 L20 25 L35 40 L50 15 L65 40 L80 25 L90 55 Z" />
      <path className="heritage-stroke" d="M10 55 L20 25 L35 40 L50 15 L65 40 L80 25 L90 55 Z" />
      <circle className="heritage-stroke" cx="50" cy="15" r="5" />
      <path className="heritage-stroke" d="M10 55 L90 55 M25 55 L25 65 M50 55 L50 68 M75 55 L75 65" />
    </svg>
  );
}

type SymbolDef = {
  Symbol: ComponentType<{ className?: string }>;
  top: string;
  left?: string;
  right?: string;
  width: string;
  opacity: number;
  delay: number;
};

/* پخش عمودی در کل صفحه — چپ و راست متناوب */
const SYMBOLS: SymbolDef[] = [
  { Symbol: Faravahar, top: "4%", left: "3%", width: "w-36 sm:w-48 md:w-56", opacity: 0.38, delay: 0 },
  { Symbol: SassanianRoundel, top: "3%", right: "4%", width: "w-32 sm:w-40 md:w-48", opacity: 0.35, delay: 0.3 },
  { Symbol: Lamassu, top: "12%", right: "2%", width: "w-36 sm:w-44 md:w-52", opacity: 0.34, delay: 0.5 },
  { Symbol: Palmette, top: "14%", left: "5%", width: "w-28 sm:w-36", opacity: 0.32, delay: 0.2 },
  { Symbol: GirihStar, top: "22%", left: "2%", width: "w-24 sm:w-32", opacity: 0.3, delay: 0.7 },
  { Symbol: WingedDisk, top: "20%", right: "6%", width: "w-36 sm:w-44", opacity: 0.33, delay: 0.4 },
  { Symbol: ColumnCapital, top: "30%", right: "3%", width: "w-28 sm:w-36 md:w-40", opacity: 0.32, delay: 0.6 },
  { Symbol: PersepolisBull, top: "32%", left: "1%", width: "w-40 sm:w-52 md:w-60", opacity: 0.36, delay: 0.1 },
  { Symbol: SassanianCrown, top: "40%", left: "6%", width: "w-32 sm:w-40", opacity: 0.31, delay: 0.8 },
  { Symbol: Faravahar, top: "42%", right: "5%", width: "w-32 sm:w-44", opacity: 0.3, delay: 0.9 },
  { Symbol: CuneiformBand, top: "48%", left: "4%", width: "w-48 sm:w-64", opacity: 0.28, delay: 1 },
  { Symbol: GirihStar, top: "50%", right: "8%", width: "w-28 sm:w-36", opacity: 0.32, delay: 0.5 },
  { Symbol: Palmette, top: "58%", right: "2%", width: "w-32 sm:w-40", opacity: 0.33, delay: 0.3 },
  { Symbol: Lamassu, top: "60%", left: "3%", width: "w-36 sm:w-48", opacity: 0.34, delay: 0.6 },
  { Symbol: SassanianRoundel, top: "68%", left: "7%", width: "w-28 sm:w-36", opacity: 0.31, delay: 0.4 },
  { Symbol: WingedDisk, top: "66%", right: "4%", width: "w-40 sm:w-52", opacity: 0.33, delay: 0.7 },
  { Symbol: ColumnCapital, top: "76%", right: "6%", width: "w-32 sm:w-40", opacity: 0.3, delay: 0.2 },
  { Symbol: PersepolisBull, top: "78%", left: "2%", width: "w-44 sm:w-56", opacity: 0.35, delay: 0.5 },
  { Symbol: SassanianCrown, top: "86%", right: "3%", width: "w-36 sm:w-44", opacity: 0.32, delay: 0.8 },
  { Symbol: Faravahar, top: "88%", left: "5%", width: "w-40 sm:w-52", opacity: 0.34, delay: 1.1 },
  { Symbol: CuneiformBand, top: "94%", right: "5%", width: "w-52 sm:w-72", opacity: 0.27, delay: 0.9 },
  { Symbol: GirihStar, top: "96%", left: "10%", width: "w-24 sm:w-32", opacity: 0.3, delay: 1.2 },
];

function HeritageItem({ Symbol, top, left, right, width, opacity, delay }: SymbolDef) {
  const pos = left ? { left } : { right };
  return (
    <motion.div
      className={`heritage-glow absolute ${width}`}
      style={{ top, ...pos, opacity }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{
        opacity,
        scale: 1,
        y: [0, -10, 0],
      }}
      transition={{
        opacity: { duration: 1.5, delay: delay + 0.5 },
        scale: { duration: 1.5, delay: delay + 0.5 },
        y: { duration: 7 + delay, repeat: Infinity, ease: "easeInOut" },
      }}
    >
      <Symbol className="h-auto w-full" />
    </motion.div>
  );
}

export default function PersianHeritage() {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 z-[3] min-h-full w-full overflow-hidden"
      aria-hidden
    >
      {/* الگوی گیریه تکرارشونده در کل پس‌زمینه */}
      <div className="heritage-pattern absolute inset-0" />

      {/* واترمارک مرکزی بزرگ */}
      <div className="absolute left-1/2 top-[18%] w-[min(480px,90vw)] -translate-x-1/2 opacity-[0.22]">
        <Faravahar className="h-auto w-full" />
      </div>
      <div className="absolute left-1/2 top-[55%] w-[min(360px,70vw)] -translate-x-1/2 opacity-[0.18]">
        <SassanianRoundel className="h-auto w-full" />
      </div>
      <div className="absolute left-1/2 top-[82%] w-[min(400px,80vw)] -translate-x-1/2 opacity-[0.16]">
        <WingedDisk className="h-auto w-full" />
      </div>

      {/* نمادهای کناری در طول صفحه */}
      {SYMBOLS.map((item, i) => (
        <HeritageItem key={i} {...item} />
      ))}
    </div>
  );
}

export {
  Faravahar,
  Palmette,
  SassanianRoundel,
  PersepolisBull,
  GirihStar,
  WingedDisk,
  Lamassu,
  ColumnCapital,
  CuneiformBand,
  SassanianCrown,
};
