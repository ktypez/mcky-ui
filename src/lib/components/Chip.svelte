<script lang="ts">
  import type { Snippet } from 'svelte';
  let { tone = 'neutral', pressed, count, onclick, children, class: className = '', ...rest }: { tone?: 'neutral' | 'acc' | 'pop'; pressed?: boolean; count?: number; onclick?: (event: MouseEvent) => void; children?: Snippet; class?: string } = $props();
</script>
<button type="button" class={['chip', tone !== 'neutral' && `chip--${tone}`, className].filter(Boolean).join(' ')} aria-pressed={pressed} {onclick} {...rest}>
  {@render children?.()}
  {#if count !== undefined}<span class="count">{count}</span>{/if}
</button>
<style>
  button { cursor: pointer; }
  button[aria-pressed="true"] { background: var(--acc-tint); color: var(--acc-ink); border-color: var(--acc); }
  .count { display: inline-grid; min-width: 18px; height: 18px; place-items: center; padding-inline: 4px; border-radius: 999px; background: color-mix(in srgb,currentColor 12%,transparent); font: 10px var(--font-mono); }
</style>
