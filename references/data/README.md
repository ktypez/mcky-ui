# Data — `data.mcky.space`

## Stack

Vite 8 + Svelte 5 + TypeScript, Tailwind 4, Cloudflare D1/R2, Leaflet, Clerk.
Source: `/home/admin/projects/data-ledger`. Deploy is manual
(`npm run deploy` → `wrangler pages deploy ./dist --project-name data-mcky-space --branch main`).

## V6 entry

**None.** `src/index.css` imports `tailwindcss`, `@mcky/ui/core.css`,
`./styles/v5-tokens.css`, `./styles/v5-ui.css` and
`./styles/workspace-layout.css`. There are no V6 imports or `v6-*` tokens in
active code. Shared components are `@mcky/ui/button` and
`@mcky/ui/count-sticker` through local adapters.

Pin: `5a72d95` / 0.2.0, a pre-V6 package containing only `core.css`,
`tokens.css` and `v5-tokens.css`.

## Token overrides

Local `v5-tokens.css` aliases shared V5 tokens (`--background`, `--primary`,
`--border`, radius/font aliases). Canonical palette values (matcha `#158068`,
paper `#f6f2e9`, ink `#28251d`) come from the pinned shared `v5-tokens.css`.
`index.css` maps them into Tailwind `@theme inline`; `v5-ui.css`,
`workspace-layout.css` and `AppDialog.css` contain the visible skin.

## Theme

No V6 mode. `index.html:33-65` boots `data-theme`, `data-palette`
(matcha/coral/blueberry/butter), `data-mode`, `data-density`, `data-texture`
and `color-scheme` before paint; `app-theme.ts:162-212` mirrors and persists
those attributes and dispatches `app-theme-change`.

## Scenery

Dotted "ledger paper" backdrop from `body::before` in `v5-ui.css:19-30`, with a
`data-texture="off"` opt-out. No sky canvas, no clouds/meadow/stars/city.

## Apply checklist

- **Do not apply V6 here without an explicit migration.** `tests/v5-design-system.test.ts`
  forbids `v6-` naming in active layout, requires the `core.css` import and
  asserts the adapters contain no hardcoded palette hex.
- Changing shared V5 token values changes every palette here at once.
- Any new mode attribute must be added to the pre-paint boot in `index.html`
  *and* `app-theme.ts`, or the first paint flashes.
- npm is canonical despite the stale `pnpm-lock.yaml`; bump package and lock
  together.

## Verification

`npm run test:run`, `npm run lint`, `npm run build:full`, `npm run check:pwa`,
`node scripts/health-check.mjs`, `npm run measure:perf`. Deploy check compares
the built `index-*.js` hash with the custom domain.
