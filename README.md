# mcky-ui

Shared UI foundation for the mcky.space application family.

- **V5 Paper Pop** remains available and unchanged through `@mcky/ui/core.css` and the existing Svelte component exports.
- **V6 Work Shell** is introduced as an opt-in foundation through `@mcky/ui/v6.css`. It provides the sky-blue / warm-cream / yellow palette, Space Grotesk / Sarabun / DM Mono typography, ink outlines, rounded surfaces, hard offset shadows, the motion/decoration layer (0.4.0), and light/dark themes with an animated day/night backdrop (0.5.0).

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

### V6 motion, decoration & transitions

`v6.css` also imports the V6 motion layer. It ships the Attendance-Terminal
motion language: drifting clouds, twinkling sparkles, dashed orbit rings,
dotted paper, accent strips, ink rules, live dots, loading bars, shimmer,
toasts, staged entrances and confetti.

- Transitions: `.mcky-v6-lift`, `.mcky-v6-tilt`, `.mcky-v6-press`
- Decoration: `.mcky-v6-canvas`, `.mcky-v6-dotted`, `.mcky-v6-rule`,
  `.mcky-v6-strip`, `.mcky-v6-dot-live`, `.mcky-v6-spark`, `.mcky-v6-orbit`,
  `.mcky-v6-float`, `.mcky-v6-bob`, `.mcky-v6-loading-bar`, `.mcky-v6-shimmer`
- One-shot: `.mcky-v6-enter`, `.mcky-v6-enter-pop`, `.mcky-v6-stagger`,
  `.mcky-v6-toast`, `.mcky-v6-overlay`
- Scripted helpers: `import { burstConfetti, withoutTransitions } from '@mcky/ui/motion'`

Motion is opt-in per class and every movement is neutralised under
`prefers-reduced-motion: reduce`. See [V6.md](./V6.md) for the full spec.

### V6 light/dark and scenery

V6 stays light until an app opts in. Set `data-v6-mode="dark"` on `<html>` (or
use the V5-compatible `data-mode="dark"`), or let the helper resolve `auto`
from the OS and persist the choice:

```ts
import { applyV6Mode, setV6Mode } from '@mcky/ui/theme';
applyV6Mode();                 // resolves the stored preference (default: auto)
setV6Mode('dark');             // persists to localStorage as mcky-v6-mode
```

For Svelte apps, `<ModeToggle />` from `@mcky/ui/mode-toggle` is a ready-made
accessible button. The night palette is its own twilight ramp, not an inversion
of day: indigo surfaces, warm white ink and gold accents with AA contrast.

Render the shared `<Scenery />` component once as a sibling of the app root:

```svelte
<script>
  import Scenery from '@mcky/ui/scenery';
</script>

<Scenery />
<main class="mcky-v6-scenery-content">…</main>
```

It is the same view the Portal uses: day paints Attendance-style ☁️ clouds over
hills, trees and a meadow; night paints 12 twinkling stars, a crescent moon and
a lit city skyline. Pass `mode="dark"` to pin a view, or let it follow the shared
V6 mode. Every loop stops under `prefers-reduced-motion: reduce`.

Before applying V6 changes to a consumer app, check [`references/`](./references/README.md)
for that app's pin, local overrides, theme key and apply checklist. V6 is opt-in
and does not change existing V5 consumers. The consuming application owns theme
persistence, routing, authentication, and application-specific behavior.

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
