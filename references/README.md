# Consumer references

This directory is the **apply map** for the mcky.space family. Before changing
V6 tokens, the theme ramp, `<Scenery />` or `<ModeToggle />`, read the relevant
project note here and update it in the same commit. The goal is that a change
made for one app cannot quietly distort another.

`manifest.json` is the machine-readable index; `test/references.test.mjs`
checks that every listed project has a note with the required sections and that
every snapshot exists. Portal's scenery and toggle are also checked against
`test/v6-theme.test.mjs` so the shared components cannot drift from the
production view they were ported from.

Each note follows the same shape:

1. **Stack** — where the UI lives and how it is served.
2. **V6 entry** — how `@mcky/ui` is imported and what commit is pinned.
3. **Token overrides** — local values or aliases that differ from canonical V6.
4. **Theme** — the attribute, storage key and toggle mechanism in use.
5. **Scenery** — whether it uses the shared component or a local implementation.
6. **Apply checklist** — what must be preserved when V6 changes are rolled out.
7. **Verification** — commands and live checks for that app.

Snapshots under `references/<project>/` are copies of the exact files the shared
components were ported from. They are references, not additional source files.
