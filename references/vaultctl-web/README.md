# vaultctl web

## Stack

Svelte 5 + Vite SPA at `/home/admin/projects/vaultctl/vaultctl/web`, now using
`@mcky/ui`. Served by `vaultweb.service` via `serve.py` on
`http://192.168.1.47:8788` (LAN host required; loopback refuses). `serve.py`
serves `dist/` and proxies `/api/*`. CSP `default-src 'self'` is why fonts are
self-hosted.

The previously uncommitted V6 skin and untracked `public/fonts/` were preserved
as base commit `f88d88f` before the shared-scenery migration.

## V6 entry

`src/main.js` imports `@mcky/ui/v6-base.css` (font-free) before `./app.css`;
`src/app.css` now holds only vault-local aliases and component styles, with the
canonical token/theme definitions coming from the package. Pin: `d208f00` /
0.5.0 in `package.json` and `package-lock.json`. A web-local `.npmrc` with
`allow-remote=all` lets npm fetch the codeload tarball in this environment.

## Token overrides

Vault-local `--v6-*` aliases and the single blue accent remain in `app.css`,
but canonical `--mcky-v6-*` values now drive surfaces, outline, shadows and
accents, including the indigo/gold twilight night ramp. The single blue accent
is kept instead of adopting the full canonical accent family. Self-hosted fonts
and the `'self'` CSP are unchanged; no Google Fonts reference exists in built
CSS.

## Theme

`src/main.js` migrates legacy `localStorage['theme']` (light/dark) to
`mcky-v6-mode` on first load, applies `applyV6Mode()` and mirrors `theme-color`.
`App.svelte` uses `onV6ModeChange` / `toggleV6Mode` from `@mcky/ui/theme`;
the visible toggle text stays `Dark` / `Light` with Thai `aria-label` / `title`.
CSS reacts to `data-v6-mode`; the old `data-theme`-only rules are gone.

## Scenery

`<Scenery />` is mounted in `App.svelte`; the `.desk` UI is wrapped in
`.mcky-v6-scenery-content`. Sticky topbar z-index 100, modal 200 and toast 300
stay above the fixed z-index 0 backdrop. The old dotted canvas was removed;
markup stickers (`.auth-stamp`, `.seal-graphic`, etc.) remain.

## Apply checklist

- Never import `@mcky/ui/v6.css` here — it re-adds the blocked Google Fonts
  import. Always use `v6-base.css`.
- Migrate legacy `theme` users before removing the migration in `main.js`.
- Keep the content wrapper and the existing z-index ladder for topbar/modal/toast.
- `vaultweb.service` binds the LAN IP, not loopback.

## Verification

`npm ci && npm run build` in `vaultctl/web`, `systemctl is-active vaultweb.service`,
curl `/`, `/api/status` and fonts on `http://192.168.1.47:8788`. Browser: day
3 clouds / 3 ridges / 2 trees; night 12 stars / 10 buildings / 29 lit windows;
legacy `theme=dark` migrates correctly; overflowX=0 at 1440/1024/768/390; no
severe console errors; CSP and self-hosted fonts intact.

Applied in PR: https://github.com/ktypez/vaultctl/pull/3
