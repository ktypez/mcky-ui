<script lang="ts">
  import type { Snippet } from 'svelte';
  type NavItem = { label: string; href: string; id: string };
  let { brand = 'mcky-ui', active = 'overview', items = [], actions, class: className = '' }: { brand?: string; active?: string; items?: NavItem[]; actions?: Snippet; class?: string } = $props();
</script>
<header class={['v5-topbar', className].filter(Boolean).join(' ')}>
  <div class="v5-topbar__main">
    <a class="v5-brand" href="#top" aria-label={`${brand} home`}><span class="v5-brand__mark">✳</span><span>{brand}<small> PAPER POP · V5</small></span></a>
    <nav class="v5-nav v5-nav--desktop" aria-label="Primary navigation">
      {#each items as item (item.id)}<a href={item.href} class:active={active === item.id} aria-current={active === item.id ? 'page' : undefined}>{item.label}</a>{/each}
    </nav>
    <div class="v5-actions">{@render actions?.()}</div>
  </div>
  <nav class="v5-nav v5-nav--mobile" aria-label="Mobile navigation">
    {#each items as item (item.id)}<a href={item.href} class:active={active === item.id} aria-current={active === item.id ? 'page' : undefined}>{item.label}</a>{/each}
  </nav>
</header>
<style>
  .v5-topbar { position: sticky; top: 0; z-index: 30; border-bottom: 1.5px solid var(--hard); background: color-mix(in srgb,var(--paper) 90%,transparent); backdrop-filter: blur(14px); }
  .v5-topbar__main { width: min(100% - 32px,1200px); min-height: 68px; margin-inline: auto; display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 16px; }
  .v5-brand { display: inline-flex; width: fit-content; align-items: center; gap: 10px; color: var(--ink); font-weight: 800; text-decoration: none; }
  .v5-brand__mark { display: grid; width: 36px; height: 36px; place-items: center; border: 1.5px solid var(--hard); border-radius: 12px; background: var(--acc); color: white; box-shadow: 2px 2px 0 var(--hard); font-size: 20px; transition: transform .18s ease; }
  .v5-brand:hover .v5-brand__mark { transform: rotate(-7deg); }
  .v5-brand small { display: block; color: var(--ink-faint); font: 700 9px var(--font-mono); letter-spacing: .1em; }
  .v5-nav { display: flex; align-items: center; gap: 5px; }
  .v5-nav a { display: inline-flex; min-height: 40px; align-items: center; padding: 8px 14px; border: 1.5px solid transparent; border-radius: 999px; color: var(--ink-soft); font-size: 13px; font-weight: 700; text-decoration: none; white-space: nowrap; transition: .16s ease; }
  .v5-nav a:hover { background: var(--paper-2); color: var(--ink); }
  .v5-nav a.active { border-color: var(--hard); background: var(--card); color: var(--ink); box-shadow: 2px 2px 0 var(--hard); }
  .v5-actions { display: flex; justify-content: flex-end; align-items: center; gap: 8px; }
  .v5-nav--mobile { display: none; }
  @media (max-width:760px) { .v5-topbar__main { min-height: 60px; grid-template-columns: 1fr auto; } .v5-nav--desktop { display: none; } .v5-nav--mobile { display: flex; overflow-x: auto; gap: 4px; padding: 0 16px 10px; scrollbar-width: none; } .v5-nav--mobile::-webkit-scrollbar { display: none; } .v5-nav--mobile a { min-height: 38px; padding-inline: 13px; } }
  @media (prefers-reduced-motion: reduce) { .v5-brand__mark,.v5-nav a { transition: none; } }
</style>
