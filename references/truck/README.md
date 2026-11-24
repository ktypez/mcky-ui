# Truck — `truck.mcky.space`

## Stack

npm workspaces; frontend `@truck/web-svelte` is Svelte 5 + Vite 8 + TypeScript
with svelte-spa-router. API is Elysia on Cloudflare Workers.
Source: `/home/admin/projects/truck`.

## V6 entry

`apps/web-svelte/src/themes/loader.ts` imports `@mcky/ui/core.css` first, then
bundles theme stylesheets including `./v6.css` and `./ledger.css`.
`apps/web-svelte/src/themes/v6.css` imports `@mcky/ui/v6-theme.css` and
`@mcky/ui/v6-motion.css`; the old `@mcky/ui/v6-scenery.css` import was removed
because the app renders a local scenery component. Shared `Button` is used in
`ConfirmModal.svelte` and `UpdatePrompt.svelte`.

Pin (as observed 2026-11-24): `71827ea` / 0.5.0. Keep `core.css` **before**
`ledger.css` — the cascade verifier depends on it.

## Token overrides

`apps/web-svelte/src/themes/v6.css:81-117` duplicates the canonical day ramp
under `:root[data-theme='v6']:not([data-v6-mode='dark']):not([data-mode='dark'])`
and its own decoration/scenery tokens. Semantic aliases (`--bg`, `--primary`,
`--surface`, `--border`, fonts, radius) live at `:119-162`. Changing canonical
`--mcky-v6-*` values does **not** reach Truck until this local block is updated.

`design-tokens.css` keeps indigo V5 fallbacks and a `--ui-scale: 0.9`
`#root` transform; fixed scenery/overlay geometry is sensitive to that scale.

## Theme

V6 is the default theme (`loader.ts:83-101`). `public/theme-boot.js` sets
`data-theme`, `data-mode`, `data-palette`, `data-density` and mirrors
`data-v6-mode` before paint; `App.svelte:56-77` keeps them in sync at runtime.
14 legacy themes and the LEDGER V5 option remain selectable, so do not assume a
single mode or a single token namespace.

## Scenery

`apps/web-svelte/src/components/PortalScenery.svelte` is a local port of the
Portal view, mounted from `App.svelte:230-234` only when V6 is active;
`.app-shell` carries `mcky-v6-scenery-content`. Its styles consume local
scenery tokens at lines ~157-271. Swapping to the shared `<Scenery />` requires
keeping those token names or updating both files together.

## Apply checklist

- Preserve the `data-v6-mode` / `data-mode` exclusion selector in the local day
  ramp; without it the duplicate day tokens beat the shared dark ramp.
- Keep the exact import strings asserted in `themes/loader.test.ts` and the
  markup assertions in `PortalScenery.test.ts`.
- Keep `npm run theme:generate` and `npm run verify:ledger` working; the
  verifier hardcodes V5 hex expectations and cascade order.
- Remember the `#root` transform when checking fixed-position scenery.

## Verification

`npm test` (Vitest via root), `npm run build` (svelte-check + Vite),
`npm run typecheck`, `npm run theme:generate`, `npm run verify:ledger`.
Browser check `https://truck.mcky.space` in V6 and LEDGER, light and dark.
