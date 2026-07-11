export const SITE = {
  name: "Mohammad Sina Movaseghi Nezhad",
  nameFa: "محمد سینا موثقی نژاد",
  shortName: "mmovasseghi",
  brand: "Personal Site",
  brandFa: "وب‌سایت شخصی",
  title: "توسعه‌دهنده نرم‌افزار",
  titleEn: "Software Developer",
  tagline: "چیزایی می‌سازم که واقعاً استفاده می‌شن.",
  heroName: "سینا",
  heroHeadline1: "هر چیزی که تصورش کنی",
  heroHeadline2: "قابل ساختنه",
  heroMotto:
    "مرز بین ایده و واقعیت، یک پروژه است — من آن را از کد تا سرور زنده می‌کنم.",
  heroFullName: "محمد سینا موثقی نژاد",
  heroHook: "ایده را بیاور؛ بقیه‌اش با من.",
  heroAccess: "ACCESS GRANTED",
  heroConnecting: "CONNECTING TO NODE",
  heroSignal: "TEHRAN // IR",
  heroTag: "NEXUS // DEV",
  heroStacks: "Python · Next.js · Telegram · Docker",
  mission:
    "چیزایی می‌سازم که دوست دارم خودم هم ازشون استفاده کنم. اگه پروژه داری یا فقط می‌خوای حرف بزنیم، خوشحال می‌شم پیام بدی.",
  github: "https://github.com/mmovasseghi",
  email: "contact@mmovasseghi.dev",
  phone: "09909777660",
  phoneIntl: "+989909777660",
  location: "تهران",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://mmovasseghi.dev",
  profileImage: "/images/mohammad-sina-movaseghi-nezhad.png",
  nameVariants: [
    "محمد سینا موثقی نژاد",
    "سینا موثقی نژاد",
    "موثقی نژاد",
    "محمدسینا موثقی نژاد",
    "سینا موثقی",
    "Mohammad Sina Movaseghi Nezhad",
    "Sina Movaseghi",
    "mmovasseghi",
  ],
};

export const UI = {
  skipLink: "رفتن به محتوا",
  skipBoot: "رد کردن ←",
  scroll: "پایین‌تر",
  explore: "ببین چی بلدم",
  heroCtaContact: "حرف بزنیم؟",
  bootTitle: "NODE INIT",
  bootSubtitle: "در حال اتصال به سیستم",
  bootReady: "خوش آمدید",
  bootLoading: "لطفاً صبر کنید",
  bootVersion: "mmovasseghi.dev",
  approach: "روش کار",
  outcome: "نتیجه",
  challenge: "مسئله",
  summary: "خلاصه",
  competencies: "مهارت‌های اصلی",
  education: "تحصیلات",
  downloadCv: "دریافت PDF",
  downloadCvLoading: "در حال ساخت PDF…",
  printCv: "چاپ",
  printBlocked: "مرورگر پاپ‌آپ را مسدود کرد. لطفاً پاپ‌آپ را فعال کنید یا Ctrl+P بزنید.",
  sendEmail: "ارسال ایمیل",
  callMe: "تماس تلفنی",
  github: "GitHub",
  email: "ایمیل",
  available: "آماده همکاری",
  backToTop: "بازگشت به بالا",
  menuToggle: "منو",
  menuLabel: "منو",
  resumeNote: "خلاصه سوابق و مهارت‌ها — مستقیم روی سایت.",
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
    subtitle: "خلاصه‌ای از خودم.",
    accent: "purple",
  },
  skills: {
    eyebrow: "مهارت‌ها",
    title: "بیشتر وقتمو",
    highlight: "اینا می‌ره",
    subtitle: "چیزایی که روزانه باهاشون سر و کار دارم.",
    accent: "mint",
  },
  tech: {
    eyebrow: "ابزارها",
    title: "با چه",
    highlight: "تکنولوژی‌هایی کار می‌کنم",
    subtitle: "همه‌چیز از زبان سیستمی تا وب، دیتابیس و deploy — در یک نگاه.",
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

export const SKILL_CATEGORIES = [
  {
    id: "microsoft",
    title: "Microsoft",
    color: "#7c3aed",
    items: ["C", "C++", "C#", "ASP.NET", ".NET", "F#"],
  },
  {
    id: "web",
    title: "Web Stack",
    color: "#06b6d4",
    items: ["Python", "PHP", "Java", "Node", "FastAPI", "Laravel"],
  },
  {
    id: "data",
    title: "Data & Script",
    color: "#3b82f6",
    items: ["R", "Lua", "Julia", "Perl", "Scala", "Bash"],
  },
  {
    id: "systems",
    title: "Systems",
    color: "#475569",
    items: ["Rust", "Go", "Kotlin", "Swift", "Dart", "Zig"],
  },
];

export const ALL_SKILLS = [
  "C", "C++", "C#", "Rust", "Go", ".NET", "ASP.NET", "F#", "Zig", "Assembly",
  "Python", "PHP", "Java", "Kotlin", "Ruby", "Node.js", "FastAPI", "Laravel", "Django", "Spring",
  "JavaScript", "TypeScript", "React", "Next.js", "Vue", "Angular", "Swift", "Dart", "Flutter", "Tailwind",
  "R", "Lua", "Perl", "Scala", "Haskell", "Elixir", "Erlang", "Julia", "MATLAB", "Bash", "PowerShell",
  "PostgreSQL", "MySQL", "MongoDB", "Redis", "Docker", "Nginx", "Linux", "Git", "Telegram", "Mini App",
  "HTML", "CSS", "SASS", "GraphQL", "REST", "WebSocket", "systemd", "VPS", "SSL", "CI/CD",
];

export const DELIVERABLES = {
  title: "What I deliver",
  tagline: "End-to-end product builder | Tehran, Iran",
  left: [
    "Full architecture and clean code",
    "Backend APIs, bots, mini apps, admin panels",
    "Payments, automation, database design",
  ],
  right: [
    "Modern frontend with premium UX",
    "Docker, Nginx, VPS deploy, monitoring",
    "Security: auth, HTTPS, secrets hardening",
  ],
};

export const CAPABILITIES = [
  {
    symbol: "⬢",
    title: "بک‌اند و API",
    desc: "منطق اصلی برنامه — API با پایتون، FastAPI و ASP.NET.",
    tech: ["Python", "FastAPI", "ASP.NET", "REST API"],
  },
  {
    symbol: "⬡",
    title: "وب‌اپ",
    desc: "رابط کاربری با React و Next.js — سریع و قابل نگهداری.",
    tech: ["React", "Next.js", "TypeScript"],
  },
  {
    symbol: "□",
    title: "سرور و انتشار",
    desc: "راه‌اندازی سرور، Docker، Nginx و publish کردن پروژه.",
    tech: ["Docker", "Linux", "Nginx", "CI/CD"],
  },
  {
    symbol: "◎",
    title: "تلگرام و اتوماسیون",
    desc: "Mini App، ربات تلگرام و خودکار کردن کارهای تکراری.",
    tech: ["Telegram Mini App", "Bots", "Automation"],
  },
  {
    symbol: "◈",
    title: "دیتابیس",
    desc: "طراحی دیتابیس، migration و کار با PostgreSQL و Redis.",
    tech: ["PostgreSQL", "Redis", "SQL"],
  },
  {
    symbol: "△",
    title: "ورود و امنیت",
    desc: "سیستم لاگین، سطح دسترسی و نگه‌داری امن اطلاعات کاربر.",
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
  languages: {
    label: "Programming Languages",
    items: [
      "C", "C++", "C#", "Rust", "Go", ".NET", "ASP.NET", "F#", "Zig", "Assembly",
      "Python", "PHP", "Java", "Kotlin", "Ruby", "Node.js", "FastAPI", "Laravel", "Django", "Spring",
      "JavaScript", "TypeScript", "React", "Next.js", "Vue", "Angular", "Swift", "Dart", "Flutter", "Tailwind",
      "R", "Lua", "Perl", "Scala", "Haskell", "Elixir", "Erlang", "Julia", "MATLAB", "Bash", "PowerShell",
    ],
  },
  infra: {
    label: "Infrastructure & Data",
    items: [
      "PostgreSQL", "MySQL", "MongoDB", "Redis", "Docker", "Nginx", "Linux", "Git",
      "Telegram", "Mini App", "HTML", "CSS", "SASS", "GraphQL", "REST", "WebSocket",
      "systemd", "VPS", "SSL", "CI/CD",
    ],
  },
};

export const BOOT_STAGES = [
  { label: "اتصال به نود...", progress: 12 },
  { label: "بارگذاری ماژول‌ها", progress: 32 },
  { label: "همگام‌سازی داده", progress: 52 },
  { label: "فعال‌سازی لایه‌ها", progress: 76 },
  { label: "آماده ورود", progress: 100 },
];

export const BOOT_LOGS = [
  "> INIT sequence: mmovasseghi.node",
  "> LOCALE........ Tehran, IR",
  "> PYTHON_STACK .. [OK]",
  "> NEXT_RUNTIME .. [OK]",
  "> DOCKER_LAYER .. [OK]",
  "> GITHUB_SYNC ... connected",
  "> محمد سینا موثقی نژاد",
  "> ROLE.......... Software Developer",
  "> ACCESS_LAYER .. READY",
  "> Awaiting user entry...",
];

export const NAV_ITEMS = [
  { href: "#hero", label: "خانه" },
  { href: "#about", label: "درباره من" },
  { href: "#skills", label: "مهارت‌ها" },
  { href: "#work", label: "نمونه کار" },
  { href: "#resume", label: "رزومه" },
  { href: "#contact", label: "تماس" },
];

export const RESUME = {
  summary:
    "محمد سینا موثقی نژاد — برنامه‌نویس و توسعه‌دهنده نرم‌افزار در تهران. مسلط به زبان‌ها و فریم‌ورک‌های متنوع از C/C++/C# تا Python، Java، Rust، Go و اکوسیستم وب مدرن. تجربه در ساخت API، اپلیکیشن وب، پروژه‌های تلگرام، راه‌اندازی سرور و deploy.",
  highlights: [
    "Full architecture and clean code",
    "Backend APIs, bots, mini apps, admin panels",
    "Payments, automation, database design",
    "Modern frontend with premium UX",
    "Docker, Nginx, VPS deploy, monitoring",
    "Security: auth, HTTPS, secrets hardening",
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

export const HERO_BOOT_LINES = [
  { type: "cmd" as const, text: "system.init --user=sina" },
  { type: "out" as const, text: "[OK] kernel loaded" },
  { type: "cmd" as const, text: "whoami" },
  { type: "out" as const, text: "sina // software developer" },
  { type: "cmd" as const, text: "cat location" },
  { type: "out" as const, text: "tehran, ir — utc+3:30" },
  { type: "cmd" as const, text: "status --check" },
  { type: "out" as const, text: "[ONLINE] ready for projects" },
];

export const HERO_STATS = [
  { id: "stack", label: "STACK", value: "Python", icon: "⬢" },
  { id: "web", label: "WEB", value: "Next.js", icon: "⬡" },
  { id: "bot", label: "BOT", value: "Telegram", icon: "◎" },
  { id: "ops", label: "OPS", value: "Docker", icon: "□" },
];
export const IDENTITY_STATEMENTS = ABOUT_INTRO.map((line) => ({
  line,
  role: "statement" as const,
}));
