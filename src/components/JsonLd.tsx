import { SITE, SECTIONS } from "@/lib/constants";

export default function JsonLd() {
  const personId = `${SITE.url}/#person`;
  const websiteId = `${SITE.url}/#website`;
  const profileImage = `${SITE.url}${SITE.profileImage}`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: SITE.nameFa,
        alternateName: SITE.nameVariants,
        givenName: "محمد سینا",
        familyName: "موثقی نژاد",
        jobTitle: [SITE.title, SITE.titleEn],
        url: SITE.url,
        image: {
          "@type": "ImageObject",
          "@id": `${SITE.url}/#profileimage`,
          url: profileImage,
          contentUrl: profileImage,
          caption: `عکس ${SITE.nameFa} — ${SITE.title}`,
          width: 800,
          height: 800,
        },
        sameAs: [SITE.github],
        email: SITE.email,
        telephone: SITE.phoneIntl,
        nationality: {
          "@type": "Country",
          name: "Iran",
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Tehran",
          addressCountry: "IR",
        },
        worksFor: {
          "@type": "Organization",
          name: SITE.nameFa,
          url: SITE.url,
        },
        description: SITE.mission,
        knowsAbout: [
          "Software Architecture",
          "Backend Engineering",
          "Python",
          "FastAPI",
          "ASP.NET",
          "React",
          "Next.js",
          "PostgreSQL",
          "Docker",
          "Nginx",
          "Telegram Mini Apps",
          "Automation",
          "System Design",
        ],
        knowsLanguage: [
          { "@type": "Language", name: "Persian", alternateName: "fa" },
          { "@type": "Language", name: "English", alternateName: "en" },
        ],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: SITE.url,
        name: `${SITE.nameFa} — وب‌سایت رسمی`,
        alternateName: ["mmovasseghi", "سایت موثقی نژاد", "سایت سینا موثقی نژاد"],
        description: `وب‌سایت شخصی و رسمی ${SITE.nameFa} — برنامه‌نویس و توسعه‌دهنده نرم‌افزار در تهران`,
        inLanguage: "fa-IR",
        publisher: { "@id": personId },
        copyrightHolder: { "@id": personId },
      },
      {
        "@type": "ProfilePage",
        "@id": `${SITE.url}/#profilepage`,
        url: SITE.url,
        name: `${SITE.nameFa} | ${SITE.title}`,
        isPartOf: { "@id": websiteId },
        about: { "@id": personId },
        mainEntity: { "@id": personId },
        inLanguage: "fa-IR",
        primaryImageOfPage: { "@id": `${SITE.url}/#profileimage` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE.url}/#breadcrumbs`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "خانه",
            item: SITE.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: `${SECTIONS.skills.eyebrow}`,
            item: `${SITE.url}/#skills`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "رزومه",
            item: `${SITE.url}/#resume`,
          },
          {
            "@type": "ListItem",
            position: 4,
            name: "تماس",
            item: `${SITE.url}/#contact`,
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
