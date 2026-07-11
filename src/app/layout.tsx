import type { Metadata, Viewport } from "next";
import { Vazirmatn, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import JsonLd from "@/components/JsonLd";
import "./globals.css";
import "./site-layer.css";
import "./cinematic.css";
import "./hero-forge.css";
import "./hero-hacker.css";
import "./tech-stack.css";
import "./resume.css";
import "./boot.css";
import "./footer.css";
import "./nav-mobile.css";
import "./mouse-fx.css";
import "./tunnel.css";
import "lenis/dist/lenis.css";

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-vazir",
  display: "swap",
  adjustFontFallback: true,
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://mmovasseghi.dev";

export const metadata: Metadata = {
  title: {
    default:
      "محمد سینا موثقی نژاد | برنامه‌نویس و توسعه‌دهنده نرم‌افزار — سینا موثقی نژاد",
    template: "%s | محمد سینا موثقی نژاد",
  },
  description:
    "محمد سینا موثقی نژاد (سینا موثقی نژاد) — برنامه‌نویس و توسعه‌دهنده نرم‌افزار در تهران. متخصص بک‌اند، API، اپلیکیشن وب، Telegram Mini App، Docker و راه‌اندازی سرور. وب‌سایت رسمی موثقی نژاد.",
  keywords: [
    "محمد سینا موثقی نژاد",
    "سینا موثقی نژاد",
    "موثقی نژاد",
    "محمدسینا موثقی نژاد",
    "سینا موثقی",
    "Mohammad Sina Movaseghi Nezhad",
    "Sina Movaseghi",
    "mmovasseghi",
    "برنامه‌نویس تهران",
    "توسعه‌دهنده نرم‌افزار",
    "مهندس نرم‌افزار",
    "برنامه‌نویس بک‌اند",
    "Backend Developer Iran",
    "Telegram Mini App",
    "Docker",
    "اتوماسیون",
  ],
  authors: [
    { name: "Mohammad Sina Movaseghi Nezhad", url: SITE_URL },
    { name: "محمد سینا موثقی نژاد", url: SITE_URL },
  ],
  creator: "محمد سینا موثقی نژاد",
  publisher: "محمد سینا موثقی نژاد",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "محمد سینا موثقی نژاد | برنامه‌نویس و توسعه‌دهنده نرم‌افزار",
    description:
      "وب‌سایت رسمی محمد سینا موثقی نژاد (سینا موثقی نژاد) — برنامه‌نویس بک‌اند، وب و Telegram Mini App از تهران.",
    type: "profile",
    locale: "fa_IR",
    alternateLocale: "en_US",
    siteName: "محمد سینا موثقی نژاد",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "محمد سینا موثقی نژاد | برنامه‌نویس",
    description:
      "سینا موثقی نژاد — برنامه‌نویس و توسعه‌دهنده نرم‌افزار از تهران.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-icon", type: "image/png", sizes: "180x180" }],
  },
  category: "technology",
  metadataBase: new URL(SITE_URL),
};

export const viewport: Viewport = {
  themeColor: "#060b14",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${vazirmatn.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-body antialiased">
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
