# mcky-ui

Shared design system for the mcky.space application family.

## Goals

- One monochrome visual language across all products.
- Framework-independent CSS tokens and primitives.
- Svelte 5 components for Svelte applications.
- CSS-only integration for static HTML properties.
- No paid UI kit or runtime service dependency.
- Keep application APIs, authentication, and business logic outside this repository.

## Applications

| Application | Integration target |
| --- | --- |
| DATA | Svelte 5 components + core CSS |
| TRUCK | Svelte 5 components + core CSS |
| PORTAL | Migrate React UI to Svelte 5, preserve auth/API behavior |
| mcky.space | Static HTML + core CSS only |

## Design direction

Strict black, white, and neutral gray. No warm-paper, matcha, coral, or indigo accents. Mobile-first, accessible, Thai/English typography, light/dark themes, restrained borders and radii, and reduced-motion support.

## Status

Foundation specification is being established. Existing application styles are not replaced until each migration is reviewed and tested.
