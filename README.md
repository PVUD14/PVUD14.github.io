# PVU DIVAKAR — THE SERIES

A cinematic, series-style portfolio (dark with red accent). Every section is an episode, every project is an Original.

> A personal portfolio with a fictional series look. Not affiliated with any streaming service and uses none of their logos or fonts.

## Run it locally

Requires Node.js 18+.

```bash
npm install
npm run dev        # open http://localhost:5173
```

Production build (still local): `npm run build` then `npm run preview`.

## Edit content (no coding needed)

Everything lives in **`src/data/portfolio.ts`**. Each block is numbered `[1]`...`[8]`.

| To change | Edit block |
| --- | --- |
| Name, headline, links, email, resume | `[1] profile` |
| Projects / products | `[2] projects` |
| Journey (seasons and episodes) | `[3] seasons` |
| Top 10 row | `[4] topPicks` |
| Skills and "where used" notes | `[5] skillCategories`, `skillEvidence` |
| Awards and certifications | `[6]` |
| Play Intro reel | `[7] introSlides` |
| Viewer profiles and section order | `[8] viewerProfiles` |

Accent colour: `--color-accent` in `src/index.css` (block `[CSS-1]`).

## Photo

Two transparent cutouts live in `assets-src/`: `portrait-hoodie-cutout.png` and `portrait-suit-cutout.png`.
Pick which one the site uses with `portraitSet` at the top of `src/data/portfolio.ts` (block `[0]`), then run:

```bash
npm run images
```

This rebuilds the responsive WebP portraits for both photos and the social share image. The portrait also has a soft edge fade (`[P-3]` in `src/components/Portrait.tsx`) so the photo's cropped sides never show as hard lines.

## Signature quote

The Sanskrit line under the hero is block `[9]` in `src/data/portfolio.ts` (script and transliteration; no English line). The Telugu font is bundled, so it renders offline and on GitHub Pages.

## Before you ever publish — confirm these (search `TODO`)

1. **Work history.** LinkedIn blocks automated reading, so employers and years are not filled in. Add them in `[3] seasons`.
2. **Xefence platforms** are described from the public xefence.com pages and credited to you as builder. Confirm the credit wording in `[2a]`.
3. **Certifications.** Only CISM, OSCP, OSCP+ (from your GitHub bio) are listed. Add the rest with credential links.
4. **Email and resume.** Both are blank on purpose. Fill `profile.email` and add `public/assets/resume.pdf` if you want them shown.
5. **Quote spelling.** Confirm the Telugu-script line in block `[9]` matches what you intend.
6. **xefence.com** subpages beyond the five platforms (services, pricing) are not used.

## Structure

```
src/data/portfolio.ts   single source of truth
src/App.tsx             stages: opening → profile → home
src/components/         Opening, ProfileSelector, Navbar, Hero, PlayIntro, Originals (+modal), Sections
scripts/build-images.mjs portrait + share-image pipeline (sharp)
```

Stack: React 18, TypeScript, Vite 6, Tailwind CSS 4, Framer Motion 11, Lenis.

Keyboard: Enter/Esc skips the opening. Play Intro: Space pause, ← → navigate, Esc close. Overlays close with Esc. Reduced-motion is respected.

## Publish on GitHub Pages (free URL)

Recommended: a repo named exactly **`PVUD14.github.io`**. The site then lives at **https://pvud14.github.io/**.

```bash
git init -b main              # skip if the folder already has .git
git add .
git commit -m "Portfolio"
git remote add origin https://github.com/PVUD14/PVUD14.github.io.git
git push -u origin main
```

Then in the repo: **Settings → Pages → Source → GitHub Actions**. The workflow in `.github/workflows/deploy.yml` builds and publishes on every push to `main`. First deploy takes about two minutes.

Using a different repo name (e.g. `portfolio`)? The URL becomes `https://pvud14.github.io/portfolio/`. The site itself works unchanged (relative paths); only update `VITE_SITE_URL` in `.env.production` to that URL so the LinkedIn share image resolves.

Before pushing, confirm the `TODO` items above. A public repo exposes everything in it, including `src/data/portfolio.ts`.
