# راهنمای دیپلوی — mmovasseghi

## اطلاعات سرور

| مورد | مقدار |
|------|-------|
| IP | `155.117.13.123` |
| SSH Port | `22` |
| User | `root` |
| مسیر سایت | `/var/www/mmovasseghi` |
| دامنه رایگان | `mmovasseghi.duckdns.org` |

---

## مرحله ۱ — آپلود به GitHub

```bash
git init
git add .
git commit -m "feat: personal portfolio site"
git branch -M main
git remote add origin https://github.com/mmovasseghi/personal-site.git
git push -u origin main
```

---

## مرحله ۲ — دیپلوی روی VPS

### روش خودکار

```bash
ssh root@155.117.13.123
bash <(curl -fsSL https://raw.githubusercontent.com/mmovasseghi/personal-site/main/scripts/deploy-vps.sh)
```

### روش دستی

```bash
# 1. کلون پروژه
mkdir -p /var/www/mmovasseghi
cd /var/www/mmovasseghi
git clone https://github.com/mmovasseghi/personal-site.git .

# 2. بیلد
npm ci
npm run build:static

# 3. Nginx
cp scripts/nginx-mmovasseghi.conf /etc/nginx/sites-available/mmovasseghi
ln -sf /etc/nginx/sites-available/mmovasseghi /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx
```

---

## مرحله ۳ — دامنه رایگان DuckDNS

1. برو به [duckdns.org](https://www.duckdns.org) و با GitHub لاگین کن
2. ساب‌دامین `mmovasseghi` بساز
3. IP را `155.117.13.123` بگذار
4. توکن را کپی کن و روی سرور:

```bash
echo 'mmovasseghi.duckdns.org' > /etc/duckdns-domain
echo 'YOUR_TOKEN' > /etc/duckdns-token
chmod 600 /etc/duckdns-token
# cron هر ۵ دقیقه IP را آپدیت می‌کند (در deploy-vps.sh نصب می‌شود)
```

---

## مرحله ۴ — HTTPS (اختیاری)

```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d mmovasseghi.duckdns.org --non-interactive --agree-tos -m mmovasseghi@outlook.com
```

---

## به‌روزرسانی سایت

```bash
cd /var/www/mmovasseghi
git pull origin main
npm ci
npm run build:static
systemctl reload nginx
```

---

## عیب‌یابی

| مشکل | راه‌حل |
|------|--------|
| صفحه سفید | `ls /var/www/mmovasseghi/out/index.html` |
| 502 | `nginx -t` و `systemctl status nginx` |
| دامنه کار نمی‌کند | `dig mmovasseghi.duckdns.org` → باید IP سرور باشد |
| بیلد خطا | `node -v` باید 20+ باشد |

---

## GitHub Actions

هر push به `main` → بیلد استاتیک → GitHub Pages (اگر workflow فعال باشد).

برای دیپلوی خودکار به VPS، Secret `VPS_SSH_KEY` را در repo تنظیم کن.
