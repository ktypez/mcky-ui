# mcky-ui

Shared monochrome design system for the mcky.space application family.

## Package contents

- Framework-independent CSS tokens and core primitives.
- Svelte 5 components: `Badge`, `Button`, `Card`, `Checkbox`, `Input`, `Select`, `Switch`, and `Textarea`.
- Responsive V6 playground for reviewing foundations, components, and themes.
- No runtime service, authentication, application data, or backend dependency.

## Install

```bash
npm install @mcky/ui svelte
```

Import the CSS foundation once in the application entry point:

```css
@import '@mcky/ui/core.css';
```

Or import only the design tokens:

```css
@import '@mcky/ui/tokens.css';
```

Use the Svelte components:

```svelte
<script lang="ts">
  import { Badge, Button, Card, Checkbox, Input, Select, Switch, Textarea } from '@mcky/ui/svelte';

  let email = $state('');
  let accepted = $state(false);
  let notifications = $state(true);
  let category = $state('design');
  let notes = $state('');
</script>

<Card>
  <Badge tone="solid">Active</Badge>
  <Input label="Email" type="email" bind:value={email} required />
  <Select label="Category" bind:value={category} options={[
    { label: 'Design', value: 'design' },
    { label: 'Engineering', value: 'engineering' }
  ]} />
  <Textarea label="Notes" bind:value={notes} />
  <Checkbox label="I agree" bind:checked={accepted} />
  <Switch label="Notifications" bind:checked={notifications} />
  <Button variant="primary" disabled={!accepted}>Continue</Button>
</Card>
```

All form controls support native keyboard interaction and form attributes. Inputs, selects, textareas, checkboxes, and switches support Svelte 5 two-way binding.

## Development

```bash
npm ci
npm run dev
```

Open `http://localhost:4173/playground.html`.

## Verification

```bash
npm run check
npm test
npm run build
npm run build:playground
npm run audit:runtime
```

`npm run audit:runtime` audits production dependencies. The current development toolchain includes `picomatch` through Vite's `tinyglobby` dependency. GitHub advisory [GHSA-fc5q-39xc-vjpf](https://github.com/advisories/GHSA-fc5q-39xc-vjpf) currently has no published fixed npm release (latest registry version is 4.0.7). The affected package is development/build tooling only; no production dependency includes it. Avoid accepting untrusted glob patterns in build configuration and recheck the full audit when upstream publishes a fix or changes the advisory.

## Design direction

Strict black, white, and neutral gray. Mobile-first, accessible, Thai/English typography, explicit light/dark themes, restrained borders and radii, and reduced-motion support. See [DESIGN.md](./DESIGN.md).

## Application integration

| Application | Integration target | Migration state |
| --- | --- | --- |
| DATA | Svelte 5 components + core CSS | Pending |
| TRUCK | Svelte 5 components + core CSS | Pending |
| PORTAL | Svelte migration; preserve auth/API behavior | Pending |
| mcky.space | Static HTML + core CSS only | Pending |

Application migrations remain separate changes and must preserve routing, authentication, API contracts, persistence, and PWA/update behavior.
