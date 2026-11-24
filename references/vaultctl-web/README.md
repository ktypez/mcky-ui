# vaultctl web

## Stack

Svelte 5 + Vite SPA at `/home/admin/projects/vaultctl/vaultctl/web`, no
`@mcky/ui` dependency. Served by `vaultweb.service` via `serve.py` on
`http://192.168.1.47:8788` (LAN host is required; loopback refuses). `serve.py`
serves `dist/` and same-origin proxies `/api/*`. CSP `default-src 'self'` is why
fonts are local.

**Important:** the V6 work in this checkout is still **uncommitted** (modified
`README.md`, `SPEC.md`, `index.html`, `src/App.svelte`, `src/app.css`, plus
untracked `public/fonts/`). Never overwrite it from a shared apply.

## V6 entry

`index.html:12` → `src/main.js:1-7` imports `./app.css` and mounts `App.svelte`.
`app.css` (877 lines) is a vendored V6 skin: header `:1-6`, 8 self-hosted
`@font-face` rules `:7-15`, token block `:17-61`, dark overrides `:63-86`,
body/dots `:88-102`, desk/shell `:106-124`, components `:125-841`, responsive
and reduced motion `:842-877`. `public/fonts/v6-fonts.css` is an unimported
duplicate artifact.

## Token overrides

`--v6-*` names plus `--sans` / `--mono` aliases (`app.css:18-53`), local-only
`--v6-cream-2`, `--v6-muted`, `--v6-faint`, `--v6-rule`, `*-tint`, and a single
blue accent `--acc:#1f4fd8` / `--acc-ink:#ffffff`. Canonical `--mcky-v6-subtle`,
`--on-accent`, `--overlay` and scenery tokens are absent.

Dark is the same charcoal ramp as mem (`#20252b` / `#242a30` / `#2e353c`),
`#ffd21f` yellow, `--acc:#9db9ff`, shadow `#0b0d10` (`:63-86`), not canonical
indigo/gold. Hardcoded `#111111`, `#0b0d10`, `rgb(17 17 17/.9)` remain in
selection, toasts, rows, modal backdrop and shell shadow.

## Theme

JS-driven: `theme = $state('light')` (`App.svelte:8`), `applyTheme()` sets
`data-theme` on `<html>` and persists to `localStorage['theme']` (`:56-60`),
`toggleTheme()` flips (`:61-63`), topbar button at `:263`. `onMount()` reads the
stored key else `matchMedia('(prefers-color-scheme: dark)')` (`:232-238`) —
first paint can flash for dark-OS visitors. CSS only reacts to
`html[data-theme='dark']`. No `data-mode` / `data-v6-mode`, no `mcky-v6-mode`.
`index.html:7` keeps a static `theme-color="#9dd2f7"`.

## Scenery

Static dotted canvas (`app.css:90-102`), `.desk` / `.shell` without positioning
(`:107-111`). Decorations are markup stickers (`.auth-stamp`, `.auth-floater`,
`.squiggle`, `.seal-graphic`, etc.). No shared scenery. A fixed layer would
cover `.desk` without `.mcky-v6-scenery-content`, and must coexist with sticky
topbar z-index 100, modal 200 and toast 300.

## Apply checklist

- Importing `v6.css` alone restyles nothing (token names differ) and re-adds the
  blocked Google Fonts import; keep self-hosted fonts.
- Canonical theme only reads `data-v6-mode` / `data-mode`; this app only writes
  `data-theme`. Adding the shared helper creates a second source of truth and
  changes the dark-OS default. Migrate both together.
- Reconcile charcoal literals and the single blue accent before adopting the
  indigo/night ramp; preserve the uncommitted V6 work and untracked fonts.
- Add the content z-index wrapper before any fixed scenery layer, and keep the
  existing Svelte transitions and reduced-motion rule (`:875-877`).
- `vaultweb.service` binds the LAN IP, not loopback.

## Verification

`npm ci && npm run build`, `systemctl is-active vaultweb.service`, then curl
`/`, `/api/status` and a font file on `http://192.168.1.47:8788`. Browser:
axe-core 0 violations, overflowX=0 at 1440/1024/768/390, 8 webfonts loaded.
