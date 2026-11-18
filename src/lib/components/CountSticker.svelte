<script lang="ts">let { value, label = '', rotation = -2, class: className = '' }: { value: string | number; label?: string; rotation?: number; class?: string } = $props();</script>
<span class={['sticker count-sticker', className].filter(Boolean).join(' ')} style={`--rot:${rotation}deg`}><strong>{value}</strong>{#if label}<span>{label}</span>{/if}</span>
<style>
  .count-sticker { display: inline-flex; align-items: baseline; gap: 7px; padding: 7px 12px; transform: rotate(var(--rot)); }
  strong { color: var(--acc-ink); font: 700 18px var(--font-mono); }
  span { color: var(--ink-soft); font-size: 11px; font-weight: 700; letter-spacing: .05em; text-transform: uppercase; }
</style>
