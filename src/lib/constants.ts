export const SITE = {
  name: "Mohammad Sina Movaseghi Nezhad",
  nameFa: "محمد سینا موثقی نژاد",
  shortName: "mmovasseghi",
  brand: "Personal Site",
  brandFa: "وب‌سایت شخصی",
  title: "برنامه‌نویس و توسعه‌دهنده نرم‌افزار",
  titleEn: "Software Developer",
  tagline: "وب‌اپ و API می‌سازم — از ایده تا اجرا.",
  mission:
    "برنامه‌نویس از تهران — پروژه‌های واقعی، کد تمیز، تحویل تا آخر.",
  github: "https://github.com/mmovasseghi",
  email: "contact@mmovasseghi.dev",
  location: "تهران، ایران",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://mmovasseghi.dev",
};

export const UI = {
  skipLink: "رفتن به محتوا",
  skipBoot: "رد کردن ←",
  scroll: "اسکرول",
  explore: "شروع کن",
  heroGreeting: "سلام — من",
  heroCtaContact: "تماس",
  bootTitle: "در حال بارگذاری",
  bootReady: "خوش آمدید",
  bootLoading: "لطفاً صبر کنید",
  bootVersion: "mmovasseghi.dev",
  approach: "روش کار",
  outcome: "نتیجه",
  challenge: "مسئله",
  summary: "خلاصه",
  competencies: "مهارت‌های اصلی",
  education: "تحصیلات",
  downloadCv: "دانلود رزومه",
  sendEmail: "ارسال ایمیل",
  github: "GitHub",
  email: "ایمیل",
  available: "آماده همکاری",
  backToTop: "بازگشت به بالا",
  menuToggle: "منو",
  menuLabel: "منو",
  resumeNote: "خلاصه‌ای از سوابق کاری من. برای جزئیات بیشتر تماس بگیرید.",
  contactTitle: "بیایید",
  contactHighlight: "صحبت کنیم",
  contactDesc:
    "پروژه جدید دارید، سوالی هست، یا فقط می‌خواهید آشنا شویم — خوشحال می‌شوم پیام بدهید.",
  caseStudyNote: "چند نمونه از کارهایی که انجام داده‌ام.",
  returnHome: "بازگشت به خانه",
  retry: "تلاش مجدد",
  errorTitle: "خطا",
  errorDesc: "مشکلی پیش آمد. صفحه را دوباره بارگذاری کنید.",
  notFoundTitle: "صفحه",
  notFoundHighlight: "پیدا نشد",
  notFoundDesc: "این صفحه وجود ندارد.",
  criticalError: "خطا",
  restart: "بارگذاری مجدد",
};

export type SectionId =
  | "about"
  | "skills"
  | "tech"
  | "work"
  | "experience"
  | "resume"
  | "contact";

export const SECTIONS: Record<
  SectionId,
  {
    eyebrow: string;
    title: string;
    highlight: string;
    subtitle?: string;
    accent: "purple" | "indigo" | "cyan" | "mint" | "acid";
  }
> = {
  about: {
    eyebrow: "درباره من",
    title: "کی هستم",
    highlight: "و چه کار می‌کنم",
    subtitle:
      "خلاصه‌ای از خودم — بدون اصطلاحات عجیب و غریب.",
    accent: "purple",
  },
  skills: {
    eyebrow: "مهارت‌ها",
    title: "چیزهایی که",
    highlight: "بلدم",
    subtitle: "حوزه‌هایی که بیشتر وقتمو صرفشان می‌کنم.",
    accent: "mint",
  },
  tech: {
    eyebrow: "ابزارها",
    title: "با چه",
    highlight: "تکنولوژی‌هایی کار می‌کنم",
    accent: "indigo",
  },
  work: {
    eyebrow: "نمونه کار",
    title: "پروژه‌هایی که",
    highlight: "روشان کار کردم",
    subtitle: UI.caseStudyNote,
    accent: "indigo",
  },
  experience: {
    eyebrow: "تجربه",
    title: "کارهایی که",
    highlight: "تا الان انجام دادم",
    accent: "acid",
  },
  resume: {
    eyebrow: "رزومه",
    title: "خلاصه",
    highlight: "سوابق",
    subtitle: UI.resumeNote,
    accent: "indigo",
  },
  contact: {
    eyebrow: "ارتباط",
    title: "تماس",
    highlight: "با من",
    accent: "indigo",
  },
};

export const ABOUT_INTRO = [
  "من محمد سینا موثقی نژاد هستم، برنامه‌نویس از تهران.",
  "علاقه‌ام ساختن چیزهای کاربردی است — چیزی که واقعاً استفاده شود و درست کار کند.",
  "بیشتر روی بک‌اند، API، اپلیکیشن وب و پروژه‌های تلگرام کار می‌کنم. وقتی لازم باشد سرور و deploy را هم خودم راه می‌اندازم.",
];

export const ABOUT_POINTS = [
  {
    id: "01",
    title: "ساده و قابل فهم",
    text: "کد و محصولی می‌سازم که بعداً راحت بتوان فهمید و توسعه داد.",
  },
  {
    id: "02",
    title: "تا آخر پروژه",
    text: "فقط کد نمی‌زنم و می‌روم — تا وقتی روی سرور درست کار کند کنارش هستم.",
  },
  {
    id: "03",
    title: "یادگیری مداوم",
    text: "تکنولوژی عوض می‌شود؛ من هم با پروژه‌های جدید یاد می‌گیرم و جلو می‌روم.",
  },
];

export const CAPABILITIES = [
  {
    symbol: "⬢",
    title: "توسعه بک‌اند",
    desc: "ساخت API و منطق برنامه — FastAPI، ASP.NET و پایتون.",
    tech: ["Python", "FastAPI", "ASP.NET", "REST API"],
  },
  {
    symbol: "⬡",
    title: "اپلیکیشن وب",
    desc: "فرانت‌اند مدرن با React و Next.js.",
    tech: ["React", "Next.js", "TypeScript"],
  },
  {
    symbol: "□",
    title: "سرور و Deploy",
    desc: "راه‌اندازی سرور، Docker، Nginx و انتشار پروژه.",
    tech: ["Docker", "Linux", "Nginx", "CI/CD"],
  },
  {
    symbol: "◎",
    title: "تلگرام و اتوماسیون",
    desc: "Mini App، بات و خودکارسازی کارهای تکراری.",
    tech: ["Telegram Mini App", "Bots", "Automation"],
  },
  {
    symbol: "◈",
    title: "دیتابیس",
    desc: "طراحی و کار با PostgreSQL، Redis و migration.",
    tech: ["PostgreSQL", "Redis", "SQL"],
  },
  {
    symbol: "△",
    title: "امنیت پایه",
    desc: "ورود کاربر، دسترسی‌ها و نگه‌داری امن اطلاعات.",
    tech: ["JWT", "OAuth", "Auth"],
  },
];

export const EXPERIENCE = [
  "ساخت سیستم پرداخت و فروش آنلاین",
  "توسعه Telegram Mini App برای فروش و مدیریت سفارش",
  "طراحی پنل مدیریت و داشبورد",
  "راه‌اندازی و نگهداری سرور با Docker و Nginx",
  "پیاده‌سازی ورود کاربر و سطح دسترسی",
  "اتوماسیون کارهای تکراری و استفاده از AI در پروژه‌ها",
];

export const TECH_RADAR = {
  core: {
    label: "هر روز",
    items: ["Python", "JavaScript", "Docker", "React", "FastAPI"],
  },
  advanced: {
    label: "بلدم",
    items: ["Next.js", "ASP.NET", "PostgreSQL", "Redis", "Linux"],
  },
  working: {
    label: "گاهی",
    items: ["Go", "PHP", "Flutter", "Java"],
  },
  exploring: {
    label: "در حال یادگیری",
    items: ["Rust", "Tauri", "Local AI"],
  },
};

export const BOOT_STAGES = [
  { label: "بارگذاری...", progress: 30 },
  { label: "آماده‌سازی", progress: 60 },
  { label: "خوش آمدید", progress: 100 },
];

export const BOOT_LOGS = [
  "> محمد سینا موثقی نژاد",
  "> برنامه‌نویس — تهران",
  "> mmovasseghi.dev",
];

export const NAV_ITEMS = [
  { href: "#hero", label: "خانه" },
  { href: "#about", label: "درباره من" },
  { href: "#skills", label: "مهارت‌ها" },
  { href: "#work", label: "نمونه کار" },
  { href: "#contact", label: "تماس" },
];

export const RESUME = {
  summary:
    "محمد سینا موثقی نژاد — برنامه‌نویس و توسعه‌دهنده نرم‌افزار در تهران. تجربه در ساخت API، اپلیکیشن وب، پروژه‌های تلگرام، راه‌اندازی سرور و deploy. علاقه‌مند به ساخت محصولات تمیز و قابل اعتماد.",
  highlights: [
    "توسعه API و بک‌اند با Python و FastAPI",
    "ساخت اپلیکیشن وب با React و Next.js",
    "پروژه‌های Telegram Mini App و commerce",
    "راه‌اندازی سرور با Docker، Nginx و Linux",
    "پیاده‌سازی ورود کاربر و امنیت پایه",
    "اتوماسیون و یکپارچه‌سازی AI در پروژه‌ها",
  ],
  education: "یادگیری عملی از طریق ساخت پروژه‌های واقعی",
};

export const CASE_STUDIES = [
  {
    id: "commerce",
    symbol: "◈",
    title: "فروشگاه آنلاین",
    challenge: "سیستم فروش با پرداخت آنلاین و ترافیک بالا.",
    approach: "API جدا، مدیریت پرداخت امن، کش برای سرعت.",
    outcome: "فروش پایدار حتی در ساعات شلوغ.",
    tags: ["API", "Payments", "Redis"],
  },
  {
    id: "telegram",
    symbol: "⬡",
    title: "اپلیکیشن تلگرام",
    challenge: "فروش و مدیریت سفارش داخل تلگرام.",
    approach: "ربات، وب‌اپ و API جدا — هر کدام کار خودش.",
    outcome: "ثبت سفارش، پرداخت و پنل مدیریت در یک جا.",
    tags: ["Telegram", "Mini App", "Commerce"],
  },
  {
    id: "infra",
    symbol: "□",
    title: "راه‌اندازی سرور",
    challenge: "انتشار دستی و قطعی‌های مکرر.",
    approach: "Docker، Nginx و deploy خودکار.",
    outcome: "انتشار راحت‌تر و برگشت سریع در صورت مشکل.",
    tags: ["Docker", "Nginx", "Linux"],
  },
  {
    id: "dashboard",
    symbol: "◎",
    title: "پنل مدیریت",
    challenge: "داده‌های پراکنده و گزارش‌گیری سخت.",
    approach: "داشبورد یکپارچه با نمودار، فیلتر و دسترسی نقش‌محور.",
    outcome: "مدیریت روزانه سریع‌تر و تصمیم‌گیری راحت‌تر.",
    tags: ["Next.js", "Dashboard", "PostgreSQL"],
  },
  {
    id: "api",
    symbol: "△",
    title: "API و یکپارچه‌سازی",
    challenge: "اتصال چند سرویس و سیستم قدیمی به هم.",
    approach: "REST API تمیز، مستندسازی و لایه امنیتی.",
    outcome: "ارتباط پایدار بین سرویس‌ها بدون وابستگی زیاد.",
    tags: ["FastAPI", "REST", "Integration"],
  },
  {
    id: "automation",
    symbol: "◇",
    title: "اتوماسیون کسب‌وکار",
    challenge: "کارهای تکراری دستی و خطای انسانی.",
    approach: "بات تلگرام، زمان‌بندی وظایف و اعلان خودکار.",
    outcome: "کمتر شدن کار دستی و پیگیری سریع‌تر فرآیندها.",
    tags: ["Python", "Automation", "Telegram Bot"],
  },
];

export const SECTION_IDS = [
  "hero",
  "about",
  "skills",
  "tech",
  "work",
  "experience",
  "resume",
  "contact",
];

export const ACCENT_CLASS = {
  purple: "text-purple/60",
  indigo: "text-indigo/60",
  cyan: "text-cyan/60",
  mint: "text-mint/60",
  acid: "text-acid/60",
} as const;

// Legacy aliases — kept for components that still import old names
export const HERO_TAGS = [
  "Backend",
  "Next.js",
  "Python",
  "Docker",
  "Telegram",
  "API",
];
export const IDENTITY_STATEMENTS = ABOUT_INTRO.map((line) => ({
  line,
  role: "statement" as const,
}));
