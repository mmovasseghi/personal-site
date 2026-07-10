#!/bin/bash
set -euo pipefail

APP_DIR="/var/www/mmovasseghi"
REPO="https://github.com/mmovasseghi/personal-site.git"
DOMAIN="mmovasseghi.duckdns.org"

echo "==> Installing dependencies..."
export DEBIAN_FRONTEND=noninteractive
apt-get update -qq
apt-get install -y -qq git curl nginx > /dev/null 2>&1 || true

echo "==> Node check..."
if ! command -v node &>/dev/null || [[ $(node -v | cut -d. -f1 | tr -d v) -lt 20 ]]; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y -qq nodejs
fi

echo "==> Clone / update project..."
mkdir -p "$APP_DIR"
if [ -d "$APP_DIR/.git" ]; then
  cd "$APP_DIR" && git fetch origin main && git reset --hard origin/main
else
  git clone "$REPO" "$APP_DIR"
  cd "$APP_DIR"
fi

echo "==> Build static site (skip if low disk — upload out/ from local)..."
if [ "${SKIP_BUILD:-}" = "1" ]; then
  echo "SKIP_BUILD=1 — expecting pre-uploaded out/"
elif [ -d out/index.html ]; then
  echo "out/ already exists, rebuilding..."
  npm ci --no-audit --no-fund
  npm run build:static
else
  npm ci --no-audit --no-fund
  npm run build:static
fi

echo "==> Configure Nginx..."
cat > /etc/nginx/sites-available/mmovasseghi <<'NGINX'
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name mmovasseghi.duckdns.org 155.117.13.123 _;

    root /var/www/mmovasseghi/out;
    index index.html;

    gzip on;
    gzip_types text/plain text/css application/javascript application/json image/svg+xml;

    location / {
        try_files $uri $uri/ $uri.html /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
NGINX

ln -sf /etc/nginx/sites-available/mmovasseghi /etc/nginx/sites-enabled/mmovasseghi
rm -f /etc/nginx/sites-enabled/default 2>/dev/null || true
nginx -t
systemctl enable nginx
systemctl reload nginx

echo "==> DuckDNS updater (if token exists)..."
if [ -f /etc/duckdns-token ]; then
  TOKEN=$(cat /etc/duckdns-token)
  curl -fsS "https://www.duckdns.org/update?domains=mmovasseghi&token=${TOKEN}&ip=" || true
  cat > /usr/local/bin/duckdns-update <<DUCK
#!/bin/bash
curl -fsS "https://www.duckdns.org/update?domains=mmovasseghi&token=${TOKEN}&ip=" >/dev/null
DUCK
  chmod +x /usr/local/bin/duckdns-update
  (crontab -l 2>/dev/null | grep -v duckdns-update; echo "*/5 * * * * /usr/local/bin/duckdns-update") | crontab -
fi

echo "==> Done! Site at http://155.117.13.123 and http://${DOMAIN}"
ls -la "$APP_DIR/out/index.html"
