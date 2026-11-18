# V5 Paper Pop — Design Specification

mcky-ui is the shared V5 design system for the mcky.space ecosystem. V5 is the active target. Do not introduce V6 styling, layouts, or tokens in this package.

## Visual language

- Warm paper canvas (`--paper`) with a subtle dotted-paper texture; texture can be disabled with `data-texture="off"`.
- Confident ink, warm card surfaces, fine paper rules, playful accent color, sticker borders, and offset hard shadows.
- Four palettes: `matcha` (default), `coral`, `blueberry`, and `butter`.
- Light and chalk-night dark modes, with the same semantic token names.
- Sora + Noto Sans Thai for UI; JetBrains Mono for technical labels and numeric data.
- Pill-shaped actions and chips; card radius 20px; sticker radius 14px; 1.5px ink outlines.
- Small, purposeful hover/press movement. Respect `prefers-reduced-motion`.

## Theme contract

Set these attributes on the root element:

```html
<html data-palette="matcha" data-mode="light" data-density="cozy" data-texture="on">
```

- `data-palette`: `matcha` | `coral` | `blueberry` | `butter`
- `data-mode`: `light` | `dark` (also supports `.dark` and `data-theme="dark"`)
- `data-density`: `cozy` | `compact`
- `data-texture`: `on` | `off`

The theme can be changed at runtime by updating these attributes. Applications own persistence; mcky-ui does not write to localStorage or own application state.

## Package architecture

- `src/styles/v5-tokens.css`: canonical V5 semantic tokens and palette definitions.
- `src/styles/tokens.css`: compatibility entry for token-only imports.
- `src/styles/core.css`: reset, dotted paper canvas, shared primitives, focus and reduced-motion rules.
- `src/lib/components`: Svelte 5 components; no app data, auth, routing, or API calls.
- `playground/Playground.svelte`: responsive V5 reference surface and component catalogue.

## Component principles

- Native HTML semantics and keyboard behavior.
- Minimum 44px interactive targets for primary controls.
- Visible focus states and accessible labels.
- Svelte 5 runes and typed props; controlled state remains with the consuming application.
- Styling comes from shared V5 tokens and classes, not duplicated per-app palettes.

## Navigation and layout reference

V5 navigation is horizontal and top-aligned. Desktop uses a top bar with brand on the left, centered pill navigation, and theme/account actions on the right. Mobile keeps the top bar and places a horizontally scrollable pill navigation row immediately below it. There is no left navigation rail and no bottom navigation in the V5 reference shell. Content uses the available width rather than reserving sidebar space.

## Out of scope

- No V6 migration or V6 visual language.
- No application routing, auth, persistence, business logic, or API contracts.
- No framework dependency beyond Svelte as a peer dependency.
