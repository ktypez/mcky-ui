# vaultctl web

## Stack

Svelte 5 + Vite SPA at `/home/admin/projects/vaultctl/vaultctl/web`, served by
`vaultweb.service` on `192.168.1.47:8788` through `serve.py`. The CSP is
`default-src 'self'`, so webfonts must be local.
Source: `/home/admin/projects/vaultctl/vaultctl/web`.

## V6 entry

`src/app.css` was rewritten to V6 tokens: sky `#9DD2F7` dotted canvas, cream
`#F8F6F0` window shell, 2.5px ink outlines, 5px/3px hard shadows, 20px radius
and yellow `#FFD21F` CTAs. `src/App.svelte` wraps the UI in `.desk > .shell` with
window dots. No `@mcky/ui` npm pin is involved; the token layer is local.

## Token overrides

The app uses a **palette-free single blue accent** instead of the full V6 accent
family. Space Grotesk / Sarabun / DM Mono are self-hosted under `public/fonts/`
because the CSP blocks font CDNs. Colors and geometry are duplicated in
`app.css`, so canonical token changes do not propagate automatically.

## Theme

The UI has its own light/dark toggle in `App.svelte` with local persistence.
There is no `data-v6-mode` / `mcky-v6-mode` key. Migrating to the shared helper
must preserve the user's stored preference and the toggle label.

## Scenery

Dotted sky canvas and window shell only; no shared `<Scenery />` component, no
clouds/meadow/stars/city.

## Apply checklist

- Keep the self-hosted fonts and `'self'` CSP; never reintroduce the Google
  Fonts `@import` from canonical `v6.css`.
- Tokenise the local blue-accent overrides before switching to canonical
  accent tokens, or the palette-free look is lost.
- Preserve the existing dark preference when introducing `data-v6-mode`.

## Verification

Previously verified live at `192.168.1.47:8788`: axe-core 0 violations, zero
horizontal overflow at 1440/1024/768/390, 8 webfonts loaded. Re-run the SPA
check/build and a browser pass after any token change.
