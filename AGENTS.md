# AGENTS.md — Mathulac / Visaka Paints website

Single-page Vite + React 18 + TypeScript site for **Visaka Paints & Chemicals India** under the **Mathulac** brand.

## Commands
- `npm run dev` — Vite dev server (always run after changes to check visually)
- `npm run typecheck` — `tsc --noEmit -p tsconfig.app.json`
- `npm run lint` — ESLint
- `npm run build` — `vite build` ONLY, does NOT type-check. Run `npm run typecheck` first, then `npm run build`, then `npm run dev`.
- No test framework exists.

## Architecture
- NO router. "Pages" are same-page sections reached via `scrollTo(id)` → `scrollIntoView`. Preserve section anchors: `top`, `spaces`, `auto`, `wood`, `decor`, `products`, `palette`, `contact`. `navItems` in `data.ts` drives the navbar links — its `id`s must match these section ids.
- All sections except Hero/Navbar/PaintStudio are defined inline in `src/App.tsx` (ProductShowcase, WoodSection, AutoSection, DecorSection, ColorPaletteSection, ColorScrollSection, BeforeAfter, CompanyStory, TrustSection, ContactSection, Footer). Do not rewrite these for hero work.
- `src/data.ts` is the single content source: `brand`, `categories`, `services`, `palette`, `paintShades` (78 curated shades, used by PaintStudio), `heroSlides`, `surfaces`, `companyFacts`, `trustPillars`, `timeline`, `roomColors`, `roomScenes`, `navItems`, `phoneNumbers`, `featuredProducts`. Change copy here, not in components.
- Import alias `@/` → `src/`.
- Local brand assets in `assets/`: `logo.png` (official Visaka logo, 285×130 RGBA), `brand.jpeg`, `colours.jpeg`, `paintwall.png`, `visaka-brand-reference.mp4` (client-provided reference video for the hero brand-intro look — the reveal is RE-CREATED with GSAP/SVG/CSS, never embedded as a video). Most hero imagery is external Pexels/Unsplash URLs in `data.ts` — needs network at runtime. Fonts (DM Serif Display, Manrope, Inter) load via `@import` from Google Fonts in `src/index.css`.
- Brand colour tokens in `tailwind.config.js`: magenta `#E6007E`, hotpink `#FF1493`, cyan `#00C8FF`, flame `#FF7A00`, sun `#FFD400`, leaf `#67D600`, violet `#7B2CFF`, electric `#146BFF`, ember `#F51B24`, ink `#0B1020`, cream `#FFF8F1`.

## Brand constraints (client-mandated, non-negotiable)
- Company: "Visaka Paints & Chemicals India"; brand: "Mathulac"; tagline: "Colour that transforms spaces."
- Use the real `assets/logo.png` as the hero centrepiece. Never invent, redesign, or distort the official logo.

## Hero (src/Hero.tsx) — fragile
- GSAP brand reveal timeline (Visaka → Mathulac) targets DOM ids (`#brand-reveal`, `#brand-logo`, `#brand-name`, `#brand-flow-path`, `#reveal-sweep`). The reveal overlay is `fixed z-[80]`.
- Background is a 5-slide crossfade from `heroSlides` (Living/Exterior/Wood/Auto/Decor) with Ken Burns zoom, category rail, arrow controls, swipe gestures; transitions use the `.paint-sweep` overlay (styled in `src/index.css`).
- The wood/car/paint background imagery IS these slides — never remove or replace the slideshow. Keep the logo/branding visible at all times while slides change.
- Autoplay (6.5s) and the content re-reveal on category change are gated on `revealDone.current`; category changes route through `go(i)`, which animates a `.paint-sweep` overlay before flipping `activeSlide`. `heroSlides` drives the slideshow, the right category rail AND the mobile pills — keep them in sync.
- Navbar is transparent (white text) over the hero and flips to solid white/dark text after scroll >60 (`scrolled` state in App.tsx). Persistent hero overlays must not clash with the scrolled navbar.

## GSAP conventions
- GSAP + ScrollTrigger registered once in App.tsx. Every component creates its own `gsap.context()` and reverts it on cleanup (pattern in App/Hero) — follow this to avoid leaks.
- React 18 `<StrictMode>` is on (main.tsx), so dev effects run twice — cleanup (ctx.revert / clearInterval / cancelAnimationFrame) is mandatory or timelines and intervals double-fire.
- Central scroll reveals via `data-reveal`, `data-reveal-left`, `data-reveal-right` attributes (handled in App.tsx). ScrollTrigger is used for pinned horizontal scroll, color-scroll scrub, paint-stroke draw.
- Respect `prefers-reduced-motion: reduce`: existing code checks `window.matchMedia('(prefers-reduced-motion: reduce)')` and skips animation; index.css also neutralises CSS animations.
- Lenis is a dependency but is NOT imported/used anywhere — don't assume smooth-scroll is active.

## Gotchas
- Working tree is dirty/uncommitted: `Hero.tsx`, `Navbar.tsx`, `PaintStudio.tsx`, `assets/` are untracked; `App.tsx`, `data.ts`, `index.css`, `index.html` are modified vs HEAD. Do not commit unless asked.
- `noUnusedLocals`/`noUnusedParameters` are false in tsconfig, so typecheck won't fail on unused vars — but eslint will.
- Custom cursor (App.tsx) reacts to `data-cursor` attributes and auto-disables on touch / ≤768px. Hero animations must be mouse-based only on desktop.
- The Google Fonts `@import` must stay the FIRST rule in `src/index.css` — any rule above it silently breaks font loading.
- `body::before` is a fixed film-grain overlay at `z-index: 200` (pointer-events: none) — it sits above the hero's `z-[80]` brand reveal, so grain shows over the intro.
- `dist/` is gitignored (but exists in the working dir); `index.html` references `/vite.svg` as favicon though no `public/` dir exists (it 404s — ignore).
