import type { Metadata, Viewport } from "next";
import { Vazirmatn, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import JsonLd from "@/components/JsonLd";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "محمد سینا موثقی نژاد — برنامه‌نویس",
  description:
    "وب‌سایت شخصی محمد سینا موثقی نژاد — برنامه‌نویس و توسعه‌دهنده نرم‌افزار از تهران.",
  keywords: [
    "مهندس نرم‌افزار",
    "معماری نرم‌افزار",
    "Backend",
    "Telegram Mini App",
    "Docker",
    "اتوماسیون",
  ],
  authors: [{ name: "Mohammad Sina Movaseghi Nezhad" }],
  openGraph: {
    title: "محمد سینا موثقی نژاد — برنامه‌نویس",
    description: "سلام، من سینا هستم — برنامه‌نویس از تهران.",
    type: "website",
    locale: "fa_IR",
    siteName: "محمد سینا موثقی نژاد",
    url: "https://mmovasseghi.dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "محمد سینا موثقی نژاد — برنامه‌نویس",
    description: "سلام، من سینا هستم — برنامه‌نویس از تهران.",
  },
  robots: { index: true, follow: true },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-icon", type: "image/png", sizes: "180x180" }],
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://mmovasseghi.dev"
  ),
};

export const viewport: Viewport = {
  themeColor: "#4338FF",
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
      <body className="font-body antialiased scanlines noise-overlay">
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
