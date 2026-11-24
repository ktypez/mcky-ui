# mem wiki web

## Stack

One Go binary, no frontend build step. The whole page is the raw-string
`uiHTML` in `/home/admin/projects/mem/ui.go`, served with nonce substitution by
`handleUI()`. `http://127.0.0.1:3200` via the **system** unit `memory.service`
(optional plaintext LAN forward on `192.168.1.47:3200` via `mem-lan.socket`).
Source: `/home/admin/projects/mem`.

## V6 entry

No npm dependency — the painted scenery and canonical token values were
hand-ported into the Go HTML string. The source comment cites mcky-ui
`d208f00` / 0.5.0. Fonts are `go:embed` woff2 subsets served at `/ui/fonts/`.
CSP in `auth.go` remains `default-src 'none'`, `font-src 'self'`, nonce-gated
scripts; there is no Google Fonts import.

## Token overrides

Canonical `--mcky-v6-*` values are used, with local aliases where the raw HTML
needs them. Four user-selectable palettes remain (blue/purple/orange/yellow,
persisted as `mem-palette`). The old neutral charcoal dark ramp
(`#20252b` / `#242a30` / `#2e353c`) was replaced by the canonical twilight
indigo/gold ramp (`#1b2440` / `#263354` / `#314066`, ink `#f4f1e8`, gold
`#ffd84d`).

## Theme

The header has a three-state toggle `auto → light → dark` using nonce-gated
inline JS and a small pre-paint script to avoid a flash. It persists `mem-mode`
and sets `data-mode` plus mirrored `data-v6-mode` on `<html>` and updates
`theme-color`. `auto` still follows `prefers-color-scheme: dark`. `mem-palette`
remains a separate persisted setting; both survive reload.

## Scenery

The shared `<Scenery />` cannot be consumed by a Go binary, so its markup, CSS,
positions, sizes and animation delays were ported verbatim into the raw string
under `.mcky-v6-scenery` (fixed z-index 0, pointer-events none). All UI markup
now sits inside `.mcky-v6-scenery-content`. Day: 3 shaded clouds, diffused sun,
3 ridges, 2 trees. Night: 12 breathing stars, haloed crescent, 6 hazy back
buildings, 10 buildings / 29 lit windows, horizon glow. Reduced motion disables
both loops. The old dotted body canvas was removed because the painted sky is
opaque. Svelte-scoped selectors became rules nested under `.mcky-v6-scenery`.

## Apply checklist

- Keep embedded fonts and `font-src 'self'`; never paste `v6.css`'s Google
  Fonts `@import` into the raw string.
- When the shared scenery changes, port the data arrays and keyframes again —
  there is no import to bump here.
- Preserve all four palette buttons, `mem-palette`, the nonce-gated scripts and
  the Basic auth/CSP setup.
- Watch generic global selectors (`.list`, `.item`, `.count`, `.actions`) when
  pasting styles; Svelte scoping does not protect this app.

## Verification

`gofmt -w ui.go`, `go test ./...`, `go build ./...`, `git diff --check`,
`systemctl is-active memory.service`, `curl -fsS http://127.0.0.1:3200/health`.
Browser: day 3 clouds / 3 ridges / 2 trees, night 12 stars / 6 back buildings /
10 buildings / 29 lit windows; toggle and four palettes persist; reduced motion
stops animation; overflowX=0 at 1440/1024/768/390; no console errors; embedded
fonts load.

Applied in PR: https://github.com/ktypez/mem/pull/4
