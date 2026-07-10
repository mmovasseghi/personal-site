import { UI } from "@/lib/constants";

export default function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[10001] focus:rounded-lg focus:bg-indigo focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-white"
    >
      {UI.skipLink}
    </a>
  );
}
