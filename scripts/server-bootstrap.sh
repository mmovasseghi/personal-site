#!/bin/bash
set -euo pipefail

APP_DIR="/var/www/mmovasseghi"
DEPLOY_KEY="${1:-}"

mkdir -p "$APP_DIR/out"
mkdir -p /root/.ssh
chmod 700 /root/.ssh

if [ -n "$DEPLOY_KEY" ]; then
  if ! grep -qF "$DEPLOY_KEY" /root/.ssh/authorized_keys 2>/dev/null; then
    echo "$DEPLOY_KEY github-actions-deploy" >> /root/.ssh/authorized_keys
  fi
  chmod 600 /root/.ssh/authorized_keys
fi

cat > /etc/nginx/sites-available/mmovasseghi <<'NGINX'
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name mmovasseghi.duckdns.org mmovasseghi.github.io 155.117.13.123 _;
    root /var/www/mmovasseghi/out;
    index index.html;
    gzip on;
    gzip_types text/plain text/css application/javascript application/json image/svg+xml;
    location / { try_files $uri $uri/ $uri.html /index.html; }
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
NGINX

ln -sf /etc/nginx/sites-available/mmovasseghi /etc/nginx/sites-enabled/mmovasseghi
rm -f /etc/nginx/sites-enabled/default 2>/dev/null || true
nginx -t
systemctl reload nginx

cat > /usr/local/bin/duckdns-update <<'SCRIPT'
#!/bin/bash
[ -f /etc/duckdns-token ] || exit 0
TOKEN=$(cat /etc/duckdns-token)
curl -fsS "https://www.duckdns.org/update?domains=mmovasseghi&token=${TOKEN}&ip=" >/dev/null
SCRIPT
chmod +x /usr/local/bin/duckdns-update

if [ -f /etc/duckdns-token ]; then
  /usr/local/bin/duckdns-update || true
fi

echo "bootstrap-ok"
