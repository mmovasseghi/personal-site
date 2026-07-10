# آپلود سریع بیلد به VPS (ویندوز)
# استفاده: .\scripts\upload-vps.ps1

$ErrorActionPreference = "Stop"
$Server = "155.117.13.123"
$User = "root"
$RemotePath = "/var/www/mmovasseghi/out"
$Plink = "C:\Program Files\PuTTY\plink.exe"
$Pscp = "C:\Program Files\PuTTY\pscp.exe"

Write-Host "==> Building static site..."
$env:HTTP_PROXY = $null
$env:HTTPS_PROXY = $null
npm run build:static

Write-Host "==> Uploading to VPS..."
& $Pscp -r -pw $env:VPS_PASSWORD "out\*" "${User}@${Server}:${RemotePath}/"

Write-Host "==> Reloading nginx..."
& $Plink -ssh "${User}@${Server}" -pw $env:VPS_PASSWORD "nginx -t && systemctl reload nginx"

Write-Host "==> Done: http://$Server"
