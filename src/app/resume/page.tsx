import type { Metadata } from "next";
import ResumeRedirect from "./ResumeRedirect";

export const metadata: Metadata = {
  title: "رزومه محمد سینا موثقی نژاد | سوابق و مهارت‌ها",
  description:
    "رزومه و خلاصه سوابق محمد سینا موثقی نژاد (سینا موثقی نژاد) — برنامه‌نویس و توسعه‌دهنده نرم‌افزار در تهران. مهارت‌ها، تجربه‌ها و راه‌های تماس.",
  alternates: {
    canonical: "/resume/",
  },
};

export default function ResumePage() {
  return <ResumeRedirect />;
}
