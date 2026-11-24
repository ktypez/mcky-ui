# Dashboard — local `:80` service

## Stack

SvelteKit 2 + Svelte 5 + Vite 6, `@sveltejs/adapter-node`, pnpm. Served by
`dashboard.service` on port 80; dev port 8123. Source:
`/home/admin/projects/dashboard`. No public hostname was found. **This directory
is not a git repo**, so changes there are not versioned.

## V6 entry

`package.json` now depends on `@mcky/ui` pinned to `d208f00` / 0.5.0.
`src/app.css` imports `@mcky/ui/v6-base.css` (font-free; `app.html` loads fonts
itself) and is loaded from the new `src/routes/+layout.svelte`. The frozen 0.3.0
`:global(:root)` token block was removed from `+page.svelte`.

## Token overrides

`src/app.css` keeps only local-only values, all derived from canonical tokens
with `color-mix()`: `--mcky-v6-sky-deep`, `--mcky-v6-cream-deep`,
`--mcky-v6-*-tint`, `--mcky-v6-rule`, `--mcky-v6-shadow-deep`,
`--mcky-v6-shell-shadow`. No duplicate canonical hex remains. Solid accent
surfaces use `--mcky-v6-on-accent`. Sparkline canvas colours are read from
computed canonical tokens at paint time.

## Theme

`+layout.svelte` mounts `<ModeToggle />` and calls `applyV6Mode()` /
`onV6ModeChange()` from `@mcky/ui/theme`; preference persists under
`mcky-v6-mode`. `theme-color` is mirrored from the computed
`--mcky-v6-sky` on mount (there is a brief pre-hydration gap in SSR HTML).
The canonical indigo/gold night ramp now applies to the whole dashboard.

## Scenery

`<Scenery />` is mounted in `+layout.svelte` with all page content inside
`.mcky-v6-scenery-content` (relative z-index 1). The sticky titlebar still
sticks after scrolling; the fixed backdrop is z-index 0. The old flat sky and
radial dot grid were removed.

## Apply checklist

- Always edit `src/app.css` for local-only tokens; do not reintroduce canonical
  hex values into `+page.svelte`.
- Keep the content wrapper in the layout — without it the opaque sky covers the
  dashboard.
- The local favicon silences a pre-existing `/favicon.ico` 404.
- `dashboard.service` was not restarted by the apply; restart it to serve the
  fresh build.

## Verification

`pnpm install --frozen-lockfile`, `pnpm build` (no `check` script;
`pnpm exec tsc --noEmit` has pre-existing unrelated route errors). Browser check
against `PORT=8123 node build/index.js`: day 3 clouds / 3 ridges / 2 trees;
night 12 stars / 10 buildings / 29 lit windows; min text contrast 6.95:1 day /
6.68:1 night; no overflow at 1440/390; no console errors; toggle persists.
