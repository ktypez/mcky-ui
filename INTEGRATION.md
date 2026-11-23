# V5 ecosystem integration plan

V5 Paper Pop is the only active design-system target for this integration plan. A
separate opt-in V6 Work Shell language ships in the same package
([V6.md](./V6.md)) and is adopted independently. This plan covers five application
repositories and keeps their product-specific information architecture intact.

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

## Execution workflow

- ChatGPT coordinates the work: scope changes, prepare implementation plans, review diffs and results. The user retains approval for merges and production changes.
- GitHub is the source of truth for branches, commits, pull requests and CI status. The Lab may keep working copies and act as a lightweight control endpoint.
- Lab (Poco F1 + Mobian) is for repository access and lightweight coordination only. Do not run dependency installs, test suites, builds, audits or sustained CPU/RAM workloads there.
- Simular Box is the execution environment for repository work that needs a full machine: dependency installs, typechecks, tests, builds, audits, browser automation and responsive visual QA. Use the existing `main` box by default; create additional boxes when isolation or parallel work justifies them. Save and synchronize changes through GitHub.
- Instabox is not part of this workflow. Do not wake, configure or use Instabox as a runner.

## Repository audit

| Repository | Runtime | Existing V5 material | Integration boundary |
| --- | --- | --- | --- |
| `data.mcky.space` (`data-ledger`) | Svelte 5, Tailwind 4 | Most complete V5 reference; tokens, four palettes, light/dark, density, UI primitives | Reference implementation for token parity. Keep DATA navigation, maps, forms, and business workflows. |
| `truck` | Svelte 5 | LEDGER Paper Pop theme, generated palette CSS, theme picker and theme loader | Add a token adapter first. Preserve the Truck theme system, bottom navigation, calendar, finance and operational screens. |
| `collage` | SvelteKit / Svelte 5 | Paper Pop tokens, texture, controls and card patterns | Share common primitives; preserve Canvas Renderer, photo workflow, collage-specific controls and output composition. |
| `portal` | Svelte 5 | Canonical V5 tokens, shared Button, ClerkJS Core 3 through the shared FAPI | Keep sign-in, profile, LINE, access-management and account-routing workflows Portal-specific. |
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
5. Portal: align CSS tokens, migrate to Svelte 5 and adopt shared primitives
   only where their behavior matches; keep Clerk and account workflows local.

## Safety and change discipline

- Never reset or overwrite unrelated dirty work in application repositories.
- Do not replace app navigation with the generic `TopBar` automatically.
- Do not migrate domain components merely to reduce file count.
- Validate each consumer with its own typecheck/build/tests before continuing.
- Keep V5 as the only design target; no V6 files, tokens, or variants.

## Current adoption status

The first V5 integration pass is merged across all five applications:

| Repository | Shared V5 adoption | Components adopted | Kept application-specific |
| --- | --- | --- | --- |
| DATA | Canonical tokens, palette/mode/density adapter, shared core styles | Button, CountSticker | Badge/payment states, Chip, Field/Input tracking, Monogram, Segmented controls, TopBar, maps and business flows |
| Collage | Canonical tokens, system mode resolved before paint, shared core styles | Button for Studio and download actions | Canvas Renderer, DatePicker, ThemePicker, FileDrop, PhotoGrid and output themes |
| Truck | Canonical tokens mapped into LEDGER aliases; legacy theme fallbacks scoped away from LEDGER | Button for ConfirmModal and UpdatePrompt actions | Theme loader/picker, BottomNav, calendar, finance, offline/PWA and operational screens |
| Portal | Canonical V5 tokens, system mode from shared CSS, Svelte 5 + ClerkJS | Button | Sign-in, profile, LINE and access-management workflows remain Portal-specific |
| mcky.space | CSS-only canonical tokens; omitted `data-mode` follows system preference | CSS only | Static pages, self-hosted fonts, case-study layout, strict CSP and standalone 404 stylesheet |

All applications retain their own information architecture and navigation. The
shared package is the source of visual tokens and low-level primitives, not an
application shell or a replacement for domain components.

## Deployed mobile QA checkpoint — 2026-11-19

Initial responsive checks were run in Simular Box at 360, 375, 390 and 414 CSS px:

| Application | Result | Notes |
| --- | --- | --- |
| DATA (`data.mcky.space`) | Pass | No document-level horizontal overflow; light layout inspected; explicit dark-mode toggle works. |
| TRUCK (`truck.mcky.space`) | Pass | No document-level horizontal overflow. Thai glyph fallback fix ([TRUCK PR #28](https://github.com/ktypez/truck/pull/28)) merged and verified live in production alongside dotted background (`data-texture`). |
| PORTAL (`me.mcky.space`) | Pass | No horizontal overflow; form inputs remain 16px and primary actions meet 44px height. |
| Collage (`report.mcky.space`) | Pass | No horizontal overflow; style controls remain at least 56px high. Build blocker resolved on Vercel; shared `ui-button` active. |
| mcky.space | Pass | No document-level horizontal overflow; long install snippets scroll inside their own code blocks. Static routes `/`, `/vaultctl/`, `/mem/` and strict CSP verified. |

Scope: this checkpoint covers public landing, sign-in, or unauthenticated application surfaces. Authenticated Truck and Portal workflows, and dark-mode parity outside DATA, still need a separate pass.

## Post-Merge and Production Deployment Verification — 2026-11-20

All six hardening PRs (DATA #55, TRUCK #31, Collage #8, PORTAL #7, mcky.space #7, mcky-ui #15) are merged. Post-merge push validation on default branches passed 6/6 across all repositories.

Live production deployments verified:
- **DATA** (`data.mcky.space`): Cloudflare Pages live from commit `caa9f7f` (Deploy run #44733470769 PASS).
- **TRUCK** (`truck.mcky.space`): Vercel Production deployment #7941211102 from commit `a01db34` (SUCCESS).
- **Collage** (`report.mcky.space`): Vercel Production deployment #7942195536 from commit `fb996e5` (SUCCESS).
- **PORTAL** (`me.mcky.space`): Cloudflare Pages live from commit `e7ed1da`.
- **mcky.space** (`mcky.space`): Cloudflare Pages live from commit `3b82f2f`.

Truck splash reconciliation:
- Inspected user's local `stash@{0}` in `truck` (V5 Paper Pop card splash with brand mark, wordmark, squiggle and loading bar) against the current upstream mascot splash (`splash-mascot`, random geometric shape, `splash-boot.js`).
- The stashed edits are preserved safely in Git stash and intentionally deferred to avoid conflict with the active mascot splash.

## Remaining V5 hardening

1. Evaluate repeated generic controls in DATA, Collage, Truck and Portal; move only controls whose interaction and accessibility contracts match a shared primitive.
2. Complete deployed mobile, light-mode and dark-mode checks while keeping each application navigation, maps, canvas, offline/PWA and authentication flows local.
3. Reconcile separately preserved Truck splash-screen edits only after reviewing the current upstream mascot implementation.

## Phase completion criteria

- All five applications consume the immutable V5 token package or its CSS-only entry.
- Framework apps use direct shared-component subpaths where behavior matches; static `mcky.space` remains JavaScript-free and consumes tokens only.
- Per-repository tests, typechecks, builds and production dependency audits run in Simular Box, never on the mobile Lab.
- No V6 assets, tokens or variants are introduced during this phase.

V5 remains the target for this integration plan; V6 is a separate opt-in language documented in [V6.md](./V6.md).
