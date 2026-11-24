# Truck — `truck.mcky.space`

## Stack

npm workspaces; frontend `@truck/web-svelte` is Svelte 5 + Vite 8 + TypeScript
with svelte-spa-router. API is Elysia on Cloudflare Workers.
Source: `/home/admin/projects/truck`.

## V6 entry

`apps/web-svelte/src/themes/loader.ts` imports `@mcky/ui/core.css` first, then
bundles theme stylesheets including `./v6.css` and `./ledger.css`.
`apps/web-svelte/src/themes/v6.css` imports only `@mcky/ui/v6-theme.css` and
`@mcky/ui/v6-motion.css` — never `v6.css`, because `vercel.json` allows
`font-src 'self'` only. Shared `Button` is used in `ConfirmModal.svelte` and
`UpdatePrompt.svelte`.

Pin: `d208f00` / 0.5.0 (merged PR #21, font-free `v6-base.css` entry available).
Keep `core.css` **before** `ledger.css` — the cascade verifier depends on it.

## Token overrides

`apps/web-svelte/src/themes/v6.css:81-117` duplicates the canonical day ramp
under `:root[data-theme='v6']:not([data-v6-mode='dark']):not([data-mode='dark'])`
and its own decoration/scenery tokens. Semantic aliases (`--bg`, `--primary`,
`--surface`, `--border`, fonts, radius) live at `:119-162`. Changing canonical
`--mcky-v6-*` values does **not** reach Truck until this local block is updated.

`design-tokens.css` keeps indigo V5 fallbacks and a `--ui-scale: 0.9`
`#root` transform; fixed scenery geometry is sensitive to that scale.

## Theme

V6 is the default theme. `public/theme-boot.js` sets `data-theme`, `data-mode`,
`data-palette`, `data-density` and mirrors `data-v6-mode` before paint;
`App.svelte` keeps them in sync at runtime. 14 legacy themes and the LEDGER V5
option remain selectable, so do not assume a single mode or token namespace.

## Scenery

The local emoji-era `PortalScenery.svelte` was removed. `App.svelte` now renders
`<Scenery mode={mode === 'dark' ? 'night' : 'day'} />` from `@mcky/ui/scenery`
in the V6-only slot; `.app-shell` carries `mcky-v6-scenery-content` and the
bottom nav stays above the backdrop. `Scenery.test.ts` plus `loader.test.ts`
assert the painted markers (puff/cloud-drift, star-breathe, ridge, meadow,
city-back, lit windows) and the no-`fonts.googleapis.com` invariant.

## Apply checklist

- Preserve the `data-v6-mode` / `data-mode` exclusion selector in the local day
  ramp; without it the duplicate day tokens beat the shared dark ramp.
- Keep the exact import strings asserted in `themes/loader.test.ts`.
- Keep `npm run theme:generate` and `npm run verify:ledger` working; the
  verifier hardcodes V5 hex expectations and cascade order.
- Remember the `#root` transform when checking fixed-position scenery.

## Verification

`npm test` (root Vitest), `npm run build`, `npm run typecheck`,
`npm run theme:generate --workspace @truck/web-svelte`,
`npm run verify:ledger --workspace @truck/web-svelte`. Browser check in V6 and
LEDGER, light and dark: 3 clouds / 3 ridges by day, 12 stars / 10 buildings /
29 lit windows by night, no overflow or console errors.

Applied in PR: https://github.com/ktypez/truck/pull/42
