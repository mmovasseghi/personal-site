/** نمادها و گلیف‌های هکری — تم آبی */
export const HACKER_GLYPHS = [
  "0", "1", "{", "}", "[", "]", "<", ">", "/",
  "#", "$", "@", "0x", ">>", "=>", "//", "&&",
  "sudo", "ssh", "git", "api", "npm", "pip",
  "def", "fn", "if", "try", "async", "await",
  "root", "bin", "sys", "dev", "tcp", "udp",
  "hex", "xor", "aes", "jwt", "sql", "orm",
];

export const HACKER_SYMBOLS = ["▸", "◈", "⬡", "□", "◎", "△", "◇", "⬢", "╱", "╲", "│", "─"];

export const TERMINAL_PROMPTS = [
  "root@mmovasseghi:~$",
  "sudo deploy --prod",
  "git push origin main",
  "docker compose up -d",
  "ssh mmovasseghi@server",
  "npm run build",
  "pip install -r requirements.txt",
  "systemctl restart nginx",
];

export function randomGlyph(seed: number) {
  return HACKER_GLYPHS[Math.abs(seed) % HACKER_GLYPHS.length];
}

/** کاراکترهای حلقه‌های تونل — فقط باینری + نمادهای برنامه‌نویسی */
export const TUNNEL_RING_CHARS = [
  "0", "1", "0", "1", "0", "1", "0", "1",
  "1", "0", "1", "0", "1", "0", "1", "0",
  "{", "}", "[", "]", "<", ">", "(", ")",
  "/", "*", "#", "@", "&", "|", ";", ":",
  "=>", "&&", "||", "==", "!=", "//", "/*",
  "++", "--", "+=", "%", "^", "~", ".", ",",
] as const;

export const TUNNEL_WALL_CHARS = ["0", "1"] as const;

export function randomSymbol(seed: number) {
  return HACKER_SYMBOLS[Math.abs(seed) % HACKER_SYMBOLS.length];
}
