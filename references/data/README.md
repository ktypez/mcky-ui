# Data — `data.mcky.space`

## Stack

Vite 8 + Svelte 5 + TypeScript, Tailwind 4, Cloudflare D1/R2, Leaflet, Clerk.
Source: `/home/admin/projects/data-ledger`. Deploy is manual
(`npm run deploy` → `wrangler pages deploy ./dist --project-name data-mcky-space --branch main`).

## V6 entry

Fully migrated to V6 in PR #56. `src/index.css` imports `tailwindcss`,
`@mcky/ui/core.css` (for shared V5 component adapters) and `@mcky/ui/v6-base.css`
(font-free canonical tokens), followed by `./styles/v6-tokens.css`,
`./styles/v5-ui.css` and `./styles/workspace-layout.css`. Google Fonts links were
removed in favour of the V6 stack. Shared components are `@mcky/ui/button`,
`@mcky/ui/count-sticker` and `@mcky/ui/mode-toggle`.

Pin: `d208f00` / 0.5.0 in `package.json`, `package-lock.json` and
`pnpm-lock.yaml`. npm is canonical despite the stale pnpm lock; bump both.

## Token overrides

`src/styles/v6-tokens.css` aliases the app's semantic names (`--paper`, `--ink`,
`--acc`, `--rule`, `--card`, tint/credit/penpay accents) onto canonical
`--mcky-v6-*` tokens, so the existing component CSS keeps working while the
twilight ramp owns dark mode. `index.css` still maps them into Tailwind
`@theme inline`. `v5-tokens.css` remains only as a compatibility alias.

## Theme

`data-ledger-mode` is still the canonical persisted key (including `auto`);
`data-v6-mode` is mirrored on `<html>` in the pre-paint `index.html` boot and in
`app-theme.ts`. TopBar uses the shared Thai-labelled `ModeToggle`; the shared
`mcky-v6-mode` key is intentionally removed after each toggle so there is only
one source of truth. Settings still supports `auto`.

## Scenery

`<Scenery />` is mounted once in `src/App.svelte`; routed content sits inside
`.mcky-v6-scenery-content` and `<main>` remains the scroller. The old dotted
ledger-paper `body::before` backdrop is gone. Palette switching and routing were
verified with the backdrop present.

## Apply checklist

- `tests/v6-design-system.test.ts` asserts the V6 import, token aliases, scenery
  mount and content wrapper. `tests/v5-design-system.test.ts` was rewritten to
  enforce the V6 contracts; keep both passing rather than deleting coverage.
- Any new mode attribute must be added to the pre-paint boot in `index.html`
  *and* `app-theme.ts`, or the first paint flashes.
- Keep the shared key out of storage — `data-ledger-mode` stays canonical.
- `scripts/health-check.mjs` now contains the CDP browser check plus a curl
  fallback; run it after any token or theme change.

## Verification

`npm run test:run` (144 tests), `npm run lint`, `npm run build:full`,
`npm run check:pwa`, `node scripts/health-check.mjs`, `npm run measure:perf`.
Health check covers day 3 clouds / 3 ridges, night 12 stars / 10 buildings /
29 lit windows, zero console errors, zero overflow at 1440/390, palette and
routing behavior.

Applied in PR: https://github.com/ktypez/data.mcky.space/pull/56
