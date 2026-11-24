# mem wiki web

## Stack

One Go raw-string HTML page (`ui.go`) with no build step, served by the mem wiki
service on `http://127.0.0.1:3200`. Fonts are `go:embed` woff2 subsets served
from `/ui/fonts/` by `fonts.go`; `auth.go` supplies the CSP.
Source: `/home/admin/projects/mem`.

## V6 entry

No npm dependency and no `@mcky/ui` import — the V6 visual language is
hand-written inside the HTML string. `ui.go:38+` defines `--v6-sky:#9dd2f7`,
`--v6-cream:#f8f6f0`, `--v6-paper:#ffffff`, `--v6-cream-2:#efece2`, ink
outlines and hard offset shadows. `auth.go:177` includes `font-src 'self'` so
the embedded Space Grotesk / Sarabun / DM Mono faces load.

## Token overrides

`--v6-*` names are local aliases, not the canonical `--mcky-v6-*` names. Four
accent palettes (blue default, purple `#b6a4ff`, orange `#ffab6b`, yellow
`#ffe27a`) are selected with `data-palette` at `ui.go:67-69`. Local extras such
as `--v6-cream-2` and the shell shadow `8px 8px 0 #0b0d10` (`ui.go:123`) do not
exist in canonical V6.

## Theme

`data-mode="auto"` on `<html>` (`ui.go:19`) plus palette choice; the palette is
persisted as `mem-palette` in `localStorage` (`ui.go:416`). There is no
`data-v6-mode`, no `mcky-v6-mode` key and no shared helper. Any new mode
attribute must be handled inside the Go template, not just in CSS.

## Scenery

Flat sky with a local dotted-paper radial gradient (`ui.go:80`) and a cream
window shell. No `<Scenery />` element, clouds, meadow or night skyline.

## Apply checklist

- Because the whole UI is one HTML string, there is no import to bump; copying
  canonical tokens requires editing the string and recompiling Go.
- Keep the embedded fonts and `font-src 'self'` — a CDN `@import` from `v6.css`
  would be blocked by the CSP.
- Keep the four `data-palette` variants working; they are user-visible settings.
- A shared auto-dark rule must not silently override `data-mode="auto"`.

## Verification

Live checks on `127.0.0.1:3200`, previously: axe-core 0 violations and zero
horizontal overflow at 1440/1024/768/390, internal pane scrolling intact, no
console errors, 8 webfonts loaded. `go test ./...` for the service.
