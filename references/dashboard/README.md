# Dashboard — local `:80` service

## Stack

SvelteKit 2 + Svelte 5 + Vite 6, `@sveltejs/adapter-node`, pnpm. Served by
`dashboard.service` on port 80; dev port 8123. Source:
`/home/admin/projects/dashboard`. No public hostname was found.

## V6 entry

**No package dependency.** All CSS is in one scoped `<style>` block in
`src/routes/+page.svelte:475-1371`. A comment at `:476-480` says the token
layer mirrors `@mcky/ui/v6.css` **0.3.0** and should be replaced by an import
once the package is added. `src/app.html` loads Google Fonts directly.

## Token overrides

`src/routes/+page.svelte:481-510` defines `:global(:root)` tokens with the
canonical 0.3.0 values (sky `#9dd2f7`, cream `#f8f6f0`, paper `#ffffff`, ink
`#111111`, yellow `#ffd21f`, blue `#4d83ff`, 20px/12px radii, 2.5px outline,
5px/3px shadows). Local-only extras: `--mcky-v6-sky-deep`,
`--mcky-v6-cream-deep`, `--mcky-v6-*-tint`, `--mcky-v6-rule`,
`--mcky-v6-shell-shadow`. Canonical 0.5.0 tokens such as `--success`,
`--on-accent`, `--overlay`, decoration tokens and scenery tokens are absent.

Sparkline colors are hardcoded (`rgba(77,131,255,…)`, `#4D83FF`, `#FFD21F`,
`#111111` around `:124-153`).

## Theme

Light-only. `app.html:6-7` hardcodes `color-scheme=light` and
`theme-color=#9DD2F7`; no `data-mode` / `data-v6-mode`, no toggle, no dark
ramp. Because the tokens are local `:global(:root)` declarations, shared dark
tokens would be overridden even if an attribute were set.

## Scenery

Flat sky plus a local radial dot grid on `.desk` (`:542-549`) and cream window
shell `.shell` (`:551-560`). No shared scenery element.

## Apply checklist

- Removing the frozen token block without adding `@mcky/ui/v6.css` breaks every
  color.
- Adding the import alone will not apply 0.5.0 values while the local
  `:global(:root)` block remains; migrate local-only names first.
- Do not make the shared theme auto-follow the OS for this app: it has no dark
  styles for its local tints/shadows.
- Geometry (22px-ish frames, 4-6px shadows) is duplicated literally across many
  classes; token changes need a coordinated edit.

## Verification

No test script. `pnpm build`, then `PORT=8123 node build/index.js` or restart
`dashboard.service`; check `curl http://127.0.0.1/api/stats` and the page at
`:80`.
