# mcky-ui

Shared UI foundation for the mcky.space application family.

- **V5 Paper Pop** remains available and unchanged through `@mcky/ui/core.css` and the existing Svelte component exports.
- **V6 Work Shell** is introduced as an opt-in foundation through `@mcky/ui/v6.css` (package version 0.3.0). It provides the sky-blue / warm-cream / yellow palette, Space Grotesk / Sarabun / DM Mono typography, ink outlines, rounded surfaces, and hard offset shadows.

## Install

```bash
npm install @mcky/ui svelte
```

## V5

Import the existing V5 foundation:

```css
@import '@mcky/ui/core.css';
```

Existing Svelte components remain available from `@mcky/ui/svelte`.

## V6 Work Shell

Import the new V6 tokens and primitive classes:

```css
@import '@mcky/ui/v6.css';
```

Available tokens include:

- `--mcky-v6-sky`, `--mcky-v6-cream`, `--mcky-v6-paper`, `--mcky-v6-ink`
- `--mcky-v6-yellow`, `--mcky-v6-blue`, `--mcky-v6-purple`, `--mcky-v6-orange`, `--mcky-v6-red`
- `--mcky-v6-font-display`, `--mcky-v6-font-body`, `--mcky-v6-font-mono`
- `--mcky-v6-radius`, `--mcky-v6-outline`, `--mcky-v6-shadow`

Primitive classes: `.mcky-v6-shell`, `.mcky-v6-frame`, `.mcky-v6-card`, `.mcky-v6-button`, and `.mcky-v6-label`.

V6 is opt-in and does not change existing V5 consumers. The consuming application owns theme persistence, routing, authentication, and application-specific behavior.

## Development and verification

```bash
npm ci
npm run check
npm test
npm run build
npm run build:playground
npm run audit:runtime
```

See [DESIGN.md](./DESIGN.md) for design-system details and [SECURITY.md](./SECURITY.md) for dependency advisory notes.
