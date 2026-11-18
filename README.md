# mcky-ui

Shared **V5 Paper Pop** design system for the mcky.space application family. V5 is the current target; this package does not ship V6 styling.

## V5 features

- Warm dotted-paper canvas, ink outlines, sticker surfaces, and offset hard shadows.
- Four palettes: Matcha, Coral, Blueberry, and Butter.
- Light and dark modes, cozy and compact density tokens, optional paper texture.
- Svelte 5 components: Badge, Button, Card, Checkbox, Chip, CountSticker, EmptyState, Field, Input, Kbd, Monogram, Select, Segmented, Squiggle, Switch, Textarea, and TopBar.
- Framework-independent CSS foundation for static sites and non-Svelte consumers.
- Mobile-first, Thai/English-ready typography, keyboard accessibility, and reduced-motion support.

## Install

```bash
npm install @mcky/ui svelte
```

Import the V5 foundation once in the application entry point:

```css
@import '@mcky/ui/core.css';
```

For tokens only:

```css
@import '@mcky/ui/tokens.css';
```

Set the theme on the root element:

```html
<html data-palette="matcha" data-mode="light" data-density="cozy" data-texture="on">
```

Supported palettes are `matcha`, `coral`, `blueberry`, and `butter`. Set `data-mode="dark"` for chalk-night mode, `data-density="compact"` for denser rows, and `data-texture="off"` to remove the dotted paper texture. The package does not persist preferences; the consuming application owns that behavior.

## Svelte usage

```svelte
<script lang="ts">
  import { Badge, Button, Card, Chip, Input, Segmented, Switch, TopBar } from '@mcky/ui/svelte';
  let email = $state('');
  let palette = $state('matcha');
  let enabled = $state(true);
</script>

<Card>
  <Badge tone="solid">Active</Badge>
  <Input label="Email" type="email" bind:value={email} />
  <Chip tone="acc" pressed>Selected</Chip>
  <Segmented bind:value={palette} options={[
    { label: 'Matcha', value: 'matcha' },
    { label: 'Coral', value: 'coral' }
  ]} />
  <Switch label="Notifications" bind:checked={enabled} />
  <Button variant="primary">Continue</Button>
</Card>
```

`TopBar` provides the V5 horizontal navigation pattern: desktop brand / centered pills / actions, then a horizontally scrollable navigation row on mobile.

## Development

```bash
npm ci
npm run dev
```

Open `http://localhost:4173/playground.html` to inspect the V5 reference and interact with palette, mode, and texture controls.

## Verification

```bash
npm run check
npm test
npm run build
npm run build:playground
npm run audit:runtime
```

See [DESIGN.md](./DESIGN.md) for the V5 specification and [SECURITY.md](./SECURITY.md) for dependency advisory notes.

## Application integration

mcky-ui provides shared presentation primitives only. DATA, TRUCK, PORTAL, and mcky.space integrations remain separate migrations and must preserve each application's routing, authentication, API contracts, persistence, and PWA behavior.
