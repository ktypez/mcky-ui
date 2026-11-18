# V5 ecosystem integration plan

V5 Paper Pop is the only active design-system target. V6 is paused. This plan
covers five application repositories and keeps their product-specific
information architecture intact.

## Ownership model

- `mcky-ui` owns canonical semantic tokens, typography defaults, shared
  low-level controls, accessibility behavior, and framework-neutral CSS.
- Each application owns routes, authentication, domain data, responsive shell,
  navigation placement, feature workflows, and specialized visualizations.
- App adapters map legacy token names to V5 semantic tokens. Adapters must not
  redefine the palette or silently change product layout.
- Shared components are adopted incrementally. A component is not shared just
  because two applications have similarly named files; behavior and semantics
  must match first.

## Repository audit

| Repository | Runtime | Existing V5 material | Integration boundary |
| --- | --- | --- | --- |
| `data.mcky.space` (`data-ledger`) | Svelte 5, Tailwind 4 | Most complete V5 reference; tokens, four palettes, light/dark, density, UI primitives | Reference implementation for token parity. Keep DATA navigation, maps, forms, and business workflows. |
| `truck` | Svelte 5 | LEDGER Paper Pop theme, generated palette CSS, theme picker and theme loader | Add a token adapter first. Preserve the Truck theme system, bottom navigation, calendar, finance and operational screens. |
| `collage` | SvelteKit / Svelte 5 | Paper Pop tokens, texture, controls and card patterns | Share common primitives; preserve Canvas Renderer, photo workflow, collage-specific controls and output composition. |
| `portal` | React 19 | V5 token/UI CSS mixed with legacy V3 styles | CSS/token alignment can precede framework migration. Do not import Svelte components into React. Remove V3 residue only after reviewing its live dependencies. |
| `mcky.space` | Static multi-page Vite HTML/CSS, no client JS | V5 Paper Pop CSS, self-hosted fonts, strict CSP, matcha/coral product accents | Consume framework-neutral tokens/core CSS only. Preserve zero inline scripts/styles, CSP, static routes and the portfolio/case-study structure. |

## Shared component candidates

Candidates to standardize after token parity and API review:

- Foundations: Button, Card, Badge, Chip, Field, Input, Textarea, Select,
  Checkbox, Switch, Segmented, Kbd, Monogram, CountSticker, EmptyState.
- Missing or incomplete candidates from the app audit: Alert/Status, Divider,
  Avatar, Skeleton/Loading, Dialog/ConfirmDialog, Toast presentation,
  Tabs, DatePicker, FileDrop, and command-menu primitives.
- Specialized app components stay local: map pickers/previews, calendar grids,
  photo grids/canvas renderer, upload flows, Clerk/auth panels, offline sync,
  update prompts, route shells, and business-specific rows/forms.

A candidate moves into `mcky-ui` only when at least two consumers need the same
interaction contract, keyboard behavior, accessibility semantics, and visual
states. App-specific orchestration remains in the application.

## Token compatibility findings

- The shared V5 token set already covers the common `--paper`, `--card`, ink,
  rule, accent, radius, density, and UI compatibility families.
- `mcky.space` uses `--ease` and `--measure`; these are now part of the canonical
  V5 token contract rather than local-only values.
- Truck and Portal expose many legacy aliases (`--primary`, `--background`,
  `--surface`, status colors, and feature-specific variables). These must be
  mapped in per-app adapters, not added wholesale to the global token set.
- DATA has a small set of feature-specific variables (map/frame/reveal) that
  remain local to DATA.
- Collage's current token references are already covered by V5 tokens.

## Integration order

1. DATA: establish canonical token and primitive parity against the strongest
   existing V5 implementation.
2. Collage: consume shared foundations while retaining the canvas/photo domain.
3. Truck: add an explicit LEDGER-to-V5 adapter, then migrate generic controls.
4. mcky.space: switch its duplicated base tokens to the CSS-only V5 entry while
   retaining its CSP, self-hosted fonts, matcha/coral accents, and static pages.
5. Portal: align CSS tokens and retire legacy V3 dependencies; adopt Svelte
   components only after the planned React-to-Svelte 5 migration.

## Safety and change discipline

- Never reset or overwrite unrelated dirty work in application repositories.
- Do not replace app navigation with the generic `TopBar` automatically.
- Do not migrate domain components merely to reduce file count.
- Validate each consumer with its own typecheck/build/tests before continuing.
- Keep V5 as the only design target; no V6 files, tokens, or variants.
