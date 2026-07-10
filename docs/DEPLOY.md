# Deploy Guide

## Local Development

```bash
npm install
npm run dev
```

## Vercel (Recommended)

1. Push repo to GitHub
2. Import project at [vercel.com](https://vercel.com)
3. Framework: Next.js (auto-detected)
4. Deploy

## GitHub Pages

### User site (`username.github.io`)

1. Rename repo to `username.github.io`
2. Settings → Pages → Source: **GitHub Actions**
3. Push to `main` branch
4. Workflow deploys automatically

### Project site (`username.github.io/repo`)

Set base path before static build:

**Windows:**
```powershell
$env:NEXT_PUBLIC_BASE_PATH="/repo-name"
npm run build:static
```

**macOS/Linux:**
```bash
NEXT_PUBLIC_BASE_PATH=/repo-name npm run build:static
```

Or add to GitHub Actions workflow env.

## Custom Domain

1. Add CNAME record pointing to GitHub Pages or Vercel
2. Update `metadataBase` in `src/app/layout.tsx`
3. Update `sitemap.ts` and `robots.ts` URLs

## Environment Variables

| Variable | Purpose |
|----------|---------|
| `STATIC_EXPORT=true` | Enable static HTML export |
| `NEXT_PUBLIC_BASE_PATH` | Subpath for GitHub project pages |

## Post-Deploy Checklist

- [ ] Update email in `src/lib/constants.ts`
- [ ] Verify OpenGraph preview
- [ ] Test mobile navigation
- [ ] Test resume download
- [ ] Check scroll animations
- [ ] Verify GitHub link works
