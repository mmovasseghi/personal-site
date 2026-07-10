# mmovasseghi — وب‌سایت شخصی محمد سینا موثقی نژاد

وب‌سایت معرفی شخصی با طراحی سینمایی، فارسی RTL، و نمادهای هنری ایرانی (هخامنشی و ساسانی).

**زنده:** [mmovasseghi.duckdns.org](https://mmovasseghi.duckdns.org) · **گیت‌هاب:** [github.com/mmovasseghi](https://github.com/mmovasseghi)

---

## ویژگی‌ها

- بوت‌لودر سینمایی با امکان رد کردن
- Hero با انیمیشن دروازه‌ای و تایپوگرافی بزرگ
- پس‌زمینه نمادهای ایرانی (فروهر، گل شاهی، لاماسو، گیریه و …)
- بخش‌های: درباره من، مهارت‌ها، تکنولوژی، نمونه‌کار، تجربه، رزومه، تماس
- کرسر سفارشی، ذرات، parallax، انیمیشن Framer Motion
- ریسپانسیو موبایل + پشتیبانی `prefers-reduced-motion`
- SEO: sitemap، robots، Open Graph، JSON-LD

---

## استک فنی

| لایه | تکنولوژی |
|------|----------|
| Framework | Next.js 15 (App Router) |
| UI | React 19, Tailwind CSS |
| انیمیشن | Framer Motion |
| زبان | TypeScript |
| فونت | Vazirmatn (فارسی) + Space Grotesk + JetBrains Mono |

---

## شروع سریع (توسعه محلی)

### پیش‌نیاز

- Node.js 20+
- npm 10+

### نصب و اجرا

```powershell
cd mmovasseghi
$env:HTTP_PROXY = $null
$env:HTTPS_PROXY = $null
npm install
npm run dev
```

مرورگر: [http://localhost:3000](http://localhost:3000)

### اسکریپت‌ها

| دستور | کاربرد |
|-------|--------|
| `npm run dev` | سرور توسعه |
| `npm run build` | بیلد production (Node/SSR) |
| `npm run build:static` | خروجی استاتیک در پوشه `out/` |
| `npm start` | اجرای سرور production |
| `npm run lint` | ESLint |
| `npm run typecheck` | بررسی TypeScript |

---

## ساختار پروژه

```
mmovasseghi/
├── src/
│   ├── app/              # App Router، layout، metadata
│   ├── components/       # Hero، Navigation، بخش‌ها
│   └── lib/
│       └── constants.ts  # تمام محتوای فارسی سایت
├── public/               # فایل‌های استاتیک
├── scripts/
│   ├── setup.ps1         # نصب اولیه ویندوز
│   └── deploy-vps.sh     # دیپلوی روی VPS
├── .github/workflows/    # CI/CD GitHub Pages
└── out/                  # خروجی build:static (gitignore)
```

---

## سفارشی‌سازی محتوا

همه متن‌ها در `src/lib/constants.ts`:

- `SITE` — نام، عنوان، ایمیل، گیت‌هاب، تگ‌لاین
- `CAPABILITIES` — مهارت‌ها
- `CASE_STUDIES` — نمونه‌کارها
- `EXPERIENCE` — سوابق
- `SECTIONS` — عناوین بخش‌ها

---

## دیپلوی

### ۱. GitHub Pages (رایگان)

1. Push به شاخه `main`
2. Settings → Pages → Source: **GitHub Actions**
3. workflow خودکار `out/` را منتشر می‌کند

### ۲. VPS + Nginx (توصیه‌شده)

راهنمای کامل: [DEPLOY.md](./DEPLOY.md)

```bash
# روی سرور
curl -fsSL https://raw.githubusercontent.com/mmovasseghi/personal-site/main/scripts/deploy-vps.sh | bash
```

### ۳. Vercel

Import از GitHub → Deploy (بدون `STATIC_EXPORT`)

---

## دامنه رایگان

| سرویس | آدرس |
|-------|------|
| DuckDNS | `mmovasseghi.duckdns.org` |
| GitHub Pages | `mmovasseghi.github.io` (repo جدا) |

---

## تم طراحی

| توکن | رنگ |
|------|-----|
| Void | `#06070B` |
| Indigo | `#4338FF` |
| Cyan | `#00F5FF` |
| Mint | `#45FFB2` |
| Purple | `#7C4DFF` |

---

## لایسنس

MIT — استفاده آزاد با ذکر منبع.

---

## تماس

- **ایمیل:** mmovasseghi@outlook.com
- **گیت‌هاب:** [@mmovasseghi](https://github.com/mmovasseghi)
- **تلگرام:** [@MmdSinashonaM](https://t.me/MmdSinashonaM)
