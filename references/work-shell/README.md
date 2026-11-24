# Work Shell — `work.mcky.space`

## Stack

Svelte 5 + Vite + TypeScript, `@lucide/svelte`, Cloudflare Pages Functions.
Primary deploy is Pages `work-shell` from `main`; Vercel config is an alternate
path. Source: `/home/admin/projects/work-shell`.

## V6 entry

`src/app.css:1` imports `@mcky/ui/v6.css`; `src/main.ts` imports `app.css` before
`App.svelte`. No JavaScript imports from `@mcky/ui`.
Pin: `c7a3561` / 0.3.0 — no motion layer, no theme ramp, no scenery component.

## Token overrides

`app.css:2` aliases `--sky`, `--cream`, `--ink`, `--yellow`, `--blue` but
hardcodes light `color: #111` / `background: #f8f6f0`. Most surfaces in
`app.css:3-61` are literal `#fff`, `#111`, `#666`, `#777` with 2px borders,
11-22px radii and 2-6px shadows. Local single-class selectors
(`.platform`, `.workspace-frame`, `.app-card`, `.primary-button`) override the
canonical primitives because the V6 import comes first.

## Theme

None. No local storage, no `data-mode` / `data-v6-mode`, no toggle.
`index.html:6` and `App.svelte:287` hardcode `theme-color="#9dd2f7"`.

## Scenery

None. `.platform { background: var(--cream) }` replaces the sky canvas; local
orbit/spark markup decorates the hero. `#app` has no positioning or z-index, so
dropping in a fixed scenery layer would layer incorrectly.

## Apply checklist

- Tokenising the literal colors is a prerequisite for dark mode; setting the
  attribute alone gives a dark canvas with white panels and black text.
- Import order matters: moving canonical CSS after `app.css` flattens the
  deliberate 22px frames, 15px cards and 4-6px shadows.
- Fonts currently rely on the Google Fonts import in 0.3.0 `v6.css` and CSP
  allowlists (`vercel.json:12`, `public/_headers:5`). Self-hosting requires
  updating both.
- Validate the Pages `dist` build, not only the Vite dev proxy.
- Work Shell is the origin of V6, but it still renders the older literal-color
  version — do not assume current shared CSS matches `work.mcky.space`.

## Verification

`npm run build` (`check` + `check:functions` + Vite), `npm run check`,
`npm run check:functions`. No test script exists; browser-check the Pages
deployment.
