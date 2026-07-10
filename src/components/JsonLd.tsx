import { SITE } from "@/lib/constants";

export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE.name,
    jobTitle: SITE.title,
    url: SITE.url,
    sameAs: [SITE.github],
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tehran",
      addressCountry: "IR",
    },
    description: SITE.mission,
    knowsAbout: [
      "Software Architecture",
      "Backend Engineering",
      "Infrastructure",
      "Docker",
      "Telegram Mini Apps",
      "System Design",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
