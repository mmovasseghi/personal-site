#Requires -Version 5.1
<#
  Full automated deploy — one command.
  Usage: $env:VPS_PASSWORD = "..." ; .\scripts\auto-deploy.ps1
#>
$ErrorActionPreference = "Stop"

$Root = Split-Path $PSScriptRoot -Parent
$Server = "155.117.13.123"
$User = "root"
$Port = 22
$Repo = "mmovasseghi/personal-site"
$KeyPath = "$env:USERPROFILE\.mmovasseghi_deploy_key"
$Plink = "C:\Program Files\PuTTY\plink.exe"
$Pscp = "C:\Program Files\PuTTY\pscp.exe"
$PubKey = ""

if (-not (Test-Path $KeyPath)) {
  ssh-keygen -t ed25519 -f $KeyPath -N '""' -q
}
$PubKey = (Get-Content "$KeyPath.pub" -Raw).Trim()
$PrivKey = Get-Content $KeyPath -Raw

if ($env:VPS_PASSWORD) {
  Write-Host "==> Bootstrap VPS + SSH key..."
  $keyEsc = $PubKey -replace "'", "'\\''"
  & $Plink -ssh "${User}@${Server}" -P $Port -pw $env:VPS_PASSWORD @"
mkdir -p /var/www/mmovasseghi/out /root/.ssh
grep -qF '$keyEsc' /root/.ssh/authorized_keys 2>/dev/null || echo '$keyEsc github-actions-deploy' >> /root/.ssh/authorized_keys
chmod 700 /root/.ssh && chmod 600 /root/.ssh/authorized_keys
curl -fsSL https://raw.githubusercontent.com/mmovasseghi/personal-site/main/scripts/server-bootstrap.sh | bash -s -- '$keyEsc'
"@
}

Write-Host "==> GitHub Actions secrets..."
gh secret set VPS_HOST --body $Server --repo $Repo
gh secret set VPS_USER --body $User --repo $Repo
gh secret set VPS_PORT --body "$Port" --repo $Repo
gh secret set VPS_SSH_KEY --body $PrivKey --repo $Repo
if ($env:DUCKDNS_TOKEN) {
  gh secret set DUCKDNS_TOKEN --body $env:DUCKDNS_TOKEN --repo $Repo
  if ($env:VPS_PASSWORD) {
    & $Plink -ssh "${User}@${Server}" -P $Port -pw $env:VPS_PASSWORD `
      "echo '$env:DUCKDNS_TOKEN' > /etc/duckdns-token; chmod 600 /etc/duckdns-token; /usr/local/bin/duckdns-update"
  }
}

Write-Host "==> Build..."
Set-Location $Root
$env:HTTP_PROXY = $null
$env:HTTPS_PROXY = $null
npm run build:static | Out-Null

Write-Host "==> Upload..."
if ($env:VPS_PASSWORD) {
  & $Pscp -r -P $Port -pw $env:VPS_PASSWORD "$Root\out\*" "${User}@${Server}:/var/www/mmovasseghi/out/"
  & $Plink -ssh "${User}@${Server}" -P $Port -pw $env:VPS_PASSWORD "nginx -t && systemctl reload nginx"
} else {
  scp -i $KeyPath -P $Port -r "$Root\out\*" "${User}@${Server}:/var/www/mmovasseghi/out/"
  ssh -i $KeyPath -p $Port "${User}@${Server}" "nginx -t && systemctl reload nginx"
}

Write-Host "==> Git push (source only)..."
git -C $Root add .github scripts .gitignore README.md DEPLOY.md
git -C $Root diff --cached --quiet
if ($LASTEXITCODE -ne 0) {
  git -C $Root commit -m "chore: CI/CD auto deploy pipeline"
  git -C $Root push origin main
}

gh api -X POST "repos/$Repo/pages" -f build_type=workflow -f source[branch]=main -f source[path]=/ 2>$null

Write-Host ""
Write-Host "DONE  http://$Server"
Write-Host "      https://mmovasseghi.github.io/personal-site/ (after Pages build)"
Write-Host "CI/CD: every push to main -> auto deploy to VPS"
