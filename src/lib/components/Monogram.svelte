<script lang="ts">
  let { name, size = 40, class: className = '' }: { name: string; size?: number; class?: string } = $props();
  const palette = ['var(--acc-tint)|var(--acc-ink)', 'var(--pop-tint)|var(--pop-ink)', 'var(--credit-tint)|var(--credit-ink)', 'var(--penpay-tint)|var(--penpay-ink)'];
  let index = $derived([...name].reduce((sum, char) => sum + char.charCodeAt(0), 0) % palette.length);
  let colors = $derived(palette[index].split('|'));
  let initials = $derived(name.trim().split(/\s+/).slice(0, 2).map(part => [...part][0] ?? '').join('').toUpperCase());
</script>
<span class={['monogram', className].filter(Boolean).join(' ')} style={`--mono-size:${size}px;--mono-bg:${colors[0]};--mono-fg:${colors[1]}`} role="img" aria-label={name}>{initials}</span>
<style>
  .monogram { display: inline-grid; flex: none; width: var(--mono-size); height: var(--mono-size); place-items: center; border: 1px solid color-mix(in srgb,var(--ink) 20%,transparent); border-radius: 50%; background: var(--mono-bg); color: var(--mono-fg); font-size: calc(var(--mono-size) * .36); font-weight: 800; }
</style>
