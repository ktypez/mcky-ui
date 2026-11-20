# V5 Hardening Plan & Checklist

**Status date:** 2026-11-19  
**Phase:** V5 Paper Pop hardening and closure  
**Design target:** V5 only. V6 remains paused.  
**Execution (updated 2026-11-20):** GitHub is the source of truth. SentinelX-connected Lab is for lightweight repository inspection and coordination only; do not run installs, builds, tests, audits, or sustained workloads there. Simular Box VM is paused/retired due to reliability issues. Instabox is excluded. Heavy validation remains blocked until an approved reliable runner is available.

## Goal

Close the remaining V5 hardening work across DATA, Collage, Truck, Portal, and mcky.space without changing approved product information architecture, navigation, authentication, maps, canvas/photo workflows, offline/PWA behavior, or domain-specific UI.

A phase is complete only when every required gate below is evidenced. A merged PR or a successful build alone does not close the phase.

## Current baseline

The first V5 adoption pass is merged across all five applications. Shared token adoption and initial component integration are recorded in [INTEGRATION.md](./INTEGRATION.md).

| Area | Baseline | Remaining |
| --- | --- | --- |
| Shared V5 tokens and app adapters | Done / merged | Verify installed versions and no drift |
| Shared component adoption | Initial pass merged | Audit repeated controls and contract parity |
| Public mobile QA at 360/375/390/414 CSS px | Initial pass recorded for all five apps | Authenticated surfaces and remaining dark-mode parity |
| Typecheck, tests, build, runtime audit | Prior PR validations exist per repository | Run a fresh, consistent pass for current main revisions |
| Truck splash reconciliation | Deferred intentionally | Inspect preserved work against current mascot implementation |
| V6 | Paused | Keep paused throughout this phase |

### Known QA caveats carried forward

- DATA: public mobile surface and explicit dark-mode toggle were previously checked; authenticated flows and broader dark-mode parity remain.
- TRUCK: public mobile surface previously checked; authenticated workflows remain. PR #28 (Thai glyph fallback) and PR #29 (dot texture) are merged; verify both on the live production site.
- PORTAL: public sign-in surface previously checked; authenticated profile, LINE, and access-management flows remain.
- Collage: public surface previously checked; verify editor/canvas interactions at mobile widths and light/dark themes.
- mcky.space: public responsive surface previously checked; verify all static routes, system light/dark appearance, CSP, and zero-client-JavaScript constraint.

## Work plan and checklist

Legend: `[x]` verified complete, `[ ]` not yet verified, `[!]` blocked or requires a decision. Do not mark an item complete without a test result, screenshot, CI status, or commit/PR reference.

### Phase 0 — Freeze scope and establish baseline

- [x] Confirm V5 Paper Pop is the only active design target; V6 stays paused.
- [x] Confirm execution policy: SentinelX/Lab for lightweight coordination only; no heavy work on Lab; Simular Box VM paused due to hangs; Instabox excluded.
- [x] Confirm five target repositories and app-specific boundaries in INTEGRATION.md.
- [x] Record current default-branch commit SHA for each repository (refreshed 2026-11-20): mcky-ui `10dcd8ef86f65840fbbb4ebcb558cb3ab6121503`; DATA `1c1164cb028dd1834c1b42474ef9c8cba07dc4a7`; Collage `35521e75f33b5dd25033a2ca55d3053bd158b96a`; TRUCK `2ff240eaab5e31b8bbd210bbdc163d17fdee6019`; PORTAL `31edb50a78837335b7bd7021457b30381e65b08f`; mcky.space `814d0847a1120daece0ab45c6a1aa4c15e4be7a0` (default branch `master`).
- [x] Confirm clean isolated audit worktrees for mcky-ui, DATA and Collage. Existing working copies were preserved; mcky-ui's original `main` copy was already one commit ahead and was not modified. DATA's original copy remained on its existing feature branch and was not modified.
- [!] TRUCK, PORTAL and mcky.space default-branch SHAs were recorded through GitHub, but Simular Box cannot clone these private repositories because no Git credentials are available in the Box. Runner validation is blocked until secure repository access is provided.
- [ ] Record current production deployment URL and deployed commit for each app.

### Phase 1 — Shared component and token hardening

For each app, inventory repeated controls and compare semantics, keyboard behavior, focus handling, validation, disabled/loading states, responsive behavior, and accessibility before proposing extraction.

- [x] DATA: initial source-level disposition completed for local Badge, Chip, Field, Input, Segmented, Monogram, AppDialog and Toaster. Keep payment Badge, Field, tracked Input wrapper, compound Seg/SegItem, Monogram, multi-mode AppDialog and action-aware Toaster local for now: their semantics/contracts differ from the shared primitives. DATA already consumes shared Button and CountSticker. Chip is a possible candidate, but its current count type permits strings while shared Chip accepts numbers; inspect call sites before any replacement.
- [x] Collage: initial source-level inventory completed. DatePicker, FileDrop, PhotoGrid and ThemePicker are product/workflow-specific and have no exact shared contract; keep local. Shared Button is already used in Studio and the download action; V5 core CSS is imported once.
- [x] DATA Chip call-site review: Catalog uses the local Chip only for seven filter options and numeric counts from `applyCounts`. Count type is compatible, but the shared component exposes `pressed`/`tone` while DATA uses `active` and a distinct dark-ink selected treatment. Keep DATA Chip local; no extraction justified.
- [ ] TRUCK: audit generic buttons, fields, dialogs/confirmations, status badges, tabs and loading states; keep BottomNav, calendar, finance, offline sync and operational screens local.
- [ ] PORTAL: audit buttons, fields, alerts, dialogs, tabs, status/loading and toast presentation; keep Clerk, LINE, profile and access-management orchestration local.
- [x] mcky.space source audit: three Vite HTML entry pages (/, /vaultctl/, /mem/) use external stylesheets only; no inline scripts, style blocks, or style attributes. `src/tokens.css` imports `@mcky/ui/v5-tokens.css`; fonts are self-hosted; Pages middleware sets `script-src 'none'`, `style-src 'self'`, and `font-src 'self'`. The standalone 404 stylesheet remains an intentional isolated exception. Fresh build/test and deployed route checks remain in Phase 2/3.
- [ ] Produce a component disposition list: adopt shared / keep local / needs shared primitive.
- [ ] Make only evidence-backed changes; each app change gets its own focused PR and validation.

### Phase 2 — Fresh repository validation

**Initial validation results (2026-11-19):**

| Repository | Commit | Install | Typecheck | Tests | Build | Runtime audit | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| mcky-ui | `10dcd8e` | Pass (`npm ci`) | Pass (0 errors, 0 warnings) | Pass (9/9) | Pass (package + playground) | Pass (0 vulnerabilities) | Complete for this commit. |
| DATA | `1c1164c` | Pass (`pnpm install --frozen-lockfile`) | Pass (0 errors, 0 warnings) | Pass (142/142) | Pass | Pass (`pnpm audit --prod`, no known vulnerabilities) | Lint pass. `check:pwa` script could not run because the Box image lacks the system `file` utility; PNG signatures and dimensions were independently verified (192, 512, 512). Install the utility or update the script to use a Node-native PNG check, then rerun. Existing build warnings: large Clerk chunk and open-location-code mixed static/dynamic import. |
| Collage | `35521e7` | Pass (`bun install --frozen-lockfile`) | Pass (0 errors, 0 warnings) | Pass (33/33) | Pass | Pass (0 vulnerabilities) | No lint script is defined in the app package. |
| TRUCK | `93cc751` | Blocked | Blocked | Blocked | Blocked | Blocked | Private repo clone requires Git credentials in Simular Box. |
| PORTAL | `9465c33` | Blocked | Blocked | Blocked | Blocked | Blocked | Private repo clone requires Git credentials in Simular Box. |
| mcky.space | `814d084` | Blocked | Blocked | Blocked | Blocked | Blocked | Private repo clone requires Git credentials in Simular Box. |


Run on Simular Box against the exact current main revision (or a dedicated PR branch). Capture command output and commit SHA.

- [ ] mcky-ui: tests, package checks, build/playground build, runtime dependency audit.
- [ ] DATA: frozen install, typecheck, tests, build, lint, PWA checks, production dependency audit.
- [ ] Collage: frozen install, typecheck/check, tests, build, lint and production dependency audit.
- [ ] TRUCK: frozen install, typecheck/check, tests, build, lint, PWA checks and production dependency audit.
- [ ] PORTAL: frozen install, tests, typecheck, functions typecheck, build and runtime dependency audit.
- [ ] mcky.space: install, tests, typecheck, build, CSS token reference audit, CSP/static-output checks and dependency audit.
- [ ] Triage existing warnings separately from regressions; document owner and disposition for every unresolved warning.
- [ ] Confirm no app imports V6 tokens, styles, assets, or variants.

### Phase 3 — Deployed responsive and visual QA

Test production deployments at 360, 375, 390 and 414 CSS px. Capture screenshots for light and dark mode where supported. Check for document-level horizontal overflow, clipped controls, unreadable Thai glyphs, focus visibility, touch target size, and broken sticky/fixed navigation.

- [ ] DATA: public routes, authenticated workspace, forms, maps, settings, dialogs; light and dark.
- [ ] TRUCK: public/unauthenticated surface, authenticated finance and operational workflows, calendar, dialogs, bottom navigation, PWA/update prompt; light and dark.
- [ ] Collage: landing, editor, canvas/photo workflow, export/download controls, theme controls; light and dark.
- [ ] PORTAL: sign-in, profile editing, email verification, password update, LINE link/relink/sync, access manager; light and dark.
- [ ] mcky.space: all static pages, navigation, case studies, code snippets, 404 page; system light and dark.
- [ ] Verify Truck production visibly includes the restored dotted background and Thai mono glyph fallback.
- [ ] Verify no regression to each app's existing navigation and information architecture.
- [ ] Attach screenshots and a concise PASS/FAIL report to the tracking PR.

### Phase 4 — Truck splash reconciliation

- [ ] Inspect current upstream mascot splash implementation.
- [ ] Locate and inspect the separately preserved Truck splash edits without resetting or overwriting them.
- [ ] Compare native splash, PWA splash, loading splash, background color, transparency and mascot geometry.
- [ ] Decide whether to discard, adapt, or merge the preserved edits; record rationale.
- [ ] If changes are needed, implement in a focused PR and verify on installed PWA/mobile viewport.

### Phase 5 — Closure

- [ ] All five repositories have fresh validation evidence tied to exact commit SHAs.
- [ ] All five deployed apps pass the required responsive and theme QA, or have explicitly accepted documented exceptions.
- [ ] Shared component audit has a final disposition for every candidate.
- [ ] Truck splash reconciliation is resolved or explicitly accepted as deferred by the user.
- [ ] No unresolved critical/high runtime dependency vulnerability introduced by this phase.
- [ ] No V6 artifacts introduced.
- [ ] Update INTEGRATION.md with final evidence and remaining accepted exceptions.
- [ ] Publish final phase report with PASS / FAIL / BLOCKED by repository.
- [ ] User reviews and approves any merge or production change.

## Execution order

1. Baseline SHA and clean-tree checks for all five repos.
2. Shared component/token audit, starting with DATA and Collage, then Truck and Portal; mcky.space gets a static/CSP audit.
3. Fresh validation per repository.
4. Deployed QA, prioritizing authenticated workflows and dark-mode gaps.
5. Truck splash reconciliation.
6. Close the phase only after the closure checklist is satisfied.

## Status log

| Date | Repository / phase | Result | Evidence / notes |
| --- | --- | --- | --- |
| 2026-11-19 | Plan created | In progress | PR #15 opened; checklist tracked in this file. |
| 2026-11-19 | Phase 0 baseline | Partial | All six default-branch SHAs recorded. Three isolated worktrees clean. Private repo runner access and deployed revision inventory remain blocked/pending. |
| 2026-11-19 | Phase 2 initial validation | 3/6 repositories tested | mcky-ui all gates pass; DATA passes install/typecheck/tests/build/lint/runtime audit with PWA script environment issue; Collage passes install/check/tests/build/runtime audit. TRUCK, PORTAL and mcky.space blocked by private Git clone authentication in Box. |
| 2026-11-19 | Phase 1 initial component audit | DATA + Collage initial disposition | DATA's payment/status and form-tracking wrappers remain local; Chip needs call-site review. Collage DatePicker/FileDrop/PhotoGrid/ThemePicker remain local; shared Button adoption confirmed. No app code changed. |
| 2026-11-20 | Source-level audit refresh | Partial | DATA Chip disposition and mcky.space CSS/CSP source audit recorded; initial TRUCK/PORTAL component dispositions recorded; Collage production deployment failure captured with resolver error; heavy validation blocked pending approved runner. PR #15 `verify` check passed on `019074b`. |

### Source-level component audit update — 2026-11-20

- **DATA:** Completed the Chip call-site review. Catalog filter counts are numeric, so the count type itself is compatible. The public API and selected-state treatment are not equivalent (`active` and dark-ink selected styling locally versus `pressed`/`tone` in the shared primitive); retain the local component. Other local status/payment badges and form wrappers remain domain-specific.
- **TRUCK:** Confirmed shared Button is already used by ConfirmModal and UpdatePrompt. Keep LedgerControls local because palette swatches and density choices are theme-domain controls. Keep the local Segmented control for now: its 44px option targets, full-width layout, and theme-specific selected state differ from the shared 36px pill primitive. ModalWrapper/ConfirmModal retain focus-trap, backdrop, transition, and close semantics; ModalActions has its own loading contract. ToastItem owns the auto-dismiss deadline and pause-on-hover lifecycle. No extraction approved from this source review.
- **PORTAL:** Shared Button is already used in SignInForm, AccountEditor, LinePanel, and AccessPanel. Keep authentication, profile/email/password editing, LINE connection/sync, and access-management orchestration local. Input/field presentation is currently tied to Portal's `.field` contract; do not replace with shared Input without a separate styling and accessibility parity review. ServicesPanel's loading/empty presentation has no matching shared Skeleton contract established yet.
- **mcky.space:** Source inspection confirms the three static entry pages and CSS-only V5 token import, self-hosted fonts, and strict no-script CSP. The existing `design-system.test.mjs` covers the static-page and token constraints, but it has not been freshly executed against the current commit in this session.


- **Collage deployment blocker:** Vercel production deployment for main commit `35521e7` failed in Vite/Rolldown while resolving `@mcky/ui/button` (`not exported under conditions [module, node, production, svelte, import]`). The lockfile pins `@mcky/ui` to commit `5a72d95`, and that commit's published `package.json` does declare `./button`; this is therefore an observed package-resolution mismatch, not yet a proven missing export. Do not change the import or dependency until the resolver/install discrepancy is reproduced. The deployment also logged non-fatal npm warnings for `cache-dir` and the `esbuild` install-script allowlist.

### Current repository and CI snapshot — 2026-11-20

| Repository | Default branch SHA | Latest check evidence observed | Result |
| --- | --- | --- | --- |
| mcky-ui | `10dcd8e` | `verify` completed 2026-11-19 | PASS |
| DATA | `1c1164c` | Cloudflare Pages and typecheck/lint/tests/build completed 2026-11-19 | PASS |
| Collage | `35521e7` | Vercel production deployment failed during `npm run build`; 10 other provider check suites remained queued | FAIL (deployment); validation unverified |
| TRUCK | `2ff240e` | `quality` completed 2026-11-19 | PASS |
| PORTAL | `31edb50` | Cloudflare Pages completed 2026-11-20; PR #6 remains open | DEPLOY CHECK PASS; full validation unverified |
| mcky.space | `814d084` | Cloudflare Pages completed 2026-11-18 | DEPLOY CHECK PASS; full validation unverified |

These are observed GitHub check results, not a substitute for the fresh command-level validation required in Phase 2. Do not infer a full test/build pass from a deployment-only check.

### Current execution constraints

- SentinelX can inspect and coordinate repository work on Lab; the working copies are not cleanly aligned to the default branches. In particular, Portal has an existing uncommitted change in `src/styles/v3.css`, Truck's local main copy is one commit ahead of `origin/main`, and other local copies are on feature branches. Preserve all of them.
- Simular Box VM is no longer the execution target due to hangs. Instabox remains excluded.
- Do not run builds/tests on Lab. Phase 2 heavy validation is BLOCKED pending a reliable, user-approved runner. Continue source-level review and GitHub CI evidence gathering without changing application code.

## Decision and safety rules

- Do not merge PRs or make production changes without the user's approval.
- Do not overwrite unrelated working-tree changes or the separately preserved Truck splash work.
- Do not redesign approved V5 navigation, app shells, or product workflows during hardening.
- Do not start V6 work as part of this phase.
- If a test cannot be run or a workflow cannot be authenticated, mark it BLOCKED; do not infer PASS.

### GitHub-hosted validation runner enabled — 2026-11-20

- User approved GitHub-hosted Actions (`ubuntu-latest`) for fresh validation. SentinelX/Lab remains lightweight coordination only; Simular Box VM remains paused; Instabox remains excluded.
- Added PR-based validation workflows or manual-dispatch support so every app has a reproducible GitHub Actions path:
  - DATA PR #55: existing CI retained; `workflow_dispatch` added.
  - TRUCK PR #31: existing quality pipeline retained; `workflow_dispatch` added.
  - Collage PR #8: new CI runs `npm ci`, Svelte check, tests and production build in `web/`.
  - PORTAL PR #7: new CI runs Svelte typecheck, server-function typecheck, tests, production build and runtime audit.
  - mcky.space PR #7: new CI runs TypeScript typecheck, static-page tests and production build.
- Initial GitHub Actions results observed: Collage PASS; PORTAL PASS; mcky.space PASS. DATA and TRUCK jobs were still in dependency installation at the last check; final outcomes pending.
- The validation workflow changes are isolated to CI configuration; no application source or production deployments were intentionally changed.
