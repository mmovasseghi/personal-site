# MSM Lab — Setup Script (Windows)
# Run: .\scripts\setup.ps1

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot\..

Write-Host "MSM Lab — Installing dependencies..." -ForegroundColor Cyan

# Local proxy (e.g. Clash/V2Ray) often breaks npm when not running
$env:HTTP_PROXY = $null
$env:HTTPS_PROXY = $null
$env:ALL_PROXY = $null

$registries = @(
    "https://registry.npmjs.org",
    "https://registry.npmmirror.com"
)

$installed = $false
foreach ($registry in $registries) {
    Write-Host "Trying registry: $registry"
    try {
        npm install --registry $registry --no-audit --no-fund --proxy=null --https-proxy=null
        if ($LASTEXITCODE -eq 0) {
            $installed = $true
            break
        }
    } catch {
        Write-Host "Failed with $registry" -ForegroundColor Yellow
    }
}

if (-not $installed) {
    Write-Host "npm install failed. Check your internet connection." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Running typecheck..." -ForegroundColor Cyan
npm run typecheck

Write-Host ""
Write-Host "Building project..." -ForegroundColor Cyan
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "Setup complete! Run: npm run dev" -ForegroundColor Green
} else {
    Write-Host "Build failed." -ForegroundColor Red
    exit 1
}
