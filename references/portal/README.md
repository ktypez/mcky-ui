# Portal — `me.mcky.space`

## Stack

Vite 8 + Svelte 5 + TypeScript 6, `phosphor-svelte`, ClerkJS Core. Cloudflare
Pages project `user-portal-git` auto-deploys `main`.
Source: `/home/admin/projects/portal`.

## V6 entry

`/home/admin/projects/portal/src/main.ts` imports `@mcky/ui/v6.css`, then
self-hosted `@fontsource` faces, then `./styles/v6-tokens.css`,
`./styles/v6-ui.css` and `./styles/portal.css`. Shared components come from
`@mcky/ui/button` and `@mcky/ui/motion`.

`package.json` pins `https://codeload.github.com/ktypez/mcky-ui/tar.gz/813eca1`
(0.4.0). The 0.5.0 additions in this library are **not** in that pin yet.
Never reintroduce the Google Fonts `@import` from `v6.css`: Portal self-hosts
fonts on purpose.

## Token overrides

`src/styles/v6-tokens.css` is a compatibility adapter. Day aliases include
`--paper: var(--mcky-v6-cream)` (cream, not canonical white), `--paper-2:
#f1ede2`, `--rule` / `--rule-2` ink alphas, radii `--r2: 12px`, `--r3: 18px`,
`--r4: 22px`, and `--on-accent: #111111`.

The night block is keyed on `:root[data-portal-mode='night']` and duplicates the
canonical 0.5.0 twilight ramp: `#1b2440` / `#263354` / `#314066`, ink
`#f4f1e8`, gold `#ffd84d`, outline `#b9c8ea`, shadows `#101a30`, plus tile
tints and `--on-accent: #1b2440`. `src/styles/portal.css` overrides the modal
overlay for night and keeps `#app { position: relative; z-index: 1 }`.

## Theme

Local store in `src/lib/theme.ts`: `day | night`, key `portal-mode`, applied as
`data-portal-mode` on `<html>` plus inline `color-scheme`. `main.ts` paints the
mode before mount and subscribes. `src/components/ModeToggle.svelte` (Phosphor
`Moon` / `Sun`, 18px bold, Thai labels) is the only control.

No OS auto-follow, no `data-v6-mode`, no `mcky-v6-mode` key. Migrating to the
shared helper must migrate both the attribute and the stored key, or night mode
silently disappears.

## Scenery

`src/components/PortalScenery.svelte`, mounted once as a fixed sibling before
`#app` in `main.ts`. Day = three painted clouds, diffused sun, three ridges,
two trees, textured meadow; night = 12 breathing stars, soft crescent, six hazy
back buildings, 10 foreground buildings / 29 lit windows.
Snapshots of this component, the toggle and the night tokens are in this
directory; the shared `Scenery` / `ModeToggle` were ported from them.

## Apply checklist

- Bump the pin deliberately, then decide whether to keep the local night block
  or alias it to the canonical ramp; both currently carry the same hex values.
- Keep `data-portal-mode` and `portal-mode` unless a storage migration ships.
- Keep `#app` at z-index 1; the shared scenery is fixed at z-index 0.
- Do not import `src/styles/v3.css` or the V5 adapters — `test/v6-design-system.test.mjs`
  asserts they stay out and `.seg { width: 100% !important }` would fight V6.
- `index.html` still has static `theme-color="#9DD2F7"` and
  `color-scheme="light"`; update them with any theme change.
- `test/night-contrast.test.mjs` parses exact hex declarations and exact CSS
  strings; reformatting the block breaks the test even without a visual bug.

## Verification

`npm run check`, `npm test`, `npm run typecheck:functions`, `npm run build`,
`npm run audit:runtime`. Browser checks at 1440px/390px in both modes: no
console errors, zero horizontal overflow, card outline and gold CTA contrast.

Snapshot files: [scenery.snapshot.svelte](./scenery.snapshot.svelte),
[mode-toggle.snapshot.svelte](./mode-toggle.snapshot.svelte),
[v6-tokens.snapshot.css](./v6-tokens.snapshot.css).
