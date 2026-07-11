"use client";

import { SITE, NAV_ITEMS, UI, ALL_SKILLS } from "@/lib/constants";

export default function Footer() {
  const year = new Date().getFullYear();
  const previewSkills = ALL_SKILLS.slice(0, 12);

  return (
    <footer className="site-footer">
      <div className="site-footer__line" aria-hidden />

      <div className="section-inner site-footer__inner">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <p className="site-footer__name fa-text">{SITE.nameFa}</p>
            <p className="site-footer__role ltr-block">
              {SITE.titleEn} — {SITE.location}
            </p>
            <p className="site-footer__mission fa-text">{SITE.mission}</p>
          </div>

          <nav className="site-footer__nav" aria-label="ناوبری پایین صفحه">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="site-footer__nav-link fa-text"
                data-cursor-hover
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="site-footer__contact">
            <a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="site-footer__link ltr-block"
              data-cursor-hover
            >
              github.com/mmovasseghi
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="site-footer__link ltr-block"
              data-cursor-hover
            >
              {SITE.email}
            </a>
            <a
              href={`tel:${SITE.phoneIntl}`}
              className="site-footer__link ltr-block"
              data-cursor-hover
            >
              {SITE.phone}
            </a>
          </div>
        </div>

        <div className="site-footer__skills">
          <p className="site-footer__skills-label ltr-block">Tech stack</p>
          <div className="site-footer__skills-tags">
            {previewSkills.map((s) => (
              <span key={s} className="site-footer__skill ltr-block">
                {s}
              </span>
            ))}
            <span className="site-footer__skill site-footer__skill--more ltr-block">
              +{ALL_SKILLS.length - previewSkills.length} more
            </span>
          </div>
        </div>

        <div className="site-footer__bar">
          <p className="site-footer__copy fa-text">
            © {year} {SITE.nameFa}
          </p>
          <a href="#hero" className="site-footer__back fa-text" data-cursor-hover>
            {UI.backToTop} ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
