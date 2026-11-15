# V6 Design Specification

## Principles
1. Monochrome only: black, white, and neutral gray. No warm-paper, matcha, coral, or indigo accents.
2. Functional clarity over decoration. Use hierarchy, spacing, typography, and alignment rather than gradients.
3. Mobile-first and responsive from 320px upward.
4. Thai and English must both render cleanly. Applications may load Noto Sans Thai; the system stack remains the fallback.
5. Accessible by default: keyboard operation, visible focus, semantic HTML, sufficient contrast, and reduced-motion support.
6. Light and dark themes share semantic token names.

## Surface language
- White/light or near-black/dark page canvas.
- Neutral gray for secondary surfaces and dividers.
- Thin borders; shadows are optional and restrained.
- Radius scale: 6 / 10 / 14 / 20px.
- Motion is short and purposeful (120–260ms).

## Architecture
- src/styles/tokens.css: raw and semantic design tokens.
- src/styles/core.css: framework-independent reset and utility primitives.
- src/lib: Svelte 5 components; components must not own app data or API calls.
- CSS core is consumable by static HTML without JavaScript.

## Integration boundaries
- ElysiaJS remains the backend/API layer and is not part of this UI package.
- Do not move authentication, authorization, data contracts, or business logic into mcky-ui.
- Preserve each app's routing, API contracts, PWA behavior, and persistence during visual migrations.
- PORTAL React-to-Svelte migration is a separate app migration.

## Migration order
1. Establish tokens, CSS primitives, and component playground.
2. Integrate DATA as the first Svelte consumer and validate themes and Thai/English.
3. Migrate PORTAL to Svelte while preserving Clerk/auth flows.
4. Integrate TRUCK, retaining Supabase contracts and PWA/update behavior.
5. Update static mcky.space pages to consume core CSS only.
6. Remove duplicated app-level tokens only after parity is verified.