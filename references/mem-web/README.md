# mem wiki web

## Stack

One Go binary, no frontend build step. The whole page is the raw-string
`uiHTML` in `/home/admin/projects/mem/ui.go:9-454`, served with nonce
substitution by `handleUI()` (`:456-463`). Loopback
`http://127.0.0.1:3200` via user service `memory.service`; optional plaintext
LAN forward on `192.168.1.47:3200` via `mem-lan.socket` / `mem-lan.service`.
Source: `/home/admin/projects/mem`.

## V6 entry

No npm dependency, no `@mcky/ui` import, no pin. Tokens are hand-copied into
`ui.go:36-56` under `--v6-*` names. Fonts are `go:embed`-ed woff2 subsets
(`fonts.go:10-33`, `fonts/*.woff2`, 8 files ~114 KiB), served at `/ui/fonts/`
and declared with `@font-face` at `ui.go:26-34`. CSP in `auth.go:171-181` is
`default-src 'none'`, `font-src 'self'`, nonce-gated scripts; UI and fonts are
behind HTTP Basic auth (`auth.go:119-130`).

## Token overrides

Renamed `--v6-*` tokens plus local-only `--v6-cream-2:#efece2`, `--v6-muted`,
`--v6-faint`, `--v6-rule`, `*-tint`, `--acc*`, `--danger` (`ui.go:38-52`).
Four user-selectable palettes: blue `#1f4fd8`, purple `#5a45c9`, orange
`#b3540a`, yellow `#8a6100`, with dark variants (`:51-56`, `:67-69`).

Dark is **neutral charcoal**, not canonical indigo: `#20252b` / `#242a30` /
`#2e353c`, yellow stays `#ffd21f`, shadow `#0b0d10`, `--acc-ink:#111111`
(`:59-65`). Hardcoded `#111111` / `#0b0d10` survives in selection, toast and
dialog styles (`:82`, `:120-123`, `:220-227`).

## Theme

`<html lang="th" data-palette="blue" data-mode="auto">` is hardcoded at
`ui.go:19`. Dark follows the OS purely via `@media (prefers-color-scheme: dark)`
scoped to `:root[data-mode="auto"]` (`:57-70`); there is no toggle and no JS
writes `data-mode`. The only persisted key is **`mem-palette`** (accent choice,
`:416-417`, `:445-449`). No `data-v6-mode`, no `mcky-v6-mode`.

## Scenery

Static dotted canvas only: 24px radial dot grid on `body` with dark variant
(`ui.go:73-81`). No clouds, meadow, stars, moon or skyline. `.desk` / `.shell`
have no positioning, so a fixed scenery layer would cover them unless content
gets `.mcky-v6-scenery-content`; check scrim/sidebar z-index 29/30 and
`body { overflow: hidden; height: 100dvh }`.

## Apply checklist

- Do not paste `v6.css` verbatim: its Google Fonts `@import` is blocked by the
  CSP. Keep embedded fonts and `font-src 'self'`.
- A token alias layer is required; `--mcky-v6-*` alone recolors nothing.
- Shared dark tokens would not react to `data-mode="auto"` media queries; dark-OS
  users would silently flip to light. Migrate the mode mechanism deliberately.
- Maintain all four palette buttons; canonical V6 has no palette concept.
- Keep the existing reduced-motion kill switch (`ui.go:250`) if adding loops.
- Generic global classes (`.list`, `.item`, `.count`, `.actions`) can collide
  with wholesale CSS pastes; Svelte scoping does not protect this app.

## Verification

`systemctl --user is-active memory.service`, `curl -fsS http://127.0.0.1:3200/health`,
font URL returns 200 with Basic auth / 401 without, `go test ./...`,
`go build ./...`. Browser: axe-core 0 violations, overflowX=0 at
1440/1024/768/390, 8 webfonts loaded, internal pane scrolling intact, 0 console
errors.
