# Aziz Ghariani — Portfolio

Static portfolio built with Astro and deployed through Vercel from `main`.

## Commands

```bash
npm install
npm run dev
npm run check
npm run build
npm run preview
```

## Structure

- `src/pages/index.astro` — portfolio content and six main screens
- `src/components/` — BIOS shell controls
- `src/styles/global.css` — production visual system
- `src/scripts/interface.js` — tabs, keyboard shortcuts, and language switching
- `index.html` — preserved legacy website

The production build is written to `dist/`. Vercel deploys the site automatically after updates to `main`.
